import mongoose  from "mongoose";
import EmailAccount from "../model/email-account.model.js";
import { EmailProvider } from "../model/model.enums.js";


// Add Email Account
export const addEmailAccount = async (req, res) => {
  try {
    const userId = req.userId; // Set by authentication middleware

    const {
      provider,
      email,
      displayName,
      smtpHost,
      smtpPort,
      smtpSecure,
      isDefault,
    } = req.body;

    // 1. Validate authenticated user
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in.",
      });
    }

    // 2. Validate required fields
    if (!provider || !email) {
      return res.status(400).json({
        success: false,
        message: "Provider and email are required.",
      });
    }

    // 3. Validate provider
    if (!Object.values(EmailProvider).includes(provider)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email provider.",
      });
    }

    // 4. Validate email format
    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // 5. Check for an existing email account
    const existingAccount = await EmailAccount.findOne({
      userId,
      email: normalizedEmail,
    });

    if (existingAccount) {
      return res.status(409).json({
        success: false,
        message: "This email account has already been added.",
      });
    }

    // 6. Create email account
    const emailAccount = await EmailAccount.create({
      userId,
      provider,
      email: normalizedEmail,
      displayName,
      smtpHost,
      smtpPort,
      smtpSecure: smtpSecure ?? true,
      isDefault: isDefault ?? false,
      isVerified: false,
      isActive: true,
    });

    // 7. Send response
    return res.status(201).json({
      success: true,
      message: "Email account added successfully.",
      data: emailAccount,
    });
  } catch (error) {
    // Handle duplicate-key race conditions
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This email account has already been added.",
      });
    }

    console.error("Add email account error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add email account.",
    });
  }
};

// update email account
export const updateEmailAccount = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const {
      provider,
      email,
      displayName,
      smtpHost,
      smtpPort,
      smtpSecure,
      isDefault,
      isActive,
    } = req.body;

    // 1. Check authentication
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in.",
      });
    }

    // 2. Validate account ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email account ID.",
      });
    }

    // 3. Find account belonging to the logged-in user
    const emailAccount = await EmailAccount.findOne({
      _id: id,
      userId,
    });

    if (!emailAccount) {
      return res.status(404).json({
        success: false,
        message: "Email account not found.",
      });
    }

    // 4. Validate provider if provided
    if (
      provider !== undefined &&
      !Object.values(EmailProvider).includes(provider)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid email provider.",
      });
    }

    // 5. Validate email if provided
    if (email !== undefined) {
      if (typeof email !== "string") {
        return res.status(400).json({
          success: false,
          message: "Email must be a string.",
        });
      }

      const normalizedEmail = email.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(normalizedEmail)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid email address.",
        });
      }

      emailAccount.email = normalizedEmail;
    }

    // 6. Update allowed fields only
    if (provider !== undefined) emailAccount.provider = provider;
    if (displayName !== undefined) emailAccount.displayName = displayName;
    if (smtpHost !== undefined) emailAccount.smtpHost = smtpHost;
    if (smtpPort !== undefined) emailAccount.smtpPort = smtpPort;
    if (smtpSecure !== undefined) emailAccount.smtpSecure = smtpSecure;
    if (isActive !== undefined) emailAccount.isActive = isActive;

    // 7. Handle default account
    if (isDefault === true) {
      await EmailAccount.updateMany(
        { userId, _id: { $ne: id } },
        { $set: { isDefault: false } }
      );

      emailAccount.isDefault = true;
    } else if (isDefault === false) {
      emailAccount.isDefault = false;
    }

    // 8. Save changes
    await emailAccount.save();

    return res.status(200).json({
      success: true,
      message: "Email account updated successfully.",
      data: emailAccount,
    });
  } catch (error) {
    // Handle duplicate email constraint
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This email is already associated with your account.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Update email account error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update email account.",
    });
  }
};