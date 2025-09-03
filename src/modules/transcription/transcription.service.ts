import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTranscriptionJobInput } from './dto/create-transcription-job.input';
import { TranscriptionJob, TranscriptionJobStatus } from './entities/transcription.entity';

@Injectable()
export class TranscriptionService {
  private transcriptions: TranscriptionJob[] = [];
  private idCounter = 1;

  create(createTranscriptionInput: CreateTranscriptionJobInput): TranscriptionJob {
    const transcription: TranscriptionJob = {
      id: this.idCounter.toString(),
      fileName: createTranscriptionInput.fileName,
      status: TranscriptionJobStatus.WAITING,
    };

    this.transcriptions.push(transcription);
    this.idCounter++;

    return transcription;
  }

  findAll(): TranscriptionJob[] {
    return this.transcriptions;
  }

  findOne(id: string): TranscriptionJob {
    const transcription = this.transcriptions.find((t) => t.id === id);
    if (!transcription) {
      throw new NotFoundException(`Transcription with ID ${id} not found`);
    }

    return transcription;
  }

  confirmFileUpload(id: string): TranscriptionJob {
    const transcriptionJob = this.findOne(id);

    if (!transcriptionJob) {
      throw new NotFoundException(`Transcription job with ID ${id} not found`);
    }

    if (transcriptionJob.status !== TranscriptionJobStatus.WAITING) {
      throw new BadRequestException('Transcription job is not waiting');
    }

    transcriptionJob.status = TranscriptionJobStatus.PROCESSING;
    transcriptionJob.s3Url = 'test';

    this.transcribeAudio(transcriptionJob.s3Url).then((transcriptionText) => {
      transcriptionJob.status = TranscriptionJobStatus.COMPLETED;
      transcriptionJob.transcriptionText = transcriptionText;
    });

    return transcriptionJob;
  }

  private async transcribeAudio(s3Url: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 15000));

    return 'Hello world!';
  }
}
