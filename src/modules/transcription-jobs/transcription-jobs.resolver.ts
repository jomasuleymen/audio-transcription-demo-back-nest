import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTranscriptionJobInput } from './dto/create-transcription-job.input';
import { TranscriptionJob } from './entities/transcription-job.entity';
import { TranscriptionJobsService } from './transcription-jobs.service';
import { CreateTranscriptionJobResponse } from './dto/create-transcription-job-response';

@Resolver(() => TranscriptionJob)
export class TranscriptionJobsResolver {
  constructor(private readonly transcriptionJobsService: TranscriptionJobsService) {}

  @Query(() => [TranscriptionJob])
  async transcriptionJobs() {
    return this.transcriptionJobsService.findAll();
  }

  @Query(() => TranscriptionJob)
  async transcriptionJob(@Args('id', { type: () => ID! }) id: string) {
    return this.transcriptionJobsService.findOne(id);
  }

  @Mutation(() => CreateTranscriptionJobResponse)
  async createTranscriptionJob(@Args('input') input: CreateTranscriptionJobInput) {
    return this.transcriptionJobsService.create(input);
  }

  @Mutation(() => TranscriptionJob)
  async confirmJobFileUpload(@Args('jobId', { type: () => ID! }) jobId: string) {
    return this.transcriptionJobsService.confirmJobFileUpload(jobId);
  }
}
