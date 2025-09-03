import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TranscriptionJob, TranscriptionJobDocument } from '../schemas/transcription-job.schema';
import { TranscriptionJobsDao } from './transcription-jobs.dao.interface';

@Injectable()
export class TranscriptionJobsMongoDao implements TranscriptionJobsDao {
  constructor(
    @InjectModel(TranscriptionJob.name)
    private readonly transcriptionJobModel: Model<TranscriptionJobDocument>,
  ) {}

  async create(job: TranscriptionJob): Promise<TranscriptionJob> {
    const createdJob = new this.transcriptionJobModel(job);
    const savedJob = await createdJob.save();
    return this.mapDocumentToEntity(savedJob);
  }

  async findAll(): Promise<TranscriptionJob[]> {
    const jobs = await this.transcriptionJobModel.find().sort({ createdAt: -1 }).lean().exec();

    return jobs.map(this.mapDocumentToEntity);
  }

  async findById(id: string): Promise<TranscriptionJob | null> {
    const job = await this.transcriptionJobModel.findOne({ id }).lean().exec();

    return job ? this.mapDocumentToEntity(job) : null;
  }

  async update(id: string, jobUpdate: Partial<TranscriptionJob>): Promise<TranscriptionJob> {
    const updatedJob = await this.transcriptionJobModel
      .findOneAndUpdate({ id }, { $set: jobUpdate }, { new: true, lean: true })
      .exec();

    if (!updatedJob) {
      throw new NotFoundException(`Transcription job with ID ${id} not found`);
    }

    return this.mapDocumentToEntity(updatedJob);
  }

  private mapDocumentToEntity(doc: TranscriptionJobDocument): TranscriptionJob {
    return {
      id: doc.id,
      fileName: doc.fileName,
      s3Url: doc.s3Url,
      status: doc.status,
      transcriptionText: doc.transcriptionText,
      createdAt: doc.createdAt,
      completedAt: doc.completedAt,
    };
  }
}
