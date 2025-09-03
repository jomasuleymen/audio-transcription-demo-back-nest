import { EnvConfigService } from '@core/env-config/env-config.service';
import { BullModule as BullModuleMq } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { bullInjectionList } from './bull.const';
import { BullService } from './bull.service';

@Module({
  imports: [
    BullModuleMq.forRootAsync({
      useFactory: (envConfigService: EnvConfigService) => ({
        connection: {
          host: envConfigService.getRedisHost(),
          port: envConfigService.getRedisPort(),
          password: envConfigService.getRedisPassword(),
          retryDelayOnFailover: 200,
        },
      }),
      inject: [EnvConfigService],
    }),
    BullModuleMq.registerQueue(...bullInjectionList),
  ],
  providers: [BullService],
  exports: [BullModuleMq, BullService],
})
export class BullModule {}
