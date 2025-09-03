import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTranscriptionJobInput } from './dto/create-transcription-job.input';
import { TranscriptionJob } from './entities/transcription.entity';
import { TranscriptionService } from './transcription.service';

@Resolver(() => TranscriptionJob)
export class TranscriptionResolver {
  constructor(private readonly transcriptionService: TranscriptionService) {}

  @Query(() => [TranscriptionJob])
  transcriptions(): TranscriptionJob[] {
    return this.transcriptionService.findAll();
  }

  @Query(() => TranscriptionJob)
  transcription(@Args('id', { type: () => ID }) id: string): TranscriptionJob {
    return this.transcriptionService.findOne(id);
  }

  @Mutation(() => TranscriptionJob)
  createTranscription(@Args('input') input: CreateTranscriptionJobInput): TranscriptionJob {
    return this.transcriptionService.create(input);
  }

  @Mutation(() => TranscriptionJob)
  confirmFileUpload(@Args('jobId', { type: () => String }) jobId: string): TranscriptionJob {
    return this.transcriptionService.confirmFileUpload(jobId);
  }
}
