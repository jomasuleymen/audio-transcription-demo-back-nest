import { S3_BUCKET_NAMES } from '@core/s3/s3.constants';
import { S3Service } from '@core/s3/s3.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SystemUtils } from '@shared/utils/system.utils';
import { v4 as uuidv4 } from 'uuid';
import { CreateTranscriptionJobResponse } from './dto/create-transcription-job-response';
import { CreateTranscriptionJobInput } from './dto/create-transcription-job.input';
import { TranscriptionJob, TranscriptionJobStatus } from './entities/transcription-job.entity';

@Injectable()
export class TranscriptionJobsService {
  private transcriptions: TranscriptionJob[] = [];

  constructor(private readonly s3Service: S3Service) {}

  async create(createInput: CreateTranscriptionJobInput): Promise<CreateTranscriptionJobResponse> {
    const uploadUrl = await this.s3Service.generatePresignedUrl(
      S3_BUCKET_NAMES.TRANSCRIPTION_AUDIO,
      createInput.fileName,
      createInput.contentType,
    );

    const transcriptionJob: TranscriptionJob = {
      id: uuidv4(),
      fileName: createInput.fileName,
      status: TranscriptionJobStatus.WAITING,
      createdAt: new Date(),
    };

    this.transcriptions.push(transcriptionJob);

    return {
      job: transcriptionJob,
      uploadUrl,
    };
  }

  async findAll(): Promise<TranscriptionJob[]> {
    return this.transcriptions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async findOne(id: string): Promise<TranscriptionJob> {
    const transcription = this.transcriptions.find((t) => t.id === id);
    if (!transcription) {
      throw new NotFoundException(`Transcription with ID ${id} not found`);
    }

    return transcription;
  }

  async confirmJobFileUpload(id: string): Promise<TranscriptionJob> {
    const transcriptionJob = await this.findOne(id);

    if (!transcriptionJob) {
      throw new NotFoundException(`Transcription job with ID ${id} not found`);
    }

    if (transcriptionJob.status !== TranscriptionJobStatus.WAITING) {
      throw new BadRequestException('Transcription job is not waiting');
    }

    const s3Url = this.s3Service.getObjectUrl(
      S3_BUCKET_NAMES.TRANSCRIPTION_AUDIO,
      transcriptionJob.id,
    );

    transcriptionJob.status = TranscriptionJobStatus.PROCESSING;
    transcriptionJob.s3Url = s3Url;

    this.transcribeAudio(s3Url)
      .then(async (transcriptionText) => {
        transcriptionJob.status = TranscriptionJobStatus.COMPLETED;
        transcriptionJob.transcriptionText = transcriptionText;
        transcriptionJob.completedAt = new Date();
      })
      .catch(() => {});

    return transcriptionJob;
  }

  private async transcribeAudio(s3Url: string): Promise<string> {
    await SystemUtils.sleep(15000);

    return `Hello world! ${new Date().toLocaleString('ru-RU')}`;
  }
}
