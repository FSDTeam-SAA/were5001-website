import { api } from "@/lib/api";

export type PaymentProductType =
  | "gold_osrs"
  | "gold_rs3"
  | "account"
  | "item"
  | "skilling";

export interface CreatePayPalOrderPayload {
  amount: number;
  currency?: string;
  customerEmail: string;
  productType?: PaymentProductType;
  productDetails?: Record<string, any>;
  returnUrl?: string;
  cancelUrl?: string;
}

export interface PayPalOrderResponse {
  message: string;
  data: {
    transactionId: string;
    gatewayOrderId: string;
    approveUrl: string;
    status: string;
  };
}

export interface CreateSkrillPaymentPayload {
  amount: number;
  currency?: string;
  customerEmail: string;
  productType?: PaymentProductType;
  productDetails?: Record<string, any>;
  returnUrl?: string;
  cancelUrl?: string;
}

export interface SkrillPaymentResponse {
  message: string;
  data: {
    transactionId: string;
    checkoutUrl: string;
    redirectUrl?: string;
    sessionId?: string;
    formFields: Record<string, string>;
    status: string;
  };
}

export interface PaymentTransactionData {
  _id: string;
  customerEmail: string;
  gateway: "paypal" | "skrill";
  gatewayOrderId?: string;
  gatewayTransactionId?: string;
  amount: number;
  currency: string;
  productType: PaymentProductType;
  productDetails?: Record<string, any>;
  status: "pending" | "completed" | "failed" | "cancelled" | "refunded";
  createdAt: string;
}

export const paymentService = {
  /**
   * Initiates a PayPal order and returns the approval URL
   */
  async createPayPalOrder(
    payload: CreatePayPalOrderPayload
  ): Promise<PayPalOrderResponse> {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000";

    const response = await api.post<PayPalOrderResponse>(
      "/payments/paypal/create-order",
      {
        ...payload,
        currency: payload.currency || "USD",
        returnUrl: payload.returnUrl || `${origin}/payment/success`,
        cancelUrl: payload.cancelUrl || `${origin}/payment/cancel`,
      }
    );
    return response.data;
  },

  /**
   * Captures an authorized PayPal order upon return
   */
  async capturePayPalOrder(orderId: string): Promise<{
    message: string;
    data: PaymentTransactionData;
  }> {
    const response = await api.post<{
      message: string;
      data: PaymentTransactionData;
    }>(`/payments/paypal/capture-order/${orderId}`);
    return response.data;
  },

  /**
   * Initiates a Skrill Quick Checkout session
   */
  async createSkrillPayment(
    payload: CreateSkrillPaymentPayload
  ): Promise<SkrillPaymentResponse> {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000";

    const response = await api.post<SkrillPaymentResponse>(
      "/payments/skrill/create-session",
      {
        ...payload,
        currency: payload.currency || "USD",
        returnUrl: payload.returnUrl || `${origin}/payment/success`,
        cancelUrl: payload.cancelUrl || `${origin}/payment/cancel`,
      }
    );
    return response.data;
  },

  /**
   * Redirects customer to Skrill Quick Checkout
   */
  executeSkrillRedirect(
    checkoutUrl: string,
    formFields: Record<string, string>
  ) {
    if (typeof window === "undefined") return;

    // If checkoutUrl is already a direct session URL (e.g. contains ?sid=), redirect directly
    if (checkoutUrl.includes("sid=")) {
      window.location.href = checkoutUrl;
      return;
    }

    const form = document.createElement("form");
    form.method = "POST";
    form.action = checkoutUrl;
    form.style.display = "none";

    for (const [key, value] of Object.entries(formFields)) {
      if (value !== undefined && value !== null) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      }
    }

    document.body.appendChild(form);
    form.submit();
  },
};
