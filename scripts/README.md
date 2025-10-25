# Knowledge Base Indexing

This script indexes knowledge base documents from a JSON file into your vector database.

## Requirements

- OpenAI API key
- Pinecone API key (or other vector DB credentials)
- JSON knowledge base file

## Running the Script

You need to set your OpenAI API key as an environment variable:

```bash
# For Unix/MacOS
export OPENAI_API_KEY=your-api-key-here

# For Windows
set OPENAI_API_KEY=your-api-key-here

# Then run the script
npm run index-kb
```

## Troubleshooting

If you encounter errors:

1. Verify your API keys are correctly set
2. Check that the JSON file exists at `data/knowledge-base/cultivision-kb.json`
3. Make sure the vector database configuration in `src/lib/vector-db.ts` is correct
