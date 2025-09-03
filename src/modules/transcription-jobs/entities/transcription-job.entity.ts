import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum TranscriptionJobStatus {
  WAITING = 'WAITING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
}

registerEnumType(TranscriptionJobStatus, {
  name: 'TranscriptionJobStatus',
});

@ObjectType()
export class TranscriptionJob {
  @Field(() => ID)
  id: string;

  @Field()
  fileName: string;

  @Field({ nullable: true })
  s3Url?: string;

  @Field(() => TranscriptionJobStatus)
  status: TranscriptionJobStatus;

  @Field({ nullable: true })
  transcriptionText?: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  completedAt?: Date;
}
