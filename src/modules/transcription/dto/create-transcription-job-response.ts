import { Field, ObjectType } from '@nestjs/graphql';
import { TranscriptionJob } from '../entities/transcription.entity';

@ObjectType()
export class CreateTranscriptionJobResponseDto {
  @Field(() => TranscriptionJob)
  job: TranscriptionJob;

  @Field(() => String)
  uploadUrl: string;
}
