import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BullModule } from './bull/bull.module';
import { DatabaseModule } from './database/database.module';
import { EnvConfigModule } from './env-config/env-config.module';
import { S3Module } from './s3/s3.module';

@Global()
@Module({
  imports: [
    EnvConfigModule,
    DatabaseModule,
    S3Module,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    BullModule,
  ],
  providers: [],
  exports: [EnvConfigModule, DatabaseModule, S3Module, BullModule],
})
export class CoreModule {}
