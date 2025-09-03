import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTranscriptionJobInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  contentType: string;
}
