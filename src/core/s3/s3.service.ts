import {
  CreateBucketCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EnvConfigService } from '../env-config/env-config.service';
import { S3_BUCKET_NAMES } from './s3.constants';
import { S3BucketName } from './s3.type';

export interface PresignedUrlResponse {
  uploadUrl: string;
  key: string;
}

@Injectable()
export class S3Service implements OnModuleInit {
  private readonly logger = new Logger(S3Service.name);
  private s3Client: S3Client;

  constructor(private readonly envConfig: EnvConfigService) {
    this.s3Client = new S3Client({
      endpoint: this.envConfig.getS3Endpoint(),
      credentials: {
        accessKeyId: this.envConfig.getS3AccessKeyId(),
        secretAccessKey: this.envConfig.getS3SecretAccessKey(),
      },
      region: this.envConfig.getS3Region(),
      forcePathStyle: true,
    });
  }

  onModuleInit() {
    Object.values(S3_BUCKET_NAMES).forEach((bucketName: S3BucketName) => {
      this.ensureBucketExists(bucketName);
    });
  }

  async generatePresignedUrl(
    bucketName: S3BucketName,
    key: string,
    contentType: string,
    ttl: number = 900,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: ttl,
    });

    return uploadUrl;
  }

  getObjectUrl(bucketName: S3BucketName, key: string): string {
    return `${this.envConfig.getS3Endpoint()}/${bucketName}/${key}`;
  }

  async ensureBucketExists(bucketName: S3BucketName): Promise<void> {
    try {
      await this.s3Client.send(new HeadBucketCommand({ Bucket: bucketName }));
      this.logger.log(`Bucket ${bucketName} already exists`);
    } catch {
      try {
        await this.s3Client.send(new CreateBucketCommand({ Bucket: bucketName }));
        this.logger.log(`Created bucket ${bucketName}`);
      } catch (createError) {
        this.logger.error(`Failed to create bucket ${bucketName}`, createError);
        throw createError;
      }
    }
  }

  getClient(): S3Client {
    return this.s3Client;
  }
}
