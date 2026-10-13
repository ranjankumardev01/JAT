import mongoose from 'mongoose';
import { EmailJobStatus } from './model.enums.js';

const emailJobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmailCampaign',
    },
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobApplication',
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(EmailJobStatus),
      default: EmailJobStatus.PENDING,
      index: true,
    },
    idempotencyKey: {
      type: String,
      required: true,
      unique: true,
    },
    runAt: {
      type: Date,
      required: true,
      index: true,
    },
    attempts: { type: Number, min: 0, default: 0 },
    maxAttempts: { type: Number, min: 1, default: 3 },
    lockedAt: Date,
    completedAt: Date,
    lastError: String,
  },
  { timestamps: true, collection: 'email_jobs' },
);

emailJobSchema.index({ status: 1, runAt: 1 });

const EmailJob =mongoose.model('EmailJob', emailJobSchema);

export default EmailJob;
