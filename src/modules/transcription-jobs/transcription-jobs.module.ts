import { Module } from '@nestjs/common';
import { TranscriptionJobsResolver } from './transcription-jobs.resolver';
import { TranscriptionJobsService } from './transcription-jobs.service';

@Module({
  providers: [TranscriptionJobsResolver, TranscriptionJobsService],
  exports: [TranscriptionJobsService],
})
export class TranscriptionJobsModule {}
