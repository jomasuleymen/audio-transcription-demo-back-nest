import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfigService } from '@core/env-config/env-config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (envConfigService: EnvConfigService) => {
        const uri = `mongodb://${envConfigService.getMongoHost()}:${envConfigService.getMongoPort()}`;

        return {
          uri,
          user: envConfigService.getMongoUsername(),
          pass: envConfigService.getMongoPassword(),
          dbName: envConfigService.getMongoDatabase(),
        };
      },
      inject: [EnvConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
