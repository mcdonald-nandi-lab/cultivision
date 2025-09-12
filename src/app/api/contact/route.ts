import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  affiliation: string;
  use_case?: string;
  terms_accepted: boolean;
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
    const { name, email, affiliation, use_case, terms_accepted } = body;

    if (!name || !email || !affiliation || !terms_accepted) {
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

    const requestData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      affiliation: affiliation.trim(),
      use_case:
        use_case?.trim() ||
        "Access request for Cultivision dashboard - submitted via contact form",
      terms_accepted: true,
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
      try {
        const errorData = JSON.parse(errorText);
        return NextResponse.json(
          {
            success: false,
            message: errorData.message || `Server error: ${response.status}`,
          },
          { status: response.status }
        );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (parseError) {
        return NextResponse.json(
          {
            success: false,
            message: `${response.status}`,
          },
          { status: response.status }
        );
      }
    }

    const result: WordPressResponse = await response.json();
    console.log("WordPress response:", result);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message:
          "Access request submitted successfully! Check your email for the access link.",
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
