import { Pinecone } from '@pinecone-database/pinecone';

export interface DocumentMetadata {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
}

export interface VectorDocument extends DocumentMetadata {
  embedding: number[];
}

export interface SearchResult {
  id: string;
  score: number;
  metadata: DocumentMetadata;
}

class VectorDatabase {
  private pinecone: Pinecone;
  private indexName: string;

  constructor() {
    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
    this.indexName = process.env.PINECONE_INDEX_NAME || 'cultivision-knowledge';
  }

  /**
   * Upsert documents into vector database
   */
  async upsertDocuments(documents: VectorDocument[]): Promise<void> {
    try {
      const index = this.pinecone.index(this.indexName);

      const vectors = documents.map(doc => ({
        id: doc.id,
        values: doc.embedding,
        metadata: {
          title: doc.title,
          content: doc.content,
          category: doc.category,
          tags: doc.tags,
        },
      }));

      // Upsert in batches of 100
      const batchSize = 100;
      for (let i = 0; i < vectors.length; i += batchSize) {
        const batch = vectors.slice(i, i + batchSize);
        await index.upsert(batch);
      }

      console.log(`✅ Upserted ${documents.length} documents to Pinecone`);
    } catch (error) {
      console.error('Error upserting documents:', error);
      throw error;
    }
  }

  /**
   * Search for similar documents
   */
  async search(
    queryEmbedding: number[],
    topK: number = 5,
    filter?: Record<string, any>
  ): Promise<SearchResult[]> {
    try {
      const index = this.pinecone.index(this.indexName);

      const queryResponse = await index.query({
        vector: queryEmbedding,
        topK,
        includeMetadata: true,
        filter,
      });

      return queryResponse.matches.map(match => ({
        id: match.id,
        score: match.score || 0,
        metadata: match.metadata as unknown as DocumentMetadata,
      }));
    } catch (error) {
      console.error('Error searching documents:', error);
      throw error;
    }
  }

  /**
   * Delete all documents (useful for re-indexing)
   */
  async deleteAll(): Promise<void> {
    try {
      const index = this.pinecone.index(this.indexName);
      await index.deleteAll();
      console.log('🗑️ Deleted all documents from index');
    } catch (error) {
      console.error('Error deleting documents:', error);
      throw error;
    }
  }
}

export const vectorDB = new VectorDatabase();