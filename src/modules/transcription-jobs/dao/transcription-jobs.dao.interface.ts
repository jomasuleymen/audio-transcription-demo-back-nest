import { TranscriptionJob } from '../schemas/transcription-job.schema';

export interface TranscriptionJobsDao {
  create(job: TranscriptionJob): Promise<TranscriptionJob>;
  findAll(): Promise<TranscriptionJob[]>;
  findById(id: string): Promise<TranscriptionJob | null>;
  update(id: string, job: Partial<TranscriptionJob>): Promise<TranscriptionJob>;
}

export const TRANSCRIPTION_JOBS_DAO = Symbol('TRANSCRIPTION_JOBS_DAO');
