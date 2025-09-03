import {
	CreateBucketCommand,
	HeadBucketCommand,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { EnvConfigService } from '../env-config/env-config.service';

export interface PresignedUrlResponse {
  uploadUrl: string;
  key: string;
}

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private s3Client: S3Client;

  constructor(private readonly envConfig: EnvConfigService) {
    this.s3Client = new S3Client({
      endpoint: this.envConfig.getS3Endpoint(),
      credentials: {
        accessKeyId: this.envConfig.getS3AccessKeyId(),
        secretAccessKey: this.envConfig.getS3SecretAccessKey(),
      },
      forcePathStyle: true,
    });
  }

  async generatePresignedUrl(
    bucketName: string,
    contentType: string,
    ttl: number = 900,
  ): Promise<PresignedUrlResponse> {
    const key = uuidv4();

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: ttl,
    });

    return { uploadUrl, key };
  }

  getObjectUrl(bucketName: string, key: string): string {
    return `${this.envConfig.getS3Endpoint()}/${bucketName}/${key}`;
  }

  async ensureBucketExists(bucketName: string): Promise<void> {
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
}
