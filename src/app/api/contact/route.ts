import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  affiliation: string;
  message?: string;
  acknowledgement: boolean;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

interface WordPressResponse {
  success: boolean;
  message: string;
  status?: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, affiliation, message, acknowledgement } = body;

    if (!name || !email || !affiliation || !acknowledgement) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email format",
        },
        { status: 400 }
      );
    }

    // Send JSON data instead of FormData to match your WordPress API
    const requestData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      affiliation: affiliation.trim(),
      use_case: message?.trim() || "Access request via contact form", // Map message to use_case
      terms_accepted: acknowledgement,
    };

    console.log("Sending request to WordPress:", requestData);

    const response = await fetch(
      "https://mcdonald-nandi.ech.ucdavis.edu/wp-json/cultivision/v1/submit-access-request",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "NextJS-ContactForm/1.0",
        },
        body: JSON.stringify(requestData),
      }
    );

    console.log("WordPress response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("WordPress API error:", errorText);
      throw new Error(
        `WordPress API responded with status: ${response.status}`
      );
    }

    const result: WordPressResponse = await response.json();
    console.log("WordPress response:", result);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message:
          "Message sent successfully! Check your email for the access link.",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message:
            result.message || "Failed to send message. Please try again.",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Contact form error:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      cause: error instanceof Error ? error.cause : undefined,
    });

    return NextResponse.json(
      {
        success: false,
        message: `Internal server error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
