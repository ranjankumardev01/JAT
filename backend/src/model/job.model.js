import mongoose from 'mongoose';
import { JobStatus, SkillImportance } from './model.enums.js';

const jobSkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    importance: {
      type: String,
      enum: Object.values(SkillImportance),
      required: true,
    },
  },
  { _id: false },
);

const jobSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    normalizedUrl: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    sourceUrl: String,
    location: String,
    employmentType: String,
    experienceMin: { type: Number, min: 0 },
    experienceMax: { type: Number, min: 0 },
    skills: {
      type: [jobSkillSchema],
      default: [],
    },
    qualifications: {
      type: [String],
      default: [],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: Object.values(JobStatus),
      default: JobStatus.OPEN,
      index: true,
    },
    analysisCompleted: {
      type: Boolean,
      default: false,
    },
    postedAt: Date,
    expiresAt: Date,
    lastCheckedAt: Date,
  },
  { timestamps: true, collection: 'jobs' },
);

jobSchema.index({ companyId: 1, status: 1, createdAt: -1 });
jobSchema.index({ title: 'text', description: 'text', location: 'text' });

const Job = mongoose.model('Job', jobSchema);

export default Job;