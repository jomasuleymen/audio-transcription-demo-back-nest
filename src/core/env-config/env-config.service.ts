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
}
