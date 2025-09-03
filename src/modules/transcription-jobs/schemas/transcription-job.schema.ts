import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Document } from 'mongoose';

export enum TranscriptionJobStatus {
  WAITING = 'WAITING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
}

registerEnumType(TranscriptionJobStatus, {
  name: 'TranscriptionJobStatus',
});

@ObjectType()
@Schema({
  collection: 'transcription_jobs',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class TranscriptionJob {
  @Field(() => ID)
  @Prop({ required: true, unique: true })
  id: string;

  @Field()
  @Prop({ required: true })
  fileName: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  s3Url?: string;

  @Field(() => TranscriptionJobStatus)
  @Prop({ 
    required: true, 
    enum: Object.values(TranscriptionJobStatus),
    default: TranscriptionJobStatus.WAITING 
  })
  status: TranscriptionJobStatus;

  @Field({ nullable: true })
  @Prop({ required: false })
  transcriptionText?: string;

  @Field()
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Field({ nullable: true })
  @Prop({ type: Date, required: false })
  completedAt?: Date;
}

export type TranscriptionJobDocument = TranscriptionJob & Document;
export const TranscriptionJobSchema = SchemaFactory.createForClass(TranscriptionJob);
