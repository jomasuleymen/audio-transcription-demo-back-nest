import { S3_BUCKET_NAMES } from './s3.constants';

export type S3BucketName = (typeof S3_BUCKET_NAMES)[keyof typeof S3_BUCKET_NAMES];