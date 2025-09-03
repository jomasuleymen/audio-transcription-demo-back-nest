import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV } from './env-config.const';
import { EnvironmentVariables } from './env-config.validation';

@Injectable()
export class EnvConfigService {
  constructor(private configService: ConfigService<EnvironmentVariables>) {}

  getNodeEnv(): NODE_ENV {
    return this.configService.get('NODE_ENV', NODE_ENV.Development);
  }

  getPort(): number {
    return this.configService.get('PORT', 3000);
  }

  getCorsOrigin(): string[] | undefined {
    return this.configService.get('CORS_ORIGIN');
  }

  getS3Endpoint(): string {
    return this.configService.get('S3_ENDPOINT')!;
  }

  getS3AccessKeyId(): string {
    return this.configService.get('S3_ACCESS_KEY_ID')!;
  }

  getS3SecretAccessKey(): string {
    return this.configService.get('S3_SECRET_ACCESS_KEY')!;
  }

  getS3Region(): string {
    return this.configService.get('S3_REGION')!;
  }

  getRedisHost(): string {
    return this.configService.get('REDIS_HOST')!;
  }

  getRedisPort(): number {
    return this.configService.get('REDIS_PORT', 6379);
  }

  getRedisPassword(): string {
    return this.configService.get('REDIS_PASSWORD')!;
  }

  getMongoHost(): string {
    return this.configService.get('MONGO_HOST')!;
  }

  getMongoPort(): number {
    return this.configService.get('MONGO_PORT', 27017);
  }
  
  getMongoUsername(): string {
    return this.configService.get('MONGO_USERNAME')!;
  }

  getMongoPassword(): string {
    return this.configService.get('MONGO_PASSWORD')!;
  }
  
  getMongoDatabase(): string {
    return this.configService.get('MONGO_DATABASE')!;
  }
}
