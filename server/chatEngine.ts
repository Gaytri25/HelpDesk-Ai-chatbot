import { GoogleGenAI } from '@google/genai';
import { KnowledgeItem, IntentType, SmartAction } from '../src/types';
import { store } from './store';

// Typo correction dictionary for customer support domain
const TYPO_MAP: Record<string, string> = {
  'reufnd': 'refund',
  'refun': 'refund',
  'refnd': 'refund',
  'rfund': 'refund',
  'passwrd': 'password',
  'pasword': 'password',
  'passward': 'password',
  'pwd': 'password',
  'bussiness': 'business',
  'busines': 'business',
  'buisness': 'business',
  'delivry': 'delivery',
  'delvery': 'delivery',
  'shippng': 'shipping',
  'shiping': 'shipping',
  'suport': 'support',
  'supprt': 'support',
  'custmer': 'customer',
  'acount': 'account',
  'accnt': 'account',
  'pricin': 'pricing',
  'pricng': 'pricing',
  'prce': 'price',
  'invioce': 'invoice',
  'invoce': 'invoice',
  'receit': 'receipt',
  'ordr': 'order',
  'traking': 'tracking',
  'trake': 'track',
  'subcription': 'subscription',
  'subscrip': 'subscription',
  'hour': 'hours',
  'opentime': 'open',
  'closetime': 'close'
};

// Normalize and tokenize text
export function normalizeText(text: string): string {
  if (!text) return '';
  let cleaned = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Replace punctuation with space
    .replace(/\s+/g, ' ')
    .trim();

  // Apply typo correction
  const tokens = cleaned.split(' ').map(t => TYPO_MAP[t] || t);
  return tokens.join(' ');
}

export function extractTokens(text: string): string[] {
  const normalized = normalizeText(text);
  const stopWords = new Set([
    'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'to', 'of', 'and', 'in', 'that',
    'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this',
    'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'will', 'my',
    'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about',
    'who', 'get', 'which', 'go', 'me', 'can', 'please', 'tell'
  ]);

  return normalized.split(' ').filter(token => token.length > 1 && !stopWords.has(token));
}

// Calculate similarity score based on exact matches, pattern matching, and keyword overlap
export function calculateMatchScore(
  userQuery: string,
  userTokens: string[],
  item: KnowledgeItem,
  contextIntent?: IntentType
): { score: number; matchedPattern?: string } {
  const normQuery = normalizeText(userQuery);

  // 1. Exact or Substring match against predefined patterns (Highest Priority: 0.95 - 1.0)
  for (const pattern of item.patterns) {
    const normPattern = normalizeText(pattern);
    if (normQuery === normPattern) {
      return { score: 1.0, matchedPattern: pattern };
    }
    if (normQuery.includes(normPattern) || normPattern.includes(normQuery)) {
      if (normPattern.length > 5) {
        return { score: 0.92, matchedPattern: pattern };
      }
    }
  }

  // 2. Check question string direct similarity
  const normQuestion = normalizeText(item.question);
  if (normQuery === normQuestion) {
    return { score: 0.98, matchedPattern: item.question };
  }

  // 3. Keyword / Token Jaccard + Overlap calculation
  let keywordHits = 0;
  for (const kw of item.keywords) {
    const normKw = normalizeText(kw);
    if (normQuery.includes(normKw)) {
      keywordHits += 1.5;
    }
  }

  const itemTokens = new Set([
    ...extractTokens(item.question),
    ...item.keywords.map(k => normalizeText(k)),
    ...item.patterns.flatMap(p => extractTokens(p))
  ]);

  let tokenHits = 0;
  for (const token of userTokens) {
    if (itemTokens.has(token)) {
      tokenHits += 1;
    }
  }

  const unionSize = new Set([...userTokens, ...itemTokens]).size;
  const jaccard = unionSize > 0 ? tokenHits / unionSize : 0;
  const keywordScore = item.keywords.length > 0 ? keywordHits / item.keywords.length : 0;

  let totalScore = (jaccard * 0.45) + (keywordScore * 0.45) + (tokenHits >= 2 ? 0.15 : 0);

  // 4. Boost score if it aligns with conversation context (short-term memory)
  if (contextIntent && item.intent === contextIntent) {
    totalScore += 0.25;
  }

  // Specific context follow-up boosts
  if (contextIntent === 'DELIVERY' && normQuery.includes('express')) {
    if (item.id === 'kb-delivery-2') totalScore = 0.95;
  }
  if (contextIntent === 'PRICING' && (normQuery.includes('trial') || normQuery.includes('free'))) {
    if (item.id === 'kb-pricing-2') totalScore = 0.95;
  }
  if (contextIntent === 'REFUND' && (normQuery.includes('long') || normQuery.includes('time') || normQuery.includes('days'))) {
    if (item.id === 'kb-refund-2') totalScore = 0.95;
  }

  return { score: Math.min(totalScore, 0.95) };
}

// Generate contextual suggested questions
function generateFollowUps(intent: IntentType, currentQuestionId: string): string[] {
  switch (intent) {
    case 'PRICING':
      return ['Is there a free trial?', 'Do you have non-profit discounts?', 'What payment methods do you accept?'];
    case 'REFUND':
      return ['How long does a refund take?', 'What is your refund policy?', 'How can I contact support?'];
    case 'DELIVERY':
      return ['What about express delivery?', 'Do you ship internationally?', 'How do I track my order?'];
    case 'ORDER_STATUS':
      return ['How long does delivery take?', 'Can I cancel my order?', 'Contact human support'];
    case 'BUSINESS_HOURS':
      return ['How can I contact support?', 'Are you open on weekends?', 'What are your pricing plans?'];
    case 'ACCOUNT':
    case 'PASSWORD_RESET':
      return ['How do I enable 2FA?', 'How do I invite team members?', 'How do I reset my password?'];
    case 'TECHNICAL_SUPPORT':
      return ['How to embed widget?', 'Why is widget not showing?', 'Supported browsers'];
    case 'CONTACT_SUPPORT':
      return ['Schedule a callback', 'What are your business hours?', 'What is your refund policy?'];
    default:
      return ['What are your business hours?', 'What are your pricing plans?', 'What is your refund policy?'];
  }
}

