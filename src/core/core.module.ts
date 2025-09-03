import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { EnvConfigModule } from './env-config/env-config.module';
import { S3Module } from './s3/s3.module';

@Global()
@Module({
  imports: [
    EnvConfigModule,
    S3Module,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
    }),
  ],
  providers: [],
  exports: [EnvConfigModule, S3Module],
})
export class CoreModule {}
