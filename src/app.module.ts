import { CoreModule } from '@core/core.module';
import { BackgroundModule } from '@modules/background/background.module';
import { Module } from '@nestjs/common';
import { TranscriptionJobsModule } from './modules/transcription-jobs/transcription-jobs.module';

@Module({
  imports: [CoreModule, BackgroundModule, TranscriptionJobsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
