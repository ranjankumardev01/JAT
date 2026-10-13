import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    normalizedName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    website: String,
    careersUrl: String,
    industry: String,
    description: String,
    headquarters: String,
    locations: {
      type: [String],
      default: [],
    },
    sourceUrl: String,
    lastVerifiedAt: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, collection: 'companies' },
);

companySchema.index({ name: 'text', industry: 'text' });

const Company = mongoose.model('Company', companySchema);

export default Company