// Payment type definitions for PayPal integration

export interface PaymentOrderRequest {
  amount: number;
  currency: string;
  description: string;
  userData: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
  };
  returnUrl?: string;
  cancelUrl?: string;
}

export interface PaymentOrderResponse {
  success: boolean;
  data?: {
    orderId: string;
    status: string;
    amount: number;
    currency: string;
    registrationId?: string;
    approvalUrl?: string;
    links?: Array<{
      href: string;
      rel: string;
      method: string;
    }>;
  };
  error?: {
    message: string;
    code?: string;
  };
}

export interface PaymentCaptureResponse {
  success: boolean;
  data?: {
    captureId: string;
    status: string;
    amount: number;
    currency: string;
    payerEmail?: string;
    capturedAt: Date;
    registrationId?: string;
  };
  error?: {
    message: string;
    code?: string;
  };
}

export interface PlanPricing {
  id: string;
  name: string;
  price: string;
  amount: number; // Numeric amount for payment
  currency: string;
  requiresPayment: boolean;
  description: string;
  features: string[];
  icon: string;
  color: string;
  popular?: boolean;
}

export interface PaymentTransaction {
  orderId: string;
  captureId?: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "cancelled";
  createdAt: string;
  completedAt?: string;
  payerEmail?: string;
}
