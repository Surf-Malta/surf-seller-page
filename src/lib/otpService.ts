// src/lib/otpService.ts
import { realtimeDb as getRealtimeDb } from "@/lib/firebase";
import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

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
  private static readonly RESEND_COOLDOWN_SECONDS = 60;

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

  // Send OTP via EmailJS
  static async sendOTP(
    email: string
  ): Promise<{ success: boolean; sessionId?: string; error?: string }> {
    try {
      const db = await getRealtimeDb();
      if (!db) {
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

      // Lazy import Firebase functions
      const { ref, get, set } = await import("firebase/database");

      // Check if there's an existing OTP that's still in cooldown
      const existingOTPRef = ref(
        db,
        `otps/${email.replace(/[.@]/g, "_")}`
      );
      const existingSnapshot = await get(existingOTPRef);

      if (existingSnapshot.exists()) {
        const existingOTP: OTPRecord = existingSnapshot.val();
        const timeSinceCreated = Date.now() - existingOTP.createdAt;
        const cooldownMs = this.RESEND_COOLDOWN_SECONDS * 1000;

        // Check if still in cooldown period
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
        ref(db, `otps/${email.replace(/[.@]/g, "_")}`),
        otpRecord
      );

      // Email configurations to try
      const emailConfigs = [
        {
          to_email: email,
          to_name: email.split("@")[0],
          otp_code: otp,
          expiry_minutes: this.OTP_EXPIRY_MINUTES.toString(),
          user_email: email,
          reply_to: email,
        },
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

        try {
          const response = await emailjs.send(
            EMAILJS_SERVICE_ID!,
            EMAILJS_TEMPLATE_ID!,
            emailParams,
            EMAILJS_PUBLIC_KEY
          );

          return { success: true, sessionId: `otp_${now}` };
        } catch (error: any) {
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
      // Clean up stored OTP on email failure
      const db = await getRealtimeDb();
      if (db) {
        try {
          const { ref, remove } = await import("firebase/database");
          await remove(ref(db, `otps/${email.replace(/[.@]/g, "_")}`));
        } catch (cleanupError) {
          // Silent cleanup failure
        }
      }

      let errorMessage = "Failed to send OTP";

      if (error.status === 422) {
        errorMessage = "Email configuration error. Please try again.";
      } else if (error.status === 400) {
        errorMessage = "Invalid email parameters. Please try again.";
      } else if (error.status === 401) {
        errorMessage = "Email service authentication failed.";
      } else if (error.text) {
        errorMessage = `Email service error: ${error.text}`;
      } else if (error.message) {
        errorMessage = error.message;
      }

      return { success: false, error: errorMessage };
    }
  }

  // Verify OTP
  static async verifyOTP(
    email: string,
    inputOTP: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const db = await getRealtimeDb();
      if (!db) {
        throw new Error("Database not initialized");
      }

      const { ref, get, set, remove } = await import("firebase/database");

      const otpRef = ref(db, `otps/${email.replace(/[.@]/g, "_")}`);
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
        await remove(otpRef);
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
        await remove(otpRef);
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
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to verify OTP",
      };
    }
  }

  // Check if email is verified
  static async isEmailVerified(email: string): Promise<boolean> {
    try {
      const db = await getRealtimeDb();
      if (!db) {
        return false;
      }

      const { ref, get } = await import("firebase/database");

      const otpRef = ref(db, `otps/${email.replace(/[.@]/g, "_")}`);
      const snapshot = await get(otpRef);

      if (!snapshot.exists()) {
        return false;
      }

      const otpRecord: OTPRecord = snapshot.val();
      return otpRecord.isVerified && otpRecord.expiresAt > Date.now();
    } catch (error) {
      return false;
    }
  }

  // Clean up verified OTP
  static async cleanupOTP(email: string): Promise<void> {
    try {
      const db = await getRealtimeDb();
      if (!db) {
        return;
      }

      const { ref, remove } = await import("firebase/database");

      const otpRef = ref(db, `otps/${email.replace(/[.@]/g, "_")}`);
      await remove(otpRef);
    } catch (error) {
      // Silent cleanup failure
    }
  }
}
