export type IntentType =
  | 'GREETING'
  | 'BUSINESS_HOURS'
  | 'CONTACT_SUPPORT'
  | 'PRICING'
  | 'PAYMENT'
  | 'PAYMENT_METHODS'
  | 'REFUND'
  | 'ORDER_STATUS'
  | 'DELIVERY'
  | 'DELIVERY_TIME'
  | 'ACCOUNT'
  | 'PASSWORD_RESET'
  | 'TECHNICAL_SUPPORT'
  | 'PRODUCT_INFO'
  | 'SERVICES'
  | 'LOCATION'
  | 'GENERAL_FAQ'
  | 'POLICIES'
  | 'THANKS'
  | 'HUMAN_AGENT'
  | 'GOODBYE'
  | 'UNKNOWN';

export type SmartActionType =
  | 'OPEN_RESET_PASSWORD'
  | 'OPEN_CONTACT_FORM'
  | 'VIEW_REFUND_POLICY'
  | 'VIEW_PRICING'
  | 'TRACK_ORDER'
  | 'OPEN_ACCOUNT'
  | 'VIEW_HOURS'
  | 'OPEN_KB'
  | 'SUBMIT_TICKET'
  | 'SCHEDULE_CALLBACK'
  | 'reset_password'
  | 'contact_support'
  | 'refund_policy'
  | 'track_order'
  | 'view_pricing'
  | 'view_hours'
  | 'external_link';

export interface SmartAction {
  id?: string;
  type: SmartActionType;
  title: string;
  description: string;
  buttonText: string;
  payload?: Record<string, any>;
}

export interface KnowledgeItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  intent: IntentType;
  patterns: string[];
  keywords: string[];
  smartAction?: SmartAction;
  isActive?: boolean;
  usageCount?: number;
  lastUpdated?: string;
}

export interface FeedbackData {
  rating: 'helpful' | 'unhelpful';
  reason?: 'incorrect' | 'irrelevant' | 'complicated' | 'other';
  comment?: string;
  timestamp: string;
}

export interface FeedbackItem {
  id: string;
  messageId: string;
  userQuery: string;
  rating: 'helpful' | 'unhelpful';
  reason?: string;
  comment?: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  intent?: IntentType;
  confidence?: number;
  smartAction?: SmartAction;
  suggestedFollowUps?: string[];
  feedback?: FeedbackData;
  isFallback?: boolean;
  source?: 'knowledge_base' | 'gemini_fallback' | 'pattern_match';
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  lastIntent?: IntentType;
}

export interface AnalyticsData {
  totalConversations: number;
  questionsAnswered: number;
  unresolvedQuestions: number;
  positiveFeedback?: number;
  negativeFeedback?: number;
  positiveFeedbackCount?: number;
  negativeFeedbackCount?: number;
  averageResponseTime?: number;
  averageResponseTimeMs?: number;
  topQuestions: { question: string; count: number }[];
  intentBreakdown: Record<string, number> | { intent: IntentType; count: number; percentage: number }[];
  recentFeedback?: FeedbackItem[];
}

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
}
