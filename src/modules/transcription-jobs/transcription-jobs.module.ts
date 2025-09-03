import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TranscriptionJobsMongoDao } from './dao/transcription-jobs-mongo.dao';
import { TRANSCRIPTION_JOBS_DAO } from './dao/transcription-jobs.dao.interface';
import { TranscriptionJobDocument, TranscriptionJobSchema } from './schemas/transcription-job.schema';
import { TranscriptionJobsResolver } from './transcription-jobs.resolver';
import { TranscriptionJobsService } from './transcription-jobs.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TranscriptionJobDocument.name, schema: TranscriptionJobSchema },
    ]),
  ],
  providers: [
    TranscriptionJobsResolver,
    TranscriptionJobsService,
    {
      provide: TRANSCRIPTION_JOBS_DAO,
      useClass: TranscriptionJobsMongoDao,
    },
  ],
  exports: [TranscriptionJobsService],
})
export class TranscriptionJobsModule {}
