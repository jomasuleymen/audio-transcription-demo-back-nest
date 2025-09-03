import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Job, JobsOptions, Queue } from 'bullmq';
import { BULL_QUEUE_NAME } from './bull.const';

@Injectable()
export class BullService {
  private readonly logger = new Logger(BullService.name);

  constructor(@InjectQueue(BULL_QUEUE_NAME.TRANSCRIPTION) private transcriptionQueue: Queue) {}

  async addJob<T>(
    queueName: BULL_QUEUE_NAME,
    jobName: string,
    data: T,
    options: JobsOptions,
  ): Promise<Job<T> | null> {
    try {
      const queue = this.getQueue(queueName);

      const job = await queue.add(jobName, data, {
        ...this.getDefaultJobOptions(queueName),
        ...options,
      });

      return job;
    } catch (error) {
      this.logger.error(`Failed to add job ${jobName} to ${queueName} queue`, error);
      throw error;
    }
  }

  private getQueue(queueName: BULL_QUEUE_NAME): Queue {
    switch (queueName) {
      case BULL_QUEUE_NAME.TRANSCRIPTION:
        return this.transcriptionQueue;
      default:
        throw new Error(`Unknown queue name: ${queueName}`);
    }
  }

  private getDefaultJobOptions(queueName: BULL_QUEUE_NAME): JobsOptions {
    switch (queueName) {
      case BULL_QUEUE_NAME.TRANSCRIPTION:
        return {
          attempts: 1,
        };

      default:
        return {};
    }
  }
}
