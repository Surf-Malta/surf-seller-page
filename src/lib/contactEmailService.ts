// src/lib/contactEmailService.ts
import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_CONTACT_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID;

interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
  submittedAt: string;
}

export class ContactEmailService {
  static async sendContactNotification(
    data: ContactEmailData
  ): Promise<{ success: boolean; error?: string }> {
    try {
      if (
        !EMAILJS_PUBLIC_KEY ||
        !EMAILJS_SERVICE_ID ||
        !EMAILJS_CONTACT_TEMPLATE_ID
      ) {
        console.error(
          "EmailJS configuration missing for contact notifications"
        );
        return {
          success: false,
          error: "Email service configuration error",
        };
      }

      if (!emailjs || typeof emailjs.send !== "function") {
        console.error("EmailJS not initialized properly");
        return {
          success: false,
          error: "Email service initialization error",
        };
      }

      // Format the reason for better readability
      const formattedReason = this.formatReason(data.reason);

      const emailParams = {
        from_name: data.name,
        from_email: data.email,
        phone_number: data.phone,
        contact_reason: formattedReason,
        message: data.message,
        submitted_at: data.submittedAt,
        reply_to: data.email,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID!,
        EMAILJS_CONTACT_TEMPLATE_ID!,
        emailParams,
        EMAILJS_PUBLIC_KEY!
      );

      console.log("Contact notification sent successfully");
      return { success: true };
    } catch (error: any) {
      console.error(
        "Contact notification error:",
        error?.text || error?.message || error
      );
      return {
        success: false,
        error: error?.text || error?.message || "Failed to send notification",
      };
    }
  }

  // Helper method to format the reason value for better readability in emails
  private static formatReason(value: string): string {
    const formatMap: { [key: string]: string } = {
      no_vat: "I don't have a VAT number",
      vat_application: "Help with VAT application",
      individual_seller: "I'm an individual seller",
      business_registration: "Business registration assistance",
      general_inquiry: "General inquiry",
      other: "Other",
    };

    return formatMap[value] || value;
  }
}
