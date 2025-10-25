import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';
import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';

// Load environment variables FIRST
config({ path: '.env.local' });

interface KnowledgeDoc {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
}

async function indexKnowledgeBase() {
  console.log('🚀 Starting knowledge base indexing...\n');

  // Verify API keys
  const openaiKey = process.env.OPENAI_API_KEY;
  const pineconeKey = process.env.PINECONE_API_KEY;
  const indexName = process.env.PINECONE_INDEX_NAME || 'cultivision-knowledge';

  if (!openaiKey) {
    console.error('❌ OPENAI_API_KEY not found in .env.local');
    console.error('   Make sure .env.local exists with: OPENAI_API_KEY=sk-...');
    process.exit(1);
  }
  if (!pineconeKey) {
    console.error('❌ PINECONE_API_KEY not found in .env.local');
    process.exit(1);
  }
  console.log('✅ Environment variables loaded\n');

  // Initialize clients AFTER env vars are loaded
  const openai = new OpenAI({ apiKey: openaiKey });
  const pinecone = new Pinecone({ apiKey: pineconeKey });

  // Load knowledge base
  console.log('📚 Loading knowledge base...');
  const kbPath = join(process.cwd(), 'data', 'knowledge-base', 'cultivision-kb.json');
  
  let documents: KnowledgeDoc[];
  try {
    documents = JSON.parse(readFileSync(kbPath, 'utf-8'));
    console.log(`✅ Loaded ${documents.length} documents\n`);
  } catch (error) {
    console.error('❌ Error loading knowledge base:', error);
    console.error('   Expected path:', kbPath);
    process.exit(1);
  }

  // Generate embeddings
  console.log('🔢 Generating embeddings with OpenAI...');
  const texts = documents.map(doc => `${doc.title}\n\n${doc.content}`);
  
  let response;
  try {
    response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: texts,
    });
    console.log(`✅ Generated ${response.data.length} embeddings\n`);
  } catch (error) {
    console.error('❌ Error generating embeddings:', error);
    process.exit(1);
  }

  // Prepare vectors for Pinecone
  console.log('📦 Preparing vectors...');
  const vectors = documents.map((doc, i) => ({
    id: doc.id,
    values: response.data[i].embedding,
    metadata: {
      title: doc.title,
      content: doc.content,
      category: doc.category,
      tags: doc.tags,
    },
  }));
  console.log(`✅ Prepared ${vectors.length} vectors\n`);

  // Upload to Pinecone
  console.log(`📤 Uploading to Pinecone index: ${indexName}...`);
  try {
    const index = pinecone.index(indexName);
    
    // Upsert in batches of 100
    const batchSize = 100;
    for (let i = 0; i < vectors.length; i += batchSize) {
      const batch = vectors.slice(i, i + batchSize);
      await index.upsert(batch);
      console.log(`   Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(vectors.length / batchSize)} uploaded`);
    }
    console.log(`✅ Successfully uploaded ${vectors.length} vectors\n`);
  } catch (error) {
    console.error('❌ Error uploading to Pinecone:', error);
    process.exit(1);
  }

  console.log('✨ Knowledge base indexed successfully!');
  console.log(`   Total documents: ${documents.length}`);
  console.log(`   Total tokens: ~${response.usage.total_tokens}`);
  console.log(`   Estimated cost: ~$${(response.usage.total_tokens * 0.00000002).toFixed(6)}`);
}

indexKnowledgeBase().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});