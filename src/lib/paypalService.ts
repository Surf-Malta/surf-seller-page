// PayPal Payment Service
// Handles communication with PayPal payment server

import {
  PaymentOrderRequest,
  PaymentOrderResponse,
  PaymentCaptureResponse,
} from "@/types/payment";

const PAYPAL_API_URL =
  process.env.NEXT_PUBLIC_PAYPAL_API_URL || "http://localhost:3001/api";

export class PayPalService {
  /**
   * Create a payment order
   */
  static async createPaymentOrder(
    orderData: PaymentOrderRequest
  ): Promise<PaymentOrderResponse> {
    try {
      console.log("🔍 PayPal API URL:", PAYPAL_API_URL);
      console.log("🔍 Full URL:", `${PAYPAL_API_URL}/payments/create`);
      console.log("🔍 Payment Data:", orderData);

      const response = await fetch(`${PAYPAL_API_URL}/payments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      console.log("🔍 Response status:", response.status);
      console.log("🔍 Response headers:", response.headers);

      const data = await response.json();
      console.log("🔍 Response data:", data);

      if (!response.ok) {
        return {
          success: false,
          error: {
            message: data.error?.message || "Failed to create payment order",
            code: data.error?.code,
          },
        };
      }

      return data;
    } catch (error) {
      console.error("PayPal create order error:", error);
      return {
        success: false,
        error: {
          message: "Network error. Please check your connection and try again.",
          code: "NETWORK_ERROR",
        },
      };
    }
  }

  /**
   * Capture a payment after PayPal approval
   */
  static async capturePayment(
    orderId: string
  ): Promise<PaymentCaptureResponse> {
    try {
      const response = await fetch(
        `${PAYPAL_API_URL}/payments/capture/${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            message: data.error?.message || "Failed to capture payment",
            code: data.error?.code,
          },
        };
      }

      return data;
    } catch (error) {
      console.error("PayPal capture payment error:", error);
      return {
        success: false,
        error: {
          message: "Network error. Please check your connection and try again.",
          code: "NETWORK_ERROR",
        },
      };
    }
  }

  /**
   * Get payment order details
   */
  static async getOrderDetails(orderId: string): Promise<any> {
    try {
      const response = await fetch(
        `${PAYPAL_API_URL}/payments/order/${orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            message: data.error?.message || "Failed to get order details",
            code: data.error?.code,
          },
        };
      }

      return data;
    } catch (error) {
      console.error("PayPal get order details error:", error);
      return {
        success: false,
        error: {
          message: "Network error. Please check your connection and try again.",
          code: "NETWORK_ERROR",
        },
      };
    }
  }

  /**
   * Complete registration after successful payment
   */
  static async completeRegistration(registrationData: any): Promise<any> {
    try {
      const response = await fetch(`${PAYPAL_API_URL}/registration/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            message: data.error?.message || "Failed to complete registration",
            code: data.error?.code,
          },
        };
      }

      return data;
    } catch (error) {
      console.error("Complete registration error:", error);
      return {
        success: false,
        error: {
          message: "Network error. Please check your connection and try again.",
          code: "NETWORK_ERROR",
        },
      };
    }
  }
}
