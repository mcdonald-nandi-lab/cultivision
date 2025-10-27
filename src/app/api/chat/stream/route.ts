import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { generateEmbedding } from '@/lib/rag/embeddings';
import { vectorDB } from '@/lib/rag/vector-db';
import { buildEnhancedSystemPrompt, isOnTopic, RAGContext } from '@/lib/rag/rag';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message, context } = await req.json();

    console.log('[Stream] Question:', message);

    if (!isOnTopic(message)) {
      const encoder = new TextEncoder();
      const offTopicResponse = `I'm Viz AI, specialized in cultivated meat production analytics. I can help you with production costs, bioreactor configurations, and optimization strategies for Cultivision. What would you like to know about your production setup?`;
      
      return new Response(encoder.encode(offTopicResponse), {
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'no-cache',
        },
      });
    }

    const { embedding } = await generateEmbedding(message);
    const searchResults = await vectorDB.search(embedding, 5);
    
    console.log('[Stream] Top result score:', searchResults[0]?.score.toFixed(3) || 'N/A');

    const hasGoodMatch = searchResults.some(r => r.score > 0.5);
    
    let knowledgeBase: string | undefined;
    if (hasGoodMatch) {
      knowledgeBase = searchResults
        .map(r => `${r.metadata.title}\n${r.metadata.content}`)
        .join('\n\n');
    }

    const systemPrompt = buildEnhancedSystemPrompt(context as RAGContext, knowledgeBase);

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      stream: true,
      temperature: 0.8,
      max_tokens: 800,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || '';
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (error) {
          console.error('[Stream] Error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('[Stream] Fatal error:', error);
    return new Response('Error processing request', { status: 500 });
  }
}