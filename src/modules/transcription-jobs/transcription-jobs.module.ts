import { Module } from '@nestjs/common';
import { TranscriptionJobsMemoryDao } from './dao/transcription-jobs-memory.dao';
import { TRANSCRIPTION_JOBS_DAO } from './dao/transcription-jobs.dao.interface';
import { TranscriptionJobsResolver } from './transcription-jobs.resolver';
import { TranscriptionJobsService } from './transcription-jobs.service';

@Module({
  providers: [
    TranscriptionJobsResolver,
    TranscriptionJobsService,
    {
      provide: TRANSCRIPTION_JOBS_DAO,
      useClass: TranscriptionJobsMemoryDao,
    },
  ],
  exports: [TranscriptionJobsService],
})
export class TranscriptionJobsModule {}
