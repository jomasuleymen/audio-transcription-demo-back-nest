import { Field, ObjectType } from '@nestjs/graphql';
import { TranscriptionJob } from '../entities/transcription-job.entity';

@ObjectType()
export class CreateTranscriptionJobResponse {
  @Field(() => TranscriptionJob)
  job: TranscriptionJob;

  @Field(() => String)
  uploadUrl: string;
}
