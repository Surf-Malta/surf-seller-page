// Updated OTP Service with reduced time limits
// src/lib/otpService.ts

import { ref, set, get, remove } from "firebase/database";
import { realtimeDb } from "@/lib/firebase";
import emailjs from "@emailjs/browser";

// Initialize EmailJS with your public key
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

// Debug logging
console.log("EmailJS Configuration:", {
  hasPublicKey: !!EMAILJS_PUBLIC_KEY,
  hasServiceId: !!EMAILJS_SERVICE_ID,
  hasTemplateId: !!EMAILJS_TEMPLATE_ID,
  publicKey: EMAILJS_PUBLIC_KEY?.substring(0, 10) + "...",
  serviceId: EMAILJS_SERVICE_ID,
  templateId: EMAILJS_TEMPLATE_ID,
});

if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

interface OTPRecord {
  email: string;
  otp: string;
  createdAt: number;
  expiresAt: number;
  attempts: number;
  isVerified: boolean;
}

export class OTPService {
  private static readonly OTP_EXPIRY_MINUTES = 10;
  private static readonly MAX_ATTEMPTS = 3;
  private static readonly OTP_LENGTH = 6;
  private static readonly RESEND_COOLDOWN_SECONDS = 60; // Reduced from potential longer time

  // Generate random OTP
  private static generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Validate EmailJS configuration
  private static validateEmailJSConfig(): { valid: boolean; error?: string } {
    if (!EMAILJS_PUBLIC_KEY) {
      return { valid: false, error: "EMAILJS_PUBLIC_KEY not configured" };
    }
    if (!EMAILJS_SERVICE_ID) {
      return { valid: false, error: "EMAILJS_SERVICE_ID not configured" };
    }
    if (!EMAILJS_TEMPLATE_ID) {
      return { valid: false, error: "EMAILJS_TEMPLATE_ID not configured" };
    }
    return { valid: true };
  }

  // Send OTP via EmailJS with reduced cooldown
  static async sendOTP(
    email: string
  ): Promise<{ success: boolean; sessionId?: string; error?: string }> {
    try {
      if (!realtimeDb) {
        throw new Error("Database not initialized");
      }

      // Validate configuration
      const configCheck = this.validateEmailJSConfig();
      if (!configCheck.valid) {
        throw new Error(`EmailJS configuration error: ${configCheck.error}`);
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { success: false, error: "Invalid email format" };
      }

      // Check if there's an existing OTP that's still in cooldown
      const existingOTPRef = ref(
        realtimeDb,
        `otps/${email.replace(/[.@]/g, "_")}`
      );
      const existingSnapshot = await get(existingOTPRef);

      if (existingSnapshot.exists()) {
        const existingOTP: OTPRecord = existingSnapshot.val();
        const timeSinceCreated = Date.now() - existingOTP.createdAt;
        const cooldownMs = this.RESEND_COOLDOWN_SECONDS * 1000;

        // Check if still in cooldown period (60 seconds)
        if (timeSinceCreated < cooldownMs && !existingOTP.isVerified) {
          const remainingSeconds = Math.ceil(
            (cooldownMs - timeSinceCreated) / 1000
          );
          return {
            success: false,
            error: `Please wait ${remainingSeconds} seconds before requesting a new OTP.`,
          };
        }
      }

      const otp = this.generateOTP();
      const now = Date.now();
      const expiresAt = now + this.OTP_EXPIRY_MINUTES * 60 * 1000;

      // Store OTP in Firebase first
      const otpRecord: OTPRecord = {
        email,
        otp,
        createdAt: now,
        expiresAt,
        attempts: 0,
        isVerified: false,
      };

      await set(
        ref(realtimeDb, `otps/${email.replace(/[.@]/g, "_")}`),
        otpRecord
      );

      // Try multiple email parameter configurations
      const emailConfigs = [
        // Configuration 1: Standard EmailJS format
        {
          to_email: email,
          to_name: email.split("@")[0],
          otp_code: otp,
          expiry_minutes: this.OTP_EXPIRY_MINUTES.toString(),
          user_email: email,
          reply_to: email,
        },
        // Configuration 2: Alternative field names
        {
          email: email,
          to_email: email,
          recipient_email: email,
          name: email.split("@")[0],
          to_name: email.split("@")[0],
          recipient_name: email.split("@")[0],
          otp: otp,
          otp_code: otp,
          code: otp,
          expiry_minutes: this.OTP_EXPIRY_MINUTES.toString(),
          expiry: this.OTP_EXPIRY_MINUTES.toString(),
        },
        // Configuration 3: Simple format
        {
          email_to: email,
          name_to: email.split("@")[0],
          message: `Your OTP code is: ${otp}. Valid for ${this.OTP_EXPIRY_MINUTES} minutes.`,
          otp_code: otp,
        },
      ];

      let lastError: any = null;

      // Try each configuration
      for (let i = 0; i < emailConfigs.length; i++) {
        const emailParams = emailConfigs[i];

        console.log(`Trying email configuration ${i + 1}:`, {
          ...emailParams,
          otp_code: "****** (hidden)",
          otp: "****** (hidden)",
          code: "****** (hidden)",
        });

        try {
          const response = await emailjs.send(
            EMAILJS_SERVICE_ID!,
            EMAILJS_TEMPLATE_ID!,
            emailParams,
            EMAILJS_PUBLIC_KEY
          );

          console.log("Email sent successfully with config", i + 1, response);
          return { success: true, sessionId: `otp_${now}` };
        } catch (error: any) {
          console.error(`Configuration ${i + 1} failed:`, error);
          lastError = error;

          // If it's a 422 error, try next configuration
          if (error.status === 422) {
            continue;
          } else {
            // For other errors, stop trying
            throw error;
          }
        }
      }

      // If all configurations failed
      throw lastError || new Error("All email configurations failed");
    } catch (error: any) {
      console.error("Error sending OTP:", error);

      // Clean up stored OTP on email failure
      if (realtimeDb) {
        try {
          await remove(ref(realtimeDb, `otps/${email.replace(/[.@]/g, "_")}`));
        } catch (cleanupError) {
          console.error("Error cleaning up failed OTP:", cleanupError);
        }
      }

      let errorMessage = "Failed to send OTP";

      if (error.status === 422) {
        errorMessage =
          "Email configuration error. Please check your EmailJS template setup.";
      } else if (error.status === 400) {
        errorMessage = "Invalid email parameters. Please try again.";
      } else if (error.status === 401) {
        errorMessage =
          "EmailJS authentication failed. Please check your configuration.";
      } else if (error.text) {
        errorMessage = `Email service error: ${error.text}`;
      } else if (error.message) {
        errorMessage = error.message;
      }

      return { success: false, error: errorMessage };
    }
  }

