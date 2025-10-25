// lib/rag.ts - Updated version with LLM fallback

import OpenAI from 'openai';
import { generateEmbedding } from './embeddings';
import { vectorDB } from './vector-db';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface RAGContext {
  activeReactorId?: string;
  doublingTime?: string;
  density?: string;
  expenses?: {
    cogsWithDepreciation: number;
    cogsWithoutDepreciation: number;
    capitalExpenses: number;
    operatingExpenses: number;
    facilitiesNeeded: number;
    annualProduction: number;
  };
  costs?: {
    mediaGrowth: number;
    mediaProduction: number;
    rawMaterials: number;
    consumables: number;
    wasteDisposal: number;
    utilities: {
      power: number;
      steam: number;
      coolingWater: number;
      chilledWater: number;
    };
    labor: {
      uspHourly: number;
      mainHourly: number;
      dspHourly: number;
    };
  };
}

export interface RAGResponse {
  answer: string;
  sources: Array<{
    id: string;
    title: string;
    score: number;
  }>;
  tokensUsed: number;
}

/**
 * Check if question is on-topic (Cultivision-related)
 */
function isOnTopic(question: string): { isValid: boolean; reason?: string } {
  const lowerQuestion = question.toLowerCase();
  
  const validKeywords = [
    'cogs', 'cost', 'bioreactor', 'reactor', 'cultivision', 'cultivated meat',
    'cell culture', 'production', 'facility', 'facilities', 'media', 'doubling',
    'density', 'capex', 'opex', 'labor', 'utility', 'waste', 'dashboard',
    'calculation', 'metric', 'parameter', 'configuration', 'optimize',
    'reduce', 'efficiency', 'scale', 'economics', 'fermentation', '105k', '150k',
    '210k', '262k', 'str', 'alf', 'stirred', 'airlift', 'gpl', 'hours', 'kg',
    'depreciation', 'capital', 'operating', 'expense', 'annual', 'my', 'current',
    'show', 'explain', 'what', 'how', 'compare', 'summary'
  ];

  const offTopicKeywords = [
    'weather', 'sports', 'politics', 'news', 'movie', 'recipe', 'joke',
    'story', 'poem', 'code', 'program', 'game', 'music', 'book',
    'personal', 'relationship', 'health', 'medical', 'legal', 'advice'
  ];

  const hasOffTopicKeyword = offTopicKeywords.some(keyword => 
    lowerQuestion.includes(keyword)
  );
  
  if (hasOffTopicKeyword) {
    return { isValid: false, reason: 'off-topic' };
  }

  const hasValidKeyword = validKeywords.some(keyword => 
    lowerQuestion.includes(keyword)
  );

  if (question.length < 10 && !hasValidKeyword) {
    return { isValid: false, reason: 'too-vague' };
  }

  return { isValid: true };
}

/**
 * Generate off-topic response
 */
function getOffTopicResponse(reason?: string): string {
  const responses = {
    'off-topic': `I'm Viz AI, specialized in cultivated meat production analytics for Cultivision. I can only help with questions about:

• Production costs (COGS, OPEX, CAPEX)
• Bioreactor configurations (105K_STR, 150K_STR, 210K_STR, 262K_ALF)
• Cell growth parameters (doubling time, cell density)
• Facility requirements and scaling
• Cost optimization strategies
• Economic analysis of cultivated meat production

What would you like to know about these topics?`,
    
    'too-vague': `I need more context! I'm Viz AI, your assistant for Cultivision's cultivated meat analytics.

Try asking me about:
• "What's my current COGS?"
• "How can I reduce media costs?"
• "Compare 105K_STR vs 210K_STR"
• "Explain facility requirements"
• "What affects my production costs?"

What specific aspect would you like to explore?`
  };

  return responses[reason as keyof typeof responses] || responses['off-topic'];
}

/**
 * Build system prompt for context-only responses
 */
function buildContextOnlyPrompt(userContext?: RAGContext): string {
  let prompt = `You are Viz AI, an expert assistant for Cultivision - a cultivated meat production analytics dashboard.

STRICT TOPIC BOUNDARIES:
- ONLY answer questions about cultivated meat production, bioreactors, and production costs
- If asked about anything unrelated, politely redirect to Cultivision topics

RESPONSE GUIDELINES:
- Be concise (max 250 words)
- Use bullet points for lists
- Format numbers clearly ($12.50/kg, 4.2 facilities)
- Focus on actionable insights
- Reference the user's specific configuration values
`;

  if (userContext?.expenses && userContext?.costs) {
    prompt += `\nUSER'S CURRENT CONFIGURATION:

BIOREACTOR SETTINGS:
- Type: ${userContext.activeReactorId}
- Doubling Time: ${userContext.doublingTime}
- Cell Density: ${userContext.density}

KEY METRICS:
- COGS (with depreciation): $${userContext.expenses.cogsWithDepreciation?.toFixed(2)}/kg
- COGS (without depreciation): $${userContext.expenses.cogsWithoutDepreciation?.toFixed(2)}/kg
- Operating Expenses: $${userContext.expenses.operatingExpenses?.toFixed(2)}M/yr
- Capital Expenses: $${userContext.expenses.capitalExpenses?.toFixed(2)}M/yr
- Facilities Needed: ${userContext.expenses.facilitiesNeeded?.toFixed(1)} facilities
- Annual Production: ${userContext.expenses.annualProduction?.toFixed(2)}M kg/yr

COST PARAMETERS:
- Media Growth: $${userContext.costs.mediaGrowth}/L
- Media Production: $${userContext.costs.mediaProduction}/L
- Raw Materials: $${userContext.costs.rawMaterials}/kg
- Power: $${userContext.costs.utilities?.power}/kWh
- USP Labor: $${userContext.costs.labor?.uspHourly}/hr

Use these SPECIFIC values in your response. Answer based on this configuration.
`;
  } else {
    prompt += `\nNote: User hasn't configured their dashboard yet. Provide general guidance about Cultivision features.`;
  }

  return prompt;
}

