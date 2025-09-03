import { TranscriptionJob } from '../entities/transcription-job.entity';

export interface TranscriptionJobsDao {
  create(job: TranscriptionJob): Promise<TranscriptionJob>;
  findAll(): Promise<TranscriptionJob[]>;
  findById(id: string): Promise<TranscriptionJob | null>;
  update(id: string, job: Partial<TranscriptionJob>): Promise<TranscriptionJob>;
  deleteById(id: string): Promise<void>;
  findByStatus(status: string): Promise<TranscriptionJob[]>;
}

export const TRANSCRIPTION_JOBS_DAO = Symbol('TRANSCRIPTION_JOBS_DAO');
