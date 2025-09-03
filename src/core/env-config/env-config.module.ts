// env-config.module.ts
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigService } from './env-config.service';
import { validate } from './env-config.validation';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      validate,
    }),
  ],
  providers: [EnvConfigService],
  exports: [EnvConfigService, ConfigModule],
})
export class EnvConfigModule {}
