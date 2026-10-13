import mongoose from 'mongoose';
import { ResumeVersionStatus } from './model.enums.js';

const resumeVersionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    sourceResumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    fileKey: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    matchedSkills: {
      type: [String],
      default: [],
    },
    missingSkills: {
      type: [String],
      default: [],
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: Object.values(ResumeVersionStatus),
      default: ResumeVersionStatus.GENERATING,
    },
    approvedByUser: {
      type: Boolean,
      default: false,
    },
    approvedAt: Date,
  },
  { timestamps: true, collection: 'resume_versions' },
);

resumeVersionSchema.index(
  { userId: 1, sourceResumeId: 1, jobId: 1 },
  { unique: true },
);

const ResumeVersion = mongoose.model('ResumeVersion', resumeVersionSchema);

export default ResumeVersion;