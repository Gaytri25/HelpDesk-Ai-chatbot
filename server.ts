import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { store } from './server/store';
import { processUserMessage, normalizeText, extractTokens, calculateMatchScore } from './server/chatEngine';
import { Conversation, ChatMessage, SupportTicket } from './src/types';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // 1. Chatbot endpoint
  app.post('/api/chat', async (req: Request, res: Response) => {
    const startTime = Date.now();
    try {
      const { message, conversationId, history = [] } = req.body;
      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message string is required' });
        return;
      }

      // Retrieve or create conversation
      const convId = conversationId || `conv-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      let conv = store.conversations.get(convId);
      if (!conv) {
        conv = {
          id: convId,
          title: message.slice(0, 30) + (message.length > 30 ? '...' : ''),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          messages: []
        };
        store.conversations.set(convId, conv);
      }

      // Context memory
      const lastIntent = conv.lastIntent;

      // Process message through hybrid engine
      const result = await processUserMessage(message, lastIntent, history);
      const responseTimeMs = Date.now() - startTime;

      // Update conversation state
      conv.lastIntent = result.intent;
      conv.updatedAt = new Date().toISOString();

      const userMsg: ChatMessage = {
        id: `msg-${Date.now()}-u`,
        sender: 'user',
        text: message,
        timestamp: new Date().toISOString()
      };

      const botMsg: ChatMessage = {
        id: `msg-${Date.now()}-b`,
        sender: 'bot',
        text: result.text,
        timestamp: new Date().toISOString(),
        intent: result.intent,
        confidence: result.confidence,
        smartAction: result.smartAction,
        suggestedFollowUps: result.suggestedFollowUps,
        isFallback: result.isFallback,
        source: result.source
      };

      conv.messages.push(userMsg, botMsg);

      // Record analytics
      store.recordQuestionAnswered(message, result.intent, responseTimeMs, !result.isFallback);

      res.json({
        conversationId: convId,
        userMessage: userMsg,
        botMessage: botMsg,
        responseTimeMs
      });
    } catch (err: any) {
      console.error('Error processing chat:', err);
      res.status(500).json({
        error: 'Failed to process message',
        fallbackMessage: {
          id: `msg-${Date.now()}-err`,
          sender: 'bot',
          text: "I experienced a temporary technical delay. Please try asking again or contact our human support desk.",
          timestamp: new Date().toISOString(),
          intent: 'UNKNOWN',
          confidence: 0,
          isFallback: true
        }
      });
    }
  });

  // 2. Knowledge Base endpoints
  app.get('/api/knowledge', (req: Request, res: Response) => {
    const { category, search } = req.query;
    let list = store.knowledgeBase;

    if (category && category !== 'All') {
      list = list.filter(item => item.category.toLowerCase() === String(category).toLowerCase());
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      list = list.filter(item => 
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.keywords.some(k => k.toLowerCase().includes(q))
      );
    }

    res.json({ items: list });
  });

  app.post('/api/knowledge', (req: Request, res: Response) => {
    try {
      const { question, answer, category, intent, patterns = [], keywords = [], smartAction } = req.body;
      if (!question || !answer || !category || !intent) {
        res.status(400).json({ error: 'Missing required knowledge base fields' });
        return;
      }

      const newItem = {
        id: `kb-custom-${Date.now()}`,
        question,
        answer,
        category,
        intent,
        patterns: Array.isArray(patterns) ? patterns : [patterns],
        keywords: Array.isArray(keywords) ? keywords : [keywords],
        smartAction,
        isActive: true,
        usageCount: 0,
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      store.knowledgeBase.unshift(newItem);
      res.status(201).json({ item: newItem });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create knowledge item' });
    }
  });

  app.put('/api/knowledge/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = store.knowledgeBase.findIndex(k => k.id === id);
    if (index === -1) {
      res.status(404).json({ error: 'Knowledge item not found' });
      return;
    }

    const updated = {
      ...store.knowledgeBase[index],
      ...req.body,
      id,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    store.knowledgeBase[index] = updated;
    res.json({ item: updated });
  });

  app.delete('/api/knowledge/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const initialLen = store.knowledgeBase.length;
    store.knowledgeBase = store.knowledgeBase.filter(k => k.id !== id);

    if (store.knowledgeBase.length === initialLen) {
      res.status(404).json({ error: 'Knowledge item not found' });
      return;
    }

    res.json({ success: true, id });
  });

  // 3. Feedback endpoints
  app.get('/api/feedback', (req: Request, res: Response) => {
    res.json({ feedback: store.feedbackList, items: store.feedbackList });
  });

  app.post('/api/feedback', (req: Request, res: Response) => {
    const { messageId, userQuery, rating, reason, comment } = req.body;
    if (!messageId || !rating) {
      res.status(400).json({ error: 'messageId and rating are required' });
      return;
    }

    store.recordFeedback({
      messageId,
      userQuery: userQuery || 'Customer query',
      rating,
      reason,
      comment
    });

    res.json({ success: true, message: 'Feedback recorded' });
  });

  // 4. Conversation endpoints
  app.get('/api/conversations', (req: Request, res: Response) => {
    const list = Array.from(store.conversations.values())
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    res.json({ conversations: list });
  });

  app.post('/api/conversations', (req: Request, res: Response) => {
    const id = `conv-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newConv: Conversation = {
      id,
      title: 'New Conversation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: []
    };
    store.conversations.set(id, newConv);
    res.status(201).json({ conversation: newConv });
  });

  app.delete('/api/conversations/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = store.conversations.delete(id);
    res.json({ success: deleted });
  });

  // 5. Admin Analytics endpoints
  const getAnalyticsHandler = (req: Request, res: Response) => {
    const data = store.getAnalytics();
    res.json({ analytics: data, ...data });
  };
  app.get('/api/analytics', getAnalyticsHandler);
  app.get('/api/admin/analytics', getAnalyticsHandler);

  // 6. Tickets endpoint
  app.get('/api/tickets', (req: Request, res: Response) => {
    res.json({ tickets: store.tickets });
  });

  app.post('/api/tickets', (req: Request, res: Response) => {
    const { name, email, category, priority = 'medium', subject, message } = req.body;
    if (!email || !subject || !message) {
      res.status(400).json({ error: 'Email, subject and message are required' });
      return;
    }

    const ticket: SupportTicket = {
      id: `TCK-${1000 + store.tickets.length + 1}`,
      name: name || 'Anonymous User',
      email,
      category: category || 'General Support',
      priority,
      subject,
      message,
      status: 'open',
      createdAt: new Date().toISOString()
    };

    store.tickets.unshift(ticket);
    res.status(201).json({ ticket });
  });

  // 7. Training Sandbox Test Endpoint
  const testIntentHandler = (req: Request, res: Response) => {
    const { query } = req.body;
    if (!query) {
      res.status(400).json({ error: 'Query is required' });
      return;
    }

    const normalized = normalizeText(query);
    const tokens = extractTokens(query);

    const matches = store.knowledgeBase.map(item => {
      const match = calculateMatchScore(query, tokens, item);
      return {
        id: item.id,
        question: item.question,
        intent: item.intent,
        category: item.category,
        score: Math.round(match.score * 100) / 100,
        matchedPattern: match.matchedPattern,
        answer: item.answer
      };
    }).sort((a, b) => b.score - a.score);

    const topMatch = matches[0];
    const isVerified = topMatch && topMatch.score >= 0.4;

    res.json({
      query,
      normalized,
      tokens,
      detectedIntent: isVerified ? topMatch.intent : 'UNKNOWN',
      confidence: topMatch ? topMatch.score : 0,
      source: isVerified ? 'knowledge_base' : 'gemini_fallback',
      matchedPattern: topMatch?.matchedPattern || (isVerified ? topMatch.question : undefined),
      responsePreview: isVerified 
        ? topMatch.answer 
        : "I don't have verified policy data for that query in our local knowledge base. Routing through AI hybrid fallback.",
      bestMatch: isVerified ? topMatch : null,
      allMatches: matches.slice(0, 5)
    });
  };

  app.post('/api/test-intent', testIntentHandler);
  app.post('/api/chat/test', testIntentHandler);

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HelpDesk AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
