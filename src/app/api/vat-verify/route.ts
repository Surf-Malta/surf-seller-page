// pages/api/vat-verify.ts (for Pages Router)
// OR app/api/vat-verify/route.ts (for App Router - see comments below)

import { NextApiRequest, NextApiResponse } from "next";

interface VATVerificationResult {
  success: boolean;
  valid?: boolean;
  companyName?: string;
  companyAddress?: string;
  error?: string;
  requestDate?: string;
}

// === FOR PAGES ROUTER (Next.js 12 and below) ===
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   // Set CORS headers
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const { countryCode, vatNumber } = req.body;

//     if (!countryCode || !vatNumber) {
//       return res.status(400).json({
//         success: false,
//         error: "Missing required parameters",
//       });
//     }

//     // Validate Malta VAT format
//     if (countryCode !== "MT") {
//       return res.status(400).json({
//         success: false,
//         error: "Only Malta VAT numbers are supported",
//       });
//     }

//     // Validate VAT number format (should be 8 digits)
//     if (!/^\d{8}$/.test(vatNumber)) {
//       return res.status(400).json({
//         success: false,
//         error:
//           "Invalid Malta VAT number format. Must be 8 digits after MT prefix.",
//       });
//     }

//     const result = await verifyVATWithVIES(countryCode, vatNumber);
//     return res.json(result);
//   } catch (error) {
//     console.error("VAT verification API error:", error);
//     return res.status(500).json({
//       success: false,
//       error: "Internal server error",
//     });
//   }
// }

