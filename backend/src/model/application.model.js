import mongoose from 'mongoose';
import {
  ApplicationStatus,
  AttachmentType,
  EmailStatus,
} from './model.enums.js';

const attachmentSchema = new mongoose.Schema(
  {
    fileKey: { type: String, required: true },
    fileName: { type: String, required: true },
    mimeType: { type: String, required: true },
    sizeBytes: { type: Number, required: true, min: 0 },
    type: {
      type: String,
      enum: Object.values(AttachmentType),
      required: true,
    },
  },
  { _id: false },
);

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    emailAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmailAccount',
      required: true,
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmailTemplate',
    },
    resumeVersionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ResumeVersion',
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    toEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    cc: { type: [String], default: [] },
    bcc: { type: [String], default: [] },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    attachments: {
      type: [attachmentSchema],
      default: [],
    },
    emailStatus: {
      type: String,
      enum: Object.values(EmailStatus),
      default: EmailStatus.DRAFT,
      index: true,
    },
    applicationStatus: {
      type: String,
      enum: Object.values(ApplicationStatus),
      default: ApplicationStatus.APPLIED,
      index: true,
    },
    scheduledAt: Date,
    sentAt: Date,
    lastError: String,
    providerMessageId: String,
    approvedByUser: { type: Boolean, default: false },
    approvedAt: Date,
    attemptCount: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true, collection: 'applications' },
);

applicationSchema.index({ userId: 1, companyId: 1, createdAt: -1 });
applicationSchema.index({ userId: 1, jobId: 1, createdAt: -1 });
applicationSchema.index({ emailStatus: 1, scheduledAt: 1 });

const JobApplication = mongoose.model('JobApplication', applicationSchema);

export default JobApplication;