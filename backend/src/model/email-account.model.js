import mongoose  from 'mongoose';
import { EmailProvider } from './model.enums.js';

const emailAccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    provider: {
      type: String,
      enum: Object.values(EmailProvider),
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    displayName: String,

    // These values must be encrypted before storage.
    encryptedAccessToken: { type: String, select: false },
    encryptedRefreshToken: { type: String, select: false },
    encryptedAppPassword: { type: String, select: false },

    smtpHost: String,
    smtpPort: {
      type: Number,
      min: 1,
      max: 65535,
    },
    smtpSecure: {
      type: Boolean,
      default: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    tokenExpiresAt: Date,
    lastSyncedAt: Date,
  },
  { timestamps: true, collection: 'email_accounts' },
);

emailAccountSchema.index(
  { userId: 1, email: 1 },
  { unique: true },
);

const EmailAccount =mongoose.model('EmailAccount', emailAccountSchema);

export default EmailAccount;