export async function POST(request: Request) {
  try {
    const { countryCode, vatNumber, fullVATNumber } = await request.json();

    if (!countryCode || !vatNumber) {
      return Response.json(
        {
          success: false,
          error: "Missing required parameters",
        },
        { status: 400 }
      );
    }

    // Validate Malta VAT format
    if (countryCode !== "MT") {
      return Response.json(
        {
          success: false,
          error: "Only Malta VAT numbers are supported",
        },
        { status: 400 }
      );
    }

    // Validate VAT number format (should be 8 digits)
    if (!/^\d{8}$/.test(vatNumber)) {
      return Response.json(
        {
          success: false,
          error:
            "Invalid Malta VAT number format. Must be 8 digits after MT prefix.",
        },
        { status: 400 }
      );
    }

    const result = await verifyVATWithVIES(countryCode, vatNumber);
    return Response.json(result);
  } catch (error) {
    console.error("VAT verification API error:", error);
    return Response.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

async function verifyVATWithVIES(
  countryCode: string,
  vatNumber: string
): Promise<VATVerificationResult> {
  const VIES_ENDPOINT =
    "https://ec.europa.eu/taxation_customs/vies/services/checkVatService";

  const soapRequest = `<?xml version="1.0" encoding="UTF-8"?>
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

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    console.log(`Verifying VAT: ${countryCode}${vatNumber}`);

    const response = await fetch(VIES_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        SOAPAction: "",
        "User-Agent": "Malta-VAT-Verification/1.0",
        Accept: "text/xml, application/soap+xml",
      },
      body: soapRequest,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(
        `VIES HTTP error: ${response.status} ${response.statusText}`
      );
      throw new Error(
        `VIES service error: ${response.status} ${response.statusText}`
      );
    }

    const responseText = await response.text();
    console.log("VIES Response received, length:", responseText.length);

    return parseSOAPResponse(responseText);
  } catch (error) {
    console.error("VIES API error:", error);

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
        error.message.includes("ENOTFOUND") ||
        error.message.includes("DNS")
      ) {
        return {
          success: false,
          error:
            "VIES service is temporarily unavailable. Please try again later.",
        };
      }

      if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("fetch")
      ) {
        return {
          success: false,
          error:
            "Network connection error. Please check your internet connection.",
        };
      }
    }

    return {
      success: false,
      error:
        "VAT verification service is currently unavailable. Please try again later.",
    };
  }
}

function parseSOAPResponse(responseText: string): VATVerificationResult {
  try {
    // Log response for debugging (remove in production)
    console.log("Parsing SOAP response...");

    // Check for SOAP fault first
    if (
      responseText.includes("soap:Fault") ||
      responseText.includes("faultstring")
    ) {
      const faultMatch = responseText.match(
        /<faultstring[^>]*>(.*?)<\/faultstring>/
      );
      const errorMessage = faultMatch ? faultMatch[1] : "VIES service error";

      console.error("SOAP Fault detected:", errorMessage);

      // Handle specific VIES error codes
      if (errorMessage.includes("INVALID_INPUT")) {
        return {
          success: false,
          error: "Invalid VAT number format provided to VIES service",
        };
      }

      if (errorMessage.includes("SERVICE_UNAVAILABLE")) {
        return {
          success: false,
          error: "VIES service is temporarily unavailable for maintenance",
        };
      }

      if (errorMessage.includes("MS_UNAVAILABLE")) {
        return {
          success: false,
          error: "Malta VAT database is temporarily unavailable",
        };
      }

      if (errorMessage.includes("TIMEOUT")) {
        return {
          success: false,
          error: "VAT verification request timed out",
        };
      }

      if (errorMessage.includes("MS_MAX_CONCURRENT_REQ")) {
        return {
          success: false,
          error:
            "Too many concurrent requests. Please try again in a few moments.",
        };
      }

      return {
        success: false,
        error: `VIES service error: ${errorMessage}`,
      };
    }

    // Parse successful response - try different namespace patterns
    const validMatch = responseText.match(
      /<(?:ns2:|tns:|checkVat:)?valid[^>]*>(.*?)<\/(?:ns2:|tns:|checkVat:)?valid>/i
    );
    const nameMatch = responseText.match(
      /<(?:ns2:|tns:|checkVat:)?name[^>]*>(.*?)<\/(?:ns2:|tns:|checkVat:)?name>/i
    );
    const addressMatch = responseText.match(
      /<(?:ns2:|tns:|checkVat:)?address[^>]*>(.*?)<\/(?:ns2:|tns:|checkVat:)?address>/i
    );
    const dateMatch = responseText.match(
      /<(?:ns2:|tns:|checkVat:)?requestDate[^>]*>(.*?)<\/(?:ns2:|tns:|checkVat:)?requestDate>/i
    );

    if (!validMatch) {
      console.error("Could not find valid field in response");
      return {
        success: false,
        error: "Invalid response format from VIES service",
      };
    }

    const isValid = validMatch[1].toLowerCase().trim() === "true";

    console.log("VAT validation result:", isValid);

    // Clean up HTML entities and whitespace
    const cleanText = (text: string) =>
      text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&#39;/g, "'")
        .trim();

    const result: VATVerificationResult = {
      success: true,
      valid: isValid,
      requestDate: dateMatch ? dateMatch[1] : new Date().toISOString(),
    };

    // Only include company info if VAT is valid and data is available
    if (isValid) {
      if (
        nameMatch &&
        nameMatch[1].trim() &&
        nameMatch[1].trim() !== "---" &&
        nameMatch[1].trim() !== ""
      ) {
        result.companyName = cleanText(nameMatch[1]);
        console.log("Company name found:", result.companyName);
      }

      if (
        addressMatch &&
        addressMatch[1].trim() &&
        addressMatch[1].trim() !== "---" &&
        addressMatch[1].trim() !== ""
      ) {
        result.companyAddress = cleanText(addressMatch[1]);
        console.log("Company address found:", result.companyAddress);
      }
    } else {
      console.log("VAT number is not valid in VIES database");
    }

    return result;
  } catch (error) {
    console.error("SOAP parsing error:", error);
    return {
      success: false,
      error: "Failed to parse response from VIES service",
    };
  }
}
