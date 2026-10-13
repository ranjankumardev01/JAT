import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    fullName: String,
    phone: String,
    headline: String,
    location: String,
    targetRoles: {
      type: [String],
      default: [],
    },
    preferredLocations: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    experienceYears: {
      type: Number,
      min: 0,
      default: 0,
    },
    expectedSalary: String,
    portfolioUrl: String,
    githubUrl: String,
    linkedinUrl: String,
    timezone: {
      type: String,
      default: 'Asia/Kolkata',
    },
    defaultResumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
    },
  },
  { timestamps: true, collection: 'user_profiles' },
);

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile