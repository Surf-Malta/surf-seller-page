import { NextResponse } from "next/server";

const SURF_API_URL = "https://surf.mt/api/2.0/NtOtpRegApi";
const AUTH_HEADER = process.env.NEXT_PUBLIC_SURF_API_AUTH;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { destination, verification_method } = body;

        if (!destination || !verification_method) {
            return NextResponse.json(
                { success: false, message: "Missing required parameters" },
                { status: 400 }
            );
        }

        if (!AUTH_HEADER) {
            console.error("SURF_API_AUTH is not configured in settings/env.");
            return NextResponse.json(
                { success: false, message: "Server configuration error" },
                { status: 500 }
            );
        }

        console.log(`Forwarding OTP request for ${destination} via ${verification_method}`);

        const response = await fetch(SURF_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": AUTH_HEADER,
            },
            body: JSON.stringify({
                destination,
                verification_method,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("External API Error:", data);
            return NextResponse.json(
                { success: false, message: data.message || "External API error" },
                { status: response.status }
            );
        }

        return NextResponse.json(data);

    } catch (error: any) {
        console.error("OTP Proxy Error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
