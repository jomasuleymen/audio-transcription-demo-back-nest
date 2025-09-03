import { Injectable } from '@nestjs/common';
import { TranscriptionJob } from '../entities/transcription-job.entity';
import { TranscriptionJobsDao } from './transcription-jobs.dao.interface';

@Injectable()
export class TranscriptionJobsMemoryDao implements TranscriptionJobsDao {
  private jobs: TranscriptionJob[] = [];

  async create(job: TranscriptionJob): Promise<TranscriptionJob> {
    this.jobs.push(job);
    return job;
  }

  async findAll(): Promise<TranscriptionJob[]> {
    return [...this.jobs].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async findById(id: string): Promise<TranscriptionJob | null> {
    return this.jobs.find((job) => job.id === id) || null;
  }

  async update(id: string, job: Partial<TranscriptionJob>): Promise<TranscriptionJob> {
    const foundJob = await this.findById(id);

    if (!foundJob) {
      throw new Error(`Job with ID ${id} not found`);
    }

    Object.assign(foundJob, job);

    return foundJob;
  }
}
