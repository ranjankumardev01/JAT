 import mongoose from 'mongoose';
import {
  FollowUpChannel,
  FollowUpStatus,
} from './model.enums.js';

const followUpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobApplication',
      required: true,
      index: true,
    },
    dueAt: {
      type: Date,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(FollowUpStatus),
      default: FollowUpStatus.PENDING,
      index: true,
    },
    channel: {
      type: String,
      enum: Object.values(FollowUpChannel),
      default: FollowUpChannel.REMINDER,
    },
    notes: String,
    emailJobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmailJob',
    },
    completedAt: Date,
  },
  { timestamps: true, collection: 'follow_ups' },
);

followUpSchema.index({ userId: 1, status: 1, dueAt: 1 });

const FollowUp= mongoose.model('FollowUp', followUpSchema);

export default FollowUp;