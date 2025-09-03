import { TranscriptionJobsModule } from '@modules/transcription-jobs/transcription-jobs.module';
import { Module } from '@nestjs/common';
import { TranscriptionProcessor } from './transcription/transcription-processor';

@Module({
  imports: [TranscriptionJobsModule],
  providers: [TranscriptionProcessor],
})
export class BackgroundModule {}
