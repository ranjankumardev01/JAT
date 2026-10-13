import mongoose from 'mongoose';
import { ContactType }from './model.enums.js';

const companyContactSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    name: String,
    jobTitle: String,
    contactType: {
      type: String,
      enum: Object.values(ContactType),
      default: ContactType.GENERAL,
    },
    phone: String,
    sourceUrl: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedAt: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, collection: 'company_contacts' },
);

companyContactSchema.index(
  { companyId: 1, email: 1 },
  {
    unique: true,
    partialFilterExpression: {
      email: { $type: 'string' },
    },
  },
);

const CompanyContact = mongoose.model('CompanyContact', companyContactSchema);

export default CompanyContact