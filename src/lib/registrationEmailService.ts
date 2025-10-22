// src/lib/registrationEmailService.ts
import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_REGISTRATION_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_REGISTRATION_TEMPLATE_ID;

interface RegistrationEmailData {
  businessName: string;
  vatType: string;
  vatNumber: string;
  pricingPlan: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  pincode: string;
  country: string;
  shippingMethod: string;
  shippingType?: string;
  deliveryTime?: string;
  showAdsOnWebsite: boolean;
  hearAboutSurf: string;
  registrationDate: string;
}

export class RegistrationEmailService {
  static async sendRegistrationNotification(
    data: RegistrationEmailData
  ): Promise<{ success: boolean; error?: string }> {
    try {
      if (
        !EMAILJS_PUBLIC_KEY ||
        !EMAILJS_SERVICE_ID ||
        !EMAILJS_REGISTRATION_TEMPLATE_ID
      ) {
        console.log(
          "EmailJS configuration missing - skipping notification email"
        );
        return { success: true };
      }

      if (!emailjs || typeof emailjs.send !== "function") {
        console.log(
          "EmailJS not initialized properly - skipping notification email"
        );
        return { success: true };
      }

      const emailParams = {
        business_name: data.businessName,
        vat_type: data.vatType === "individual" ? "Individual" : "Business",
        vat_number: data.vatNumber,
        pricing_plan: data.pricingPlan,
        first_name: data.firstName,
        last_name: data.lastName,
        seller_email: data.email,
        phone_number: data.phoneNumber,
        address: data.address,
        city: data.city,
        pincode: data.pincode,
        country: data.country,
        shipping_method:
          data.shippingMethod === "own"
            ? "Own Shipping"
            : "Integrated Shipping",
        shipping_type: data.shippingType
          ? data.shippingType === "fixed_rate"
            ? "Fixed Rate"
            : "Free Delivery"
          : "N/A",
        delivery_time: data.deliveryTime
          ? data.deliveryTime.replace(/_/g, " ")
          : "N/A",
        show_ads: data.showAdsOnWebsite ? "Yes" : "No",
        hear_about_surf: data.hearAboutSurf,
        registration_date: data.registrationDate,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID!,
        EMAILJS_REGISTRATION_TEMPLATE_ID!,
        emailParams,
        EMAILJS_PUBLIC_KEY!
      );

      console.log("Registration notification sent successfully");
      return { success: true };
    } catch (error: any) {
      console.error(
        "Registration notification error:",
        error?.text || error?.message || error
      );
      return { success: true };
    }
  }
}
