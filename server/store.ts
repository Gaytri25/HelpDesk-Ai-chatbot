import { KnowledgeItem, Conversation, SupportTicket, AnalyticsData, IntentType } from '../src/types';
import { DEFAULT_KNOWLEDGE_BASE } from '../src/data/defaultKnowledge';

class Store {
  knowledgeBase: KnowledgeItem[] = [];
  conversations: Map<string, Conversation> = new Map();
  tickets: SupportTicket[] = [];
  feedbackList: {
    id: string;
    messageId: string;
    userQuery: string;
    rating: 'helpful' | 'unhelpful';
    reason?: string;
    comment?: string;
    timestamp: string;
  }[] = [];
  analytics: {
    totalConversations: number;
    questionsAnswered: number;
    unresolvedQuestions: number;
    positiveFeedbackCount: number;
    negativeFeedbackCount: number;
    totalResponseTimeMs: number;
    queryFrequencies: Map<string, number>;
    intentCounts: Map<IntentType, number>;
  };

  constructor() {
    // Deep clone default knowledge
    this.knowledgeBase = JSON.parse(JSON.stringify(DEFAULT_KNOWLEDGE_BASE));

    // Initialize mock statistics for realistic demo presentation
    this.analytics = {
      totalConversations: 128,
      questionsAnswered: 412,
      unresolvedQuestions: 14,
      positiveFeedbackCount: 356,
      negativeFeedbackCount: 22,
      totalResponseTimeMs: 412 * 145, // approx 145ms avg
      queryFrequencies: new Map([
        ['What are your business hours?', 42],
        ['How do I reset my password?', 92],
        ['What is your refund policy?', 95],
        ['How can I contact support?', 89],
        ['What are your pricing plans?', 76],
        ['How long does delivery take?', 88],
        ['How do I track my order?', 110],
      ]),
      intentCounts: new Map<IntentType, number>([
        ['ORDER_STATUS', 110],
        ['REFUND', 95],
        ['PASSWORD_RESET', 92],
        ['CONTACT_SUPPORT', 89],
        ['DELIVERY', 88],
        ['PRICING', 76],
        ['BUSINESS_HOURS', 42],
        ['PAYMENT', 54],
        ['TECHNICAL_SUPPORT', 68],
        ['ACCOUNT', 47],
        ['PRODUCT_INFO', 61],
        ['GREETING', 150],
        ['UNKNOWN', 14],
      ])
    };

    // Pre-populate sample feedback
    this.feedbackList = [
      {
        id: 'fb-1',
        messageId: 'msg-sample-1',
        userQuery: 'How do I reset my password?',
        rating: 'helpful',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        id: 'fb-2',
        messageId: 'msg-sample-2',
        userQuery: 'Can I get a refund for my subscription?',
        rating: 'helpful',
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString()
      },
      {
        id: 'fb-3',
        messageId: 'msg-sample-3',
        userQuery: 'Do you support custom webhook callbacks?',
        rating: 'unhelpful',
        reason: 'Too complicated',
        comment: 'Wanted sample code for Node.js webhook payload signature verification.',
        timestamp: new Date(Date.now() - 3600000 * 12).toISOString()
      }
    ];

    // Pre-populate sample ticket
    this.tickets = [
      {
        id: 'TCK-1001',
        name: 'Sarah Connor',
        email: 'sarah@skynet-escape.com',
        category: 'Billing & Invoicing',
        priority: 'medium',
        subject: 'VAT receipt request for annual invoice',
        message: 'Could you please generate a modified invoice reflecting our EU VAT ID?',
        status: 'in_progress',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];
  }

  getAnalytics(): AnalyticsData {
    const totalResp = this.analytics.questionsAnswered > 0 
      ? Math.round(this.analytics.totalResponseTimeMs / this.analytics.questionsAnswered) 
      : 120;

    const topQuestions = Array.from(this.analytics.queryFrequencies.entries())
      .map(([question, count]) => ({ question, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    const totalIntents = Array.from(this.analytics.intentCounts.values()).reduce((a, b) => a + b, 0) || 1;
    const intentBreakdown = Array.from(this.analytics.intentCounts.entries())
      .map(([intent, count]) => ({
        intent,
        count,
        percentage: Math.round((count / totalIntents) * 100)
      }))
      .sort((a, b) => b.count - a.count);

    return {
      totalConversations: this.analytics.totalConversations + this.conversations.size,
      questionsAnswered: this.analytics.questionsAnswered,
      unresolvedQuestions: this.analytics.unresolvedQuestions,
      positiveFeedbackCount: this.analytics.positiveFeedbackCount,
      negativeFeedbackCount: this.analytics.negativeFeedbackCount,
      averageResponseTimeMs: totalResp,
      topQuestions,
      intentBreakdown,
      recentFeedback: this.feedbackList.slice(0, 15)
    };
  }

  recordQuestionAnswered(query: string, intent: IntentType, responseTimeMs: number, resolved: boolean) {
    this.analytics.questionsAnswered += 1;
    this.analytics.totalResponseTimeMs += responseTimeMs;
    if (!resolved) {
      this.analytics.unresolvedQuestions += 1;
    }

    // Update query frequency
    const currentQueryCount = this.analytics.queryFrequencies.get(query) || 0;
    this.analytics.queryFrequencies.set(query, currentQueryCount + 1);

    // Update intent count
    const currentIntentCount = this.analytics.intentCounts.get(intent) || 0;
    this.analytics.intentCounts.set(intent, currentIntentCount + 1);
  }

  recordFeedback(data: {
    messageId: string;
    userQuery: string;
    rating: 'helpful' | 'unhelpful';
    reason?: string;
    comment?: string;
  }) {
    if (data.rating === 'helpful') {
      this.analytics.positiveFeedbackCount += 1;
    } else {
      this.analytics.negativeFeedbackCount += 1;
    }

    const item = {
      id: `fb-${Date.now()}`,
      ...data,
      timestamp: new Date().toISOString()
    };
    this.feedbackList.unshift(item);
  }
}

export const store = new Store();
