import { Module } from '@nestjs/common';
import { TranscriptionResolver } from './transcription.resolver';
import { TranscriptionService } from './transcription.service';

@Module({
  providers: [TranscriptionResolver, TranscriptionService],
  exports: [TranscriptionService],
})
export class TranscriptionModule {}
