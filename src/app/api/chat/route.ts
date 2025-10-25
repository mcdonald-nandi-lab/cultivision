import { queryRAG, RAGContext } from '@/lib/rag';
import { NextRequest, NextResponse } from 'next/server';

// Simple rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW = 60000;

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(identifier);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }

  userLimit.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // Get user identifier
    const identifier = req.headers.get('x-forwarded-for') || 'anonymous';

    // Check rate limit
    if (!checkRateLimit(identifier)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment.' },
        { status: 429 }
      );
    }

    const { message, context } = await req.json();

    // Validate message
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: 'Message too long. Keep it under 500 characters.' },
        { status: 400 }
      );
    }

    // Query RAG
    const response = await queryRAG(message, context as RAGContext);

    // Log for analytics
    console.log(`[Chat] Q: "${message.substring(0, 50)}..." | Tokens: ${response.tokensUsed}`);

    return NextResponse.json({
      response: response.answer,
      sources: response.sources,
      tokensUsed: response.tokensUsed,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}