  // Verify OTP (same as before)
  static async verifyOTP(
    email: string,
    inputOTP: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      if (!realtimeDb) {
        throw new Error("Database not initialized");
      }

      const otpRef = ref(realtimeDb, `otps/${email.replace(/[.@]/g, "_")}`);
      const snapshot = await get(otpRef);

      if (!snapshot.exists()) {
        return {
          success: false,
          error: "OTP not found. Please request a new one.",
        };
      }

      const otpRecord: OTPRecord = snapshot.val();

      // Check if OTP is expired
      if (otpRecord.expiresAt < Date.now()) {
        await remove(otpRef); // Clean up expired OTP
        return {
          success: false,
          error: "OTP has expired. Please request a new one.",
        };
      }

      // Check if already verified
      if (otpRecord.isVerified) {
        return { success: false, error: "OTP has already been used." };
      }

      // Check attempts limit
      if (otpRecord.attempts >= this.MAX_ATTEMPTS) {
        await remove(otpRef); // Clean up after max attempts
        return {
          success: false,
          error:
            "Maximum verification attempts exceeded. Please request a new OTP.",
        };
      }

      // Verify OTP
      if (otpRecord.otp !== inputOTP) {
        // Increment attempts
        await set(otpRef, {
          ...otpRecord,
          attempts: otpRecord.attempts + 1,
        });

        const remainingAttempts = this.MAX_ATTEMPTS - (otpRecord.attempts + 1);
        return {
          success: false,
          error: `Invalid OTP. ${remainingAttempts} attempts remaining.`,
        };
      }

      // Mark as verified
      await set(otpRef, {
        ...otpRecord,
        isVerified: true,
      });

      return { success: true };
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to verify OTP",
      };
    }
  }

  // Check if email is verified
  static async isEmailVerified(email: string): Promise<boolean> {
    try {
      if (!realtimeDb) {
        return false;
      }

      const otpRef = ref(realtimeDb, `otps/${email.replace(/[.@]/g, "_")}`);
      const snapshot = await get(otpRef);

      if (!snapshot.exists()) {
        return false;
      }

      const otpRecord: OTPRecord = snapshot.val();
      return otpRecord.isVerified && otpRecord.expiresAt > Date.now();
    } catch (error) {
      console.error("Error checking email verification:", error);
      return false;
    }
  }

  // Clean up verified OTP
  static async cleanupOTP(email: string): Promise<void> {
    try {
      if (!realtimeDb) {
        return;
      }

      const otpRef = ref(realtimeDb, `otps/${email.replace(/[.@]/g, "_")}`);
      await remove(otpRef);
    } catch (error) {
      console.error("Error cleaning up OTP:", error);
    }
  }
}
