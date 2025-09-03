import { Global, Module } from '@nestjs/common';
import { EnvConfigModule } from './env-config/env-config.module';

@Global()
@Module({
  imports: [EnvConfigModule],
  providers: [],
  exports: [EnvConfigModule],
})
export class CoreModule {}
