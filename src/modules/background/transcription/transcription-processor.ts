import { BULL_QUEUE_JOB_NAME, BULL_QUEUE_NAME } from '@core/bull/bull.const';
import { TranscriptionJobStatus } from '@modules/transcription-jobs/schemas/transcription-job.schema';
import { TranscriptionJobsService } from '@modules/transcription-jobs/transcription-jobs.service';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { SystemUtils } from '@shared/utils/system.utils';
import { Job } from 'bullmq';
import { TranscriptionQueueData } from './transcription-pc.types';

@Processor(BULL_QUEUE_NAME.TRANSCRIPTION)
export class TranscriptionProcessor extends WorkerHost {
  private readonly logger = new Logger(TranscriptionProcessor.name);

  private readonly transcriptionJobNames = BULL_QUEUE_JOB_NAME[BULL_QUEUE_NAME.TRANSCRIPTION];

  constructor(private readonly transcriptionJobsService: TranscriptionJobsService) {
    super();
  }

  async process(job: Job<TranscriptionQueueData>) {
    try {
      switch (job.name) {
        case this.transcriptionJobNames.TRANSCRIBE_AUDIO:
          return await this.transcribeAudio(job.data);
      }
    } catch (error) {
      this.logger.error(`Call job ${job.name} failed`, error);
      throw error;
    }
  }

  async transcribeAudio(data: TranscriptionQueueData) {
    await SystemUtils.sleep(2000);

    return `Hello world! ${new Date().toLocaleString('ru-RU')}`;
  }

  @OnWorkerEvent('completed')
  async onCompleted(job: Job<TranscriptionQueueData>, returnValue: string): Promise<void> {
    await this.transcriptionJobsService.updateTranscriptionJob(job.data.transcriptionJobId, {
      status: TranscriptionJobStatus.COMPLETED,
      transcriptionText: returnValue,
      completedAt: new Date(),
    });
  }

  //   ... другие ивенты
}
