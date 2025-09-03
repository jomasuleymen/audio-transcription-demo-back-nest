import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { TranscriptionModule } from './modules/transcription/transcription.module';

@Module({
  imports: [CoreModule, TranscriptionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
