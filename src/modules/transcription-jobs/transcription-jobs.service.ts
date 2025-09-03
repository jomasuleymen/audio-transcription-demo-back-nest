import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { BULL_QUEUE_JOB_NAME, BULL_QUEUE_NAME } from '@core/bull/bull.const';
import { BullService } from '@core/bull/bull.service';
import { S3_BUCKET_NAMES } from '@core/s3/s3.constants';
import { S3Service } from '@core/s3/s3.service';
import { TranscriptionQueueData } from '@modules/background/transcription/transcription-pc.types';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  TRANSCRIPTION_JOBS_DAO,
  type TranscriptionJobsDao,
} from './dao/transcription-jobs.dao.interface';
import { CreateTranscriptionJobResponse } from './dto/create-transcription-job-response';
import { CreateTranscriptionJobInput } from './dto/create-transcription-job.input';
import { TranscriptionJob, TranscriptionJobStatus } from './schemas/transcription-job.schema';

@Injectable()
export class TranscriptionJobsService {
  constructor(
    private readonly s3Service: S3Service,
    @Inject(TRANSCRIPTION_JOBS_DAO)
    private readonly transcriptionJobsDao: TranscriptionJobsDao,
    private readonly bullService: BullService,
  ) {}

  async create(createInput: CreateTranscriptionJobInput): Promise<CreateTranscriptionJobResponse> {
    const transcriptionJob: TranscriptionJob = {
      id: uuidv4(),
      fileName: createInput.fileName,
      status: TranscriptionJobStatus.WAITING,
      createdAt: new Date(),
    };

    const uploadUrl = await this.generateUploadPresignedUrl(
      transcriptionJob.id,
      createInput.contentType,
    );

    await this.transcriptionJobsDao.create(transcriptionJob);

    return {
      job: transcriptionJob,
      uploadUrl,
    };
  }

  async findAll(): Promise<TranscriptionJob[]> {
    return await this.transcriptionJobsDao.findAll();
  }

  async findOne(id: string): Promise<TranscriptionJob> {
    const transcription = await this.transcriptionJobsDao.findById(id);
    if (!transcription) {
      throw new NotFoundException(`Transcription with ID ${id} not found`);
    }

    return transcription;
  }

  async confirmJobFileUpload(id: string): Promise<TranscriptionJob> {
    const transcriptionJob = await this.findOne(id);

    if (transcriptionJob.status !== TranscriptionJobStatus.WAITING) {
      throw new BadRequestException('Transcription job is not waiting');
    }

    const s3Url = this.s3Service.getObjectUrl(
      S3_BUCKET_NAMES.TRANSCRIPTION_AUDIO,
      transcriptionJob.id,
    );

    await this.transcriptionJobsDao.update(transcriptionJob.id, {
      status: TranscriptionJobStatus.PROCESSING,
      s3Url,
    });

    await this.bullService.addJob<TranscriptionQueueData>(
      BULL_QUEUE_NAME.TRANSCRIPTION,
      BULL_QUEUE_JOB_NAME[BULL_QUEUE_NAME.TRANSCRIPTION].TRANSCRIBE_AUDIO,
      {
        transcriptionJobId: transcriptionJob.id,
      },
      {
        jobId: `audio-transcription-${transcriptionJob.id}`,
      },
    );

    return transcriptionJob;
  }

  async updateTranscriptionJob(
    id: string,
    data: Partial<TranscriptionJob>,
  ): Promise<TranscriptionJob> {
    return await this.transcriptionJobsDao.update(id, data);
  }

  private async generateUploadPresignedUrl(
    key: string,
    contentType: string,
    ttl: number = 900,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: S3_BUCKET_NAMES.TRANSCRIPTION_AUDIO,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.s3Service.getClient(), command, {
      expiresIn: ttl,
    });

    return uploadUrl;
  }
}
