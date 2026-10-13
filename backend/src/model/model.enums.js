
export const EmailProvider = Object.freeze({
  GMAIL: "GMAIL",
  OUTLOOK: "OUTLOOK",
  SMTP: "SMTP",
});

export const ContactType = Object.freeze({
  HR: "HR",
  RECRUITER: "RECRUITER",
  TALENT_ACQUISITION: "TALENT_ACQUISITION",
  HIRING_MANAGER: "HIRING_MANAGER",
  GENERAL: "GENERAL",
});

export const JobStatus = Object.freeze({
  OPEN: "OPEN",
  CLOSED: "CLOSED",
  EXPIRED: "EXPIRED",
  DRAFT: "DRAFT",
});

export const SkillImportance = Object.freeze({
  REQUIRED: "REQUIRED",
  PREFERRED: "PREFERRED",
});

export const ResumeVersionStatus = Object.freeze({
  GENERATING: "GENERATING",
  READY: "READY",
  FAILED: "FAILED",
});

export const TemplateType = Object.freeze({
  GENERAL: "GENERAL",
  JOB_APPLICATION: "JOB_APPLICATION",
  FOLLOW_UP: "FOLLOW_UP",
  REFERRAL: "REFERRAL",
});

export const EmailStatus = Object.freeze({
  DRAFT: "DRAFT",
  PENDING_APPROVAL: "PENDING_APPROVAL",
  SCHEDULED: "SCHEDULED",
  QUEUED: "QUEUED",
  SENDING: "SENDING",
  SENT: "SENT",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
});

export const ApplicationStatus = Object.freeze({
  APPLIED: "APPLIED",
  REPLIED: "REPLIED",
  INTERVIEW: "INTERVIEW",
  REJECTED: "REJECTED",
  OFFER: "OFFER",
  WITHDRAWN: "WITHDRAWN",
});

export const CampaignStatus = Object.freeze({
  DRAFT: "DRAFT",
  SCHEDULED: "SCHEDULED",
  RUNNING: "RUNNING",
  PAUSED: "PAUSED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
});

export const EmailJobStatus = Object.freeze({
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
});

export const EmailEventType = Object.freeze({
  QUEUED: "QUEUED",
  SENT: "SENT",
  DELIVERED: "DELIVERED",
  BOUNCED: "BOUNCED",
  FAILED: "FAILED",
  REPLY_RECEIVED: "REPLY_RECEIVED",
});

export const AttachmentType = Object.freeze({
  RESUME: "RESUME",
  COVER_LETTER: "COVER_LETTER",
  PORTFOLIO: "PORTFOLIO",
  OTHER: "OTHER",
});

export const FollowUpStatus = Object.freeze({
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
});

export const FollowUpChannel = Object.freeze({
  EMAIL: "EMAIL",
  REMINDER: "REMINDER",
});
