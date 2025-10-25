import OpenAI from 'openai';

// Get API key from environment variables, handling both server-side and client-side contexts
const getApiKey = () => {
  // For command line scripts
  if (process.env.OPENAI_API_KEY) {
    return process.env.OPENAI_API_KEY;
  }
  
  // For Next.js client components
  if (process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    return process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  }
  
  // Fallback for development (not recommended for production)
  if (process.env.NODE_ENV === 'development' && process.env.OPENAI_API_KEY_DEV) {
    return process.env.OPENAI_API_KEY_DEV;
  }
  
  throw new Error('OpenAI API key not found. Please set OPENAI_API_KEY environment variable.');
};

const openai = new OpenAI({
  apiKey: getApiKey(),
});

export interface EmbeddingResult {
  embedding: number[];
  tokens: number;
}

/**
 * Generate embedding for a single text
 */
export async function generateEmbedding(text: string): Promise<EmbeddingResult> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return {
      embedding: response.data[0].embedding,
      tokens: response.usage.total_tokens,
    };
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

/**
 * Generate embeddings for multiple texts in batch
 */
export async function generateEmbeddingsBatch(
  texts: string[]
): Promise<EmbeddingResult[]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: texts,
    });

    return response.data.map((item) => ({
      embedding: item.embedding,
      tokens: response.usage.total_tokens / texts.length, // Approximate per text
    }));
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}