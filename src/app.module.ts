import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { TranscriptionJobsModule } from './modules/transcription-jobs/transcription-jobs.module';

@Module({
  imports: [CoreModule, TranscriptionJobsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
