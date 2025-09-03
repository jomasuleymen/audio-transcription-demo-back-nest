import { Field, ObjectType } from '@nestjs/graphql';
import { TranscriptionJob } from '../schemas/transcription-job.schema';

@ObjectType()
export class CreateTranscriptionJobResponse {
  @Field(() => TranscriptionJob)
  job: TranscriptionJob;

  @Field(() => String)
  uploadUrl: string;
}