// Server-side Gemini fallback
async function callGeminiFallback(query: string, conversationHistory: { role: string; text: string }[]): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const systemInstruction = `You are HelpDesk AI, the official customer support assistant for a commercial B2B website software.
Rules:
1. Provide accurate, polite, professional customer service guidance in 2-3 concise sentences.
2. NEVER invent custom refund guarantees, discount codes, or unverified contractual commitments.
3. Our verified policies:
   - 30-day money back guarantee on all subscriptions.
   - Pricing: Starter ($29/mo), Pro ($79/mo), Enterprise ($199/mo). 14-day free trial.
   - Hours: Mon-Fri 8am-8pm EST, Sat 9am-5pm EST.
   - Support email: support@helpdeskai.com, Phone: 1-800-555-0199.
4. If a question asks for custom engineering, outside company knowledge, or personal opinion, respond politely stating you don't have verified information and suggest contacting human support.`;

    const recentContext = conversationHistory.slice(-4).map(m => `${m.role}: ${m.text}`).join('\n');
    const prompt = `Conversation context:\n${recentContext}\n\nCustomer: ${query}\nAssistant response:`;

    // Try gemini-2.5-flash first
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.3,
        }
      });
      return response.text?.trim() || null;
    } catch (primaryErr: any) {
      console.warn('Gemini 2.5 flash unavailable or busy, attempting 2.5-flash-lite fallback:', primaryErr?.message || primaryErr);
      // Fallback model
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.3,
        }
      });
      return fallbackResponse.text?.trim() || null;
    }
  } catch (err: any) {
    console.warn('Gemini fallback safely caught without breaking support response:', err?.message || err);
    return null;
  }
}

export interface ChatResponseResult {
  text: string;
  intent: IntentType;
  confidence: number;
  smartAction?: SmartAction;
  suggestedFollowUps: string[];
  isFallback: boolean;
  source: 'knowledge_base' | 'gemini_fallback' | 'pattern_match';
  matchedKnowledgeId?: string;
}

export async function processUserMessage(
  query: string,
  lastIntent?: IntentType,
  conversationHistory: { role: string; text: string }[] = []
): Promise<ChatResponseResult> {
  const normQuery = normalizeText(query);
  const userTokens = extractTokens(query);

  if (!normQuery) {
    return {
      text: 'Please type a question or choose from the suggested topics below.',
      intent: 'UNKNOWN',
      confidence: 0,
      suggestedFollowUps: ['What are your business hours?', 'What is your refund policy?', 'How can I contact support?'],
      isFallback: true,
      source: 'knowledge_base'
    };
  }

  // Active knowledge items
  const activeItems = store.knowledgeBase.filter(k => k.isActive);

  let bestMatch: KnowledgeItem | null = null;
  let highestScore = 0;
  let matchedPatternName: string | undefined;

  for (const item of activeItems) {
    const { score, matchedPattern } = calculateMatchScore(query, userTokens, item, lastIntent);
    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
      matchedPatternName = matchedPattern;
    }
  }

  // 1. High Confidence Knowledge / Pattern match (Score >= 0.42)
  if (bestMatch && highestScore >= 0.42) {
    bestMatch.usageCount += 1;
    const source = highestScore >= 0.85 ? 'pattern_match' : 'knowledge_base';

    return {
      text: bestMatch.answer,
      intent: bestMatch.intent,
      confidence: Math.round(highestScore * 100) / 100,
      smartAction: bestMatch.smartAction,
      suggestedFollowUps: generateFollowUps(bestMatch.intent, bestMatch.id),
      isFallback: false,
      source,
      matchedKnowledgeId: bestMatch.id
    };
  }

  // 2. Low Confidence: Attempt Gemini Fallback if available
  const geminiAnswer = await callGeminiFallback(query, conversationHistory);
  if (geminiAnswer && !geminiAnswer.toLowerCase().includes('i cannot') && geminiAnswer.length > 10) {
    return {
      text: geminiAnswer,
      intent: 'GENERAL_FAQ',
      confidence: 0.55,
      smartAction: {
        id: 'act-gemini-contact',
        type: 'OPEN_CONTACT_FORM',
        title: 'Need Further Assistance?',
        description: 'Our human support team can review complex questions.',
        buttonText: 'Contact Human Support'
      },
      suggestedFollowUps: ['Contact human support', 'What are your business hours?', 'Explore Knowledge Base'],
      isFallback: false,
      source: 'gemini_fallback'
    };
  }

  // 3. Graceful Unknown Question Fallback
  return {
    text: "I'm not confident I have the verified answer for that specific request. Would you like to contact our human support team or submit a ticket?",
    intent: 'UNKNOWN',
    confidence: Math.round(highestScore * 100) / 100,
    smartAction: {
      id: 'act-unknown-contact',
      type: 'OPEN_CONTACT_FORM',
      title: 'Contact Human Support',
      description: 'Send this request directly to our customer support desk for a swift response.',
      buttonText: 'Contact Support'
    },
    suggestedFollowUps: [
      'What are your business hours?',
      'What is your refund policy?',
      'How can I contact support?',
      'What are your pricing plans?'
    ],
    isFallback: true,
    source: 'knowledge_base'
  };
}