/**
 * Build system prompt with knowledge base context
 */
function buildKnowledgeBasePrompt(
  retrievedContext: string,
  userContext?: RAGContext
): string {
  let prompt = `You are Viz AI, an expert assistant for Cultivision - a cultivated meat production analytics dashboard.

STRICT TOPIC BOUNDARIES:
- ONLY answer questions about cultivated meat production, bioreactors, and production costs
- If asked about anything unrelated, politely redirect to Cultivision topics

KNOWLEDGE BASE:
${retrievedContext}

RESPONSE GUIDELINES:
- Answer based on the knowledge base provided
- Be concise (max 250 words)
- Use bullet points for lists
- Format numbers clearly
- Focus on actionable insights
`;

  if (userContext?.expenses && userContext?.costs) {
    prompt += `\nUSER'S CURRENT CONFIGURATION:
- Bioreactor: ${userContext.activeReactorId}
- Doubling Time: ${userContext.doublingTime}
- Cell Density: ${userContext.density}
- COGS: $${userContext.expenses.cogsWithDepreciation?.toFixed(2)}/kg
- OPEX: $${userContext.expenses.operatingExpenses?.toFixed(2)}M/yr
- CAPEX: $${userContext.expenses.capitalExpenses?.toFixed(2)}M/yr
- Facilities: ${userContext.expenses.facilitiesNeeded?.toFixed(1)}

Reference these values when relevant to provide personalized insights.
`;
  }

  return prompt;
}

/**
 * Query RAG with fallback to context-only LLM
 */
export async function queryRAG(
  question: string,
  context?: RAGContext
): Promise<RAGResponse> {
  console.log('[RAG] Question:', question);
  
  // 1. Validate topic
  const topicCheck = isOnTopic(question);
  
  if (!topicCheck.isValid) {
    console.log('[RAG] Rejected: off-topic');
    return {
      answer: getOffTopicResponse(topicCheck.reason),
      sources: [],
      tokensUsed: 0,
    };
  }

  // 2. Generate embedding
  const { embedding: questionEmbedding } = await generateEmbedding(question);

  // 3. Search vector database
  const searchResults = await vectorDB.search(questionEmbedding, 5);
  
  console.log('[RAG] Search results:', searchResults.map(r => ({
    title: r.metadata.title,
    score: r.score.toFixed(3)
  })));

  // 4. Check if we have good matches (threshold: 0.5)
  const hasGoodMatch = searchResults.some(result => result.score > 0.5);
  const bestScore = searchResults.length > 0 ? searchResults[0].score : 0;
  
  console.log('[RAG] Best score:', bestScore.toFixed(3), '| Has good match:', hasGoodMatch);

  let systemPrompt: string;
  let useKnowledgeBase = false;

  if (hasGoodMatch) {
    // Use knowledge base + context
    console.log('[RAG] Mode: Knowledge base + context');
    const retrievedContext = searchResults
      .map((result, index) =>
        `[Source ${index + 1}] ${result.metadata.title}\n${result.metadata.content}`
      )
      .join('\n\n');
    
    systemPrompt = buildKnowledgeBasePrompt(retrievedContext, context);
    useKnowledgeBase = true;
  } else {
    // Fallback to context-only (no knowledge base)
    console.log('[RAG] Mode: Context-only fallback');
    
    if (!context?.expenses) {
      // No context and no good matches - provide helpful guidance
      return {
        answer: `I don't have specific information about that in my knowledge base. However, I can help you with:

• Understanding production costs and metrics
• Comparing bioreactor configurations  
• Optimizing parameters like doubling time and cell density
• Analyzing CAPEX and OPEX breakdowns

Try asking more specific questions like:
• "What is COGS?"
• "Explain the 105K_STR bioreactor"
• "How does doubling time affect costs?"

Or adjust your dashboard parameters and ask about your configuration!`,
        sources: [],
        tokensUsed: 0,
      };
    }
    
    systemPrompt = buildContextOnlyPrompt(context);
  }

  // 5. Generate response with LLM
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: question,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const answer = completion.choices[0].message.content || 'No answer generated.';

    return {
      answer,
      sources: useKnowledgeBase ? searchResults.map(r => ({
        id: r.id,
        title: r.metadata.title,
        score: r.score,
      })) : [],
      tokensUsed: completion.usage?.total_tokens || 0,
    };
  } catch (error) {
    console.error('[RAG] Error generating response:', error);
    throw error;
  }
}