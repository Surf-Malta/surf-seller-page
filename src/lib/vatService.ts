// lib/vatService.ts
interface VATVerificationResult {
  success: boolean;
  valid?: boolean;
  companyName?: string;
  companyAddress?: string;
  error?: string;
  requestDate?: string;
}

export class VATService {
  private static readonly VIES_ENDPOINT =
    "https://ec.europa.eu/taxation_customs/vies/services/checkVatService";

  /**
   * Validates Malta VAT number format for both individual and business
   * Malta VAT numbers: MT + 8 digits (same format for both types)
   */
  static validateMaltaVATFormat(vatNumber: string): boolean {
    // Remove spaces and convert to uppercase
    const cleanVAT = vatNumber.replace(/\s/g, "").toUpperCase();

    // Malta VAT format: MT followed by 8 digits (same for individual and business)
    const maltaVATPattern = /^MT\d{8}$/;
    return maltaVATPattern.test(cleanVAT);
  }

  /**
   * Validates individual VAT format (same as business but no verification needed)
   */
  static validateIndividualVATFormat(vatNumber: string): boolean {
    return this.validateMaltaVATFormat(vatNumber);
  }

  /**
   * Extracts country code and VAT number from full VAT
   */
  static parseVATNumber(vatNumber: string): {
    countryCode: string;
    vatNumber: string;
  } {
    const cleanVAT = vatNumber.replace(/\s/g, "").toUpperCase();

    if (cleanVAT.startsWith("MT")) {
      return {
        countryCode: "MT",
        vatNumber: cleanVAT.substring(2), // Remove MT prefix
      };
    }

    throw new Error("Invalid VAT format for Malta");
  }

  /**
   * Creates SOAP request for VIES service
   */
  private static createSOAPRequest(
    countryCode: string,
    vatNumber: string
  ): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns1="urn:ec.europa.eu:taxud:vies:services:checkVat:types">
  <soap:Header />
  <soap:Body>
    <tns1:checkVat>
      <tns1:countryCode>${countryCode}</tns1:countryCode>
      <tns1:vatNumber>${vatNumber}</tns1:vatNumber>
    </tns1:checkVat>
  </soap:Body>
</soap:Envelope>`;
  }

  /**
   * Parses SOAP response from VIES service
   */
  private static parseSOAPResponse(
    responseText: string
  ): VATVerificationResult {
    try {
      // Check for SOAP fault first
      if (
        responseText.includes("soap:Fault") ||
        responseText.includes("faultstring")
      ) {
        const faultMatch = responseText.match(
          /<faultstring[^>]*>(.*?)<\/faultstring>/
        );
        const errorMessage = faultMatch ? faultMatch[1] : "VIES service error";

        return {
          success: false,
          error: `VIES service error: ${errorMessage}`,
        };
      }

      // Parse successful response
      const validMatch = responseText.match(
        /<ns2:valid[^>]*>(.*?)<\/ns2:valid>/
      );
      const nameMatch = responseText.match(/<ns2:name[^>]*>(.*?)<\/ns2:name>/);
      const addressMatch = responseText.match(
        /<ns2:address[^>]*>(.*?)<\/ns2:address>/
      );
      const dateMatch = responseText.match(
        /<ns2:requestDate[^>]*>(.*?)<\/ns2:requestDate>/
      );

      const isValid = validMatch && validMatch[1].toLowerCase() === "true";

      return {
        success: true,
        valid: isValid,
        companyName: nameMatch
          ? nameMatch[1]
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
          : undefined,
        companyAddress: addressMatch
          ? addressMatch[1]
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
          : undefined,
        requestDate: dateMatch ? dateMatch[1] : undefined,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to parse VIES response",
      };
    }
  }

  /**
   * Verifies VAT number using VIES service via API route
   */
  static async verifyVAT(
    fullVATNumber: string
  ): Promise<VATVerificationResult> {
    try {
      // Validate format first
      if (!this.validateMaltaVATFormat(fullVATNumber)) {
        return {
          success: false,
          error:
            "Invalid Malta VAT format. Must be MT followed by 8 digits (e.g., MT12345678)",
        };
      }

      const { countryCode, vatNumber } = this.parseVATNumber(fullVATNumber);

      // Call our API route which handles the SOAP request
      const response = await fetch("/api/vat-verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          countryCode,
          vatNumber: vatNumber,
          fullVATNumber,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("VAT verification error:", error);

      // Handle different types of errors
      if (error instanceof Error) {
        if (
          error.message.includes("fetch") ||
          error.message.includes("network")
        ) {
          return {
            success: false,
            error: "Network error. Please check your connection and try again.",
          };
        }

        if (error.message.includes("timeout")) {
          return {
            success: false,
            error:
              "Request timeout. The service is taking too long to respond.",
          };
        }

        // Return the actual error message from the API
        return {
          success: false,
          error: error.message,
        };
      }

      return {
        success: false,
        error: "VAT verification failed. Please try again later.",
      };
    }
  }

  /**
   * Backend/Serverless function implementation for actual VIES verification
   * This should be implemented in your API route (e.g., /api/vat-verify)
   */
  static async verifyVATBackend(
    countryCode: string,
    vatNumber: string
  ): Promise<VATVerificationResult> {
    try {
      const soapRequest = this.createSOAPRequest(countryCode, vatNumber);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(this.VIES_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          SOAPAction: "",
          "User-Agent": "Malta-VAT-Verification/1.0",
        },
        body: soapRequest,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(
          `VIES service error: ${response.status} ${response.statusText}`
        );
      }

      const responseText = await response.text();
      return this.parseSOAPResponse(responseText);
    } catch (error) {
      console.error("VIES API error:", error);

      // Handle common errors
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          return {
            success: false,
            error:
              "VAT verification timeout. The VIES service is taking too long to respond.",
          };
        }

        if (
          error.message.includes("network") ||
          error.message.includes("ENOTFOUND")
        ) {
          return {
            success: false,
            error:
              "VIES service is temporarily unavailable. Please try again later.",
          };
        }
      }

      return {
        success: false,
        error: "VAT verification service is currently unavailable",
      };
    }
  }
}

export type { VATVerificationResult };
