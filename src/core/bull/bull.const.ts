import { RegisterQueueOptions } from '@nestjs/bullmq';

export enum BULL_QUEUE_NAME {
  TRANSCRIPTION = 'transcription',
}

export const BULL_QUEUE_JOB_NAME = {
  [BULL_QUEUE_NAME.TRANSCRIPTION]: {
    TRANSCRIBE_AUDIO: 'transcribe-audio',
  },
} as const;

export const bullInjectionList: RegisterQueueOptions[] = Object.values(BULL_QUEUE_NAME).map(
  (name) => ({
    name,
  }),
);
