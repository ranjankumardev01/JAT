import mongoose from 'mongoose';
import { EmailEventType } from './model.enums.js';

const emailEventSchema = new mongoose.Schema(
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
    eventType: {
      type: String,
      enum: Object.values(EmailEventType),
      required: true,
      index: true,
    },
    providerEventId: String,
    providerMessageId: String,
    occurredAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    replyFrom: {
      type: String,
      lowercase: true,
      trim: true,
    },
    replySubject: String,
    replyText: String,
    errorMessage: String,
  },
  { timestamps: true, collection: 'email_events' },
);

emailEventSchema.index(
  { userId: 1, providerEventId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      providerEventId: { $type: 'string' },
    },
  },
);

const EmailEvent= mongoose.model('EmailEvent', emailEventSchema);

export default EmailEvent;