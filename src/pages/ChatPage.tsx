import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Bot, 
  Headphones,
  User, 
  Sparkles, 
  ThumbsUp, 
  ThumbsDown, 
  Copy, 
  Check, 
  RotateCw, 
  Trash2, 
  Plus, 
  Mic, 
  MicOff, 
  Paperclip, 
  Download, 
  Info,
  Clock,
  ArrowDown,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { ChatMessage, Conversation, SmartAction, IntentType } from '../types';
import { SmartActionCard } from '../components/SmartActionCard';
import confetti from 'canvas-confetti';

interface ChatPageProps {
  initialQuery?: string;
  onClearInitialQuery?: () => void;
  onTriggerSmartAction: (action: SmartAction) => void;
  onOpenFeedbackModal: (messageId: string, query: string) => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({
  initialQuery,
  onClearInitialQuery,
  onTriggerSmartAction,
  onOpenFeedbackModal
}) => {
  // Active conversation state
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  // Speech Recognition state
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Suggested prompt chips above input
  const quickPrompts = [
    'What is your refund policy?',
    'What are your business hours?',
    'How do I track my order?',
    'What are your pricing plans?',
    'How do I reset my password?',
    'How can I contact support?'
  ];

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
      }
    }
  }, []);

  // Fetch conversations on load
  useEffect(() => {
    fetchConversations();
  }, []);

  // Handle initialQuery if passed from Home or Knowledge Base
  useEffect(() => {
    if (initialQuery) {
      sendMessage(initialQuery);
      onClearInitialQuery?.();
    }
  }, [initialQuery]);

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const fetchConversations = async () => {
    try {
      const res = await fetch('/api/conversations');
      const data = await res.json();
      if (data.conversations && data.conversations.length > 0) {
        setConversations(data.conversations);
        if (!activeConvId) {
          const first = data.conversations[0];
          setActiveConvId(first.id);
          setMessages(first.messages || []);
        }
      } else {
        createNewChat();
      }
    } catch (err) {
      console.error('Error fetching conversations:', err);
      if (!activeConvId) {
        createNewChat();
      }
    }
  };

  const createNewChat = () => {
    const newId = `conv-${Date.now()}`;
    const welcomeMsg: ChatMessage = {
      id: `welcome-${Date.now()}`,
      sender: 'bot',
      text: "Hello! I am HelpDesk AI, your commercial customer support assistant. How can I assist you with pricing, order tracking, password resets, refunds, or business hours today?",
      timestamp: new Date().toISOString(),
      intent: 'GREETING',
      confidence: 1.0,
      suggestedFollowUps: [
        'What are your business hours?',
        'What is your refund policy?',
        'How do I track my order?',
        'What are your pricing plans?'
      ]
    };

    const newConv: Conversation = {
      id: newId,
      title: 'New Conversation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [welcomeMsg]
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConvId(newId);
    setMessages([welcomeMsg]);
    setInputText('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const selectConversation = (conv: Conversation) => {
    setActiveConvId(conv.id);
    setMessages(conv.messages || []);
    setSidebarOpen(false);
  };

  const deleteConversation = async (convId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch(`/api/conversations/${convId}`, { method: 'DELETE' });
      setConversations(prev => prev.filter(c => c.id !== convId));
      if (activeConvId === convId) {
        const remaining = conversations.filter(c => c.id !== convId);
        if (remaining.length > 0) {
          setActiveConvId(remaining[0].id);
          setMessages(remaining[0].messages || []);
        } else {
          createNewChat();
        }
      }
    } catch (err) {
      console.error('Error deleting conversation:', err);
    }
  };

  const clearCurrentChat = () => {
    if (messages.length <= 1) return;
    const welcomeMsg: ChatMessage = {
      id: `welcome-${Date.now()}`,
      sender: 'bot',
      text: "Chat history cleared. How can I assist you next?",
      timestamp: new Date().toISOString(),
      intent: 'GREETING',
      suggestedFollowUps: [
        'What are your business hours?',
        'What is your refund policy?',
        'How can I contact support?'
      ]
    };
    setMessages([welcomeMsg]);
    setConversations(prev => prev.map(c => {
      if (c.id === activeConvId) {
        return { ...c, messages: [welcomeMsg], updatedAt: new Date().toISOString() };
      }
      return c;
    }));
  };

  const exportTranscript = () => {
    const transcriptText = messages.map(m => {
      const time = new Date(m.timestamp).toLocaleTimeString();
      const sender = m.sender === 'user' ? 'Customer' : 'HelpDesk AI';
      return `[${time}] ${sender}:\n${m.text}\n${m.smartAction ? `[Smart Action: ${m.smartAction.title}]\n` : ''}`;
    }).join('\n----------------------------------------\n\n');

    const blob = new Blob([transcriptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `HelpDeskAI_Transcript_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const toggleSpeechRecognition = () => {
    if (!speechSupported) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    if (!isListening) {
      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(prev => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      setIsListening(false);
    }
  };

  const sendMessage = async (textToSend?: string) => {
    const text = (textToSend !== undefined ? textToSend : inputText).trim();
    if (!text || isLoading) return;

    setInputText('');
    const userMsgId = `msg-${Date.now()}-u`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      timestamp: new Date().toISOString()
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const history = newMessages.slice(-6).map(m => ({
        role: m.sender === 'user' ? 'Customer' : 'Assistant',
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationId: activeConvId,
          history
        })
      });

      const data = await res.json();
      if (res.ok && data.botMessage) {
        setMessages(prev => [...prev, data.botMessage]);
        // Update conversation title and message list in local state
        setConversations(prev => prev.map(c => {
          if (c.id === activeConvId) {
            return {
              ...c,
              title: c.title === 'New Conversation' ? text.slice(0, 30) : c.title,
              messages: [...c.messages, userMsg, data.botMessage],
              updatedAt: new Date().toISOString()
            };
          }
          return c;
        }));
      } else {
        const errorFallback: ChatMessage = {
          id: `msg-${Date.now()}-err`,
          sender: 'bot',
          text: "I experienced a brief delay resolving that. Please try rephrasing or contact our human support desk.",
          timestamp: new Date().toISOString(),
          isFallback: true
        };
        setMessages(prev => [...prev, errorFallback]);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      const networkFallback: ChatMessage = {
        id: `msg-${Date.now()}-net-err`,
        sender: 'bot',
        text: "Network connection was interrupted. Please check your internet connection or try again.",
        timestamp: new Date().toISOString(),
        isFallback: true
      };
      setMessages(prev => [...prev, networkFallback]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleCopyMessage = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleFeedbackRating = async (msg: ChatMessage, rating: 'helpful' | 'unhelpful') => {
    if (msg.feedback) return; // already rated

    if (rating === 'helpful') {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#E76F51', '#3A7D44', '#252525']
      });
      // Store positive rating
      try {
        await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messageId: msg.id,
            userQuery: messages[messages.findIndex(m => m.id === msg.id) - 1]?.text || 'Query',
            rating: 'helpful'
          })
        });
      } catch (err) {
        console.error('Feedback recording error:', err);
      }

      setMessages(prev => prev.map(m => {
        if (m.id === msg.id) {
          return { ...m, feedback: { rating: 'helpful', timestamp: new Date().toISOString() } };
        }
        return m;
      }));
    } else {
      // Find query and trigger feedback modal
      const queryMsg = messages[messages.findIndex(m => m.id === msg.id) - 1];
      onOpenFeedbackModal(msg.id, queryMsg ? queryMsg.text : 'Customer Question');

      setMessages(prev => prev.map(m => {
        if (m.id === msg.id) {
          return { ...m, feedback: { rating: 'unhelpful', timestamp: new Date().toISOString() } };
        }
        return m;
      }));
    }
  };

  const handleRegenerate = (msgIndex: number) => {
    const prevUserMsg = messages[msgIndex - 1];
    if (prevUserMsg && prevUserMsg.sender === 'user') {
      sendMessage(prevUserMsg.text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 h-[calc(100vh-5.5rem)] pb-3">
      <div className="h-full bg-white border border-[#E8E3DE] rounded-xl shadow-xs overflow-hidden flex flex-col md:flex-row">
        {/* Left Sidebar (Conversations List) - Editorial Aesthetic */}
        <aside 
          className={`w-full md:w-72 bg-white border-r border-[#E8E3DE] flex flex-col shrink-0 ${
            sidebarOpen ? 'block' : 'hidden md:flex'
          }`}
        >
          {/* New Conversation Button */}
          <div className="p-6 border-b border-[#E8E3DE]">
            <button
              id="btn-sidebar-new-chat"
              onClick={createNewChat}
              className="w-full border-2 border-dashed border-[#E8E3DE] py-3 rounded text-sm font-medium text-[#6B6B6B] hover:border-[#E76F51] hover:text-[#E76F51] transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>+ New Conversation</span>
            </button>
          </div>

          {/* Conversations History List */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-[#6B6B6B] font-bold mb-4 px-2">
              Recent Chats
            </p>
            <div className="space-y-1.5">
              {conversations.map((conv) => {
                const isActive = conv.id === activeConvId;
                const timeAgo = new Date(conv.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                return (
                  <div
                    key={conv.id}
                    onClick={() => selectConversation(conv)}
                    className={`group flex items-center justify-between p-3 rounded cursor-pointer transition-all ${
                      isActive
                        ? 'bg-[#FAF9F7] border border-[#E8E3DE]'
                        : 'hover:bg-[#FAF9F7]'
                    }`}
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <p className={`text-sm truncate ${isActive ? 'font-semibold text-[#252525]' : 'font-medium text-[#6B6B6B] group-hover:text-[#252525]'}`}>
                        {conv.title || 'Conversation'}
                      </p>
                      <p className="text-xs text-[#6B6B6B] mt-1">{timeAgo}</p>
                    </div>

                    <button
                      onClick={(e) => deleteConversation(conv.id, e)}
                      title="Delete session"
                      className="opacity-0 group-hover:opacity-100 p-1 text-[#6B6B6B] hover:text-[#C9573F] rounded transition-opacity cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Footer Profile Block */}
          <div className="p-4 border-t border-[#E8E3DE] bg-[#FAF9F7]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E8E3DE] flex items-center justify-center text-xs font-bold text-[#252525]">
                AD
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#252525] truncate">Support Admin</p>
                <p className="text-[10px] text-[#6B6B6B] truncate">SaaS Customer HelpDesk</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Main Chat Thread - Editorial Aesthetic */}
        <section className="flex-1 flex flex-col bg-[#FAF9F7] relative min-w-0">
          {/* Header */}
          <header className="px-6 sm:px-8 py-4 border-b border-[#E8E3DE] bg-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-1.5 bg-[#FAF9F7] border border-[#E8E3DE] rounded text-xs font-semibold text-[#252525]"
              >
                {sidebarOpen ? 'Chat' : 'Chats'}
              </button>
              <div>
                <h2 className="font-bold text-base text-[#252525]">Chat Thread</h2>
                <p className="text-xs text-[#3A7D44] flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 bg-[#3A7D44] rounded-full inline-block"></span>
                  Usually replies instantly
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-export-transcript"
                onClick={exportTranscript}
                title="Export / Download transcript"
                className="p-2 text-[#6B6B6B] hover:text-[#252525] hover:bg-[#FAF9F7] rounded transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                id="btn-clear-chat"
                onClick={clearCurrentChat}
                className="p-2 text-[#6B6B6B] hover:text-[#252525] hover:bg-[#FAF9F7] rounded text-xs font-bold uppercase tracking-widest cursor-pointer"
              >
                Clear
              </button>
            </div>
          </header>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
            {messages.map((msg, index) => {
              const isUser = msg.sender === 'user';
              const formattedTime = new Date(msg.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div 
                  key={msg.id} 
                  className={`flex ${isUser ? 'justify-end' : 'justify-start gap-4'} animate-in fade-in duration-150`}
                >
                  {/* Bot Avatar */}
                  {!isUser && (
                    <div className="w-8 h-8 bg-[#252525] rounded flex-shrink-0 flex items-center justify-center text-white shadow-xs border border-[#3D3D3D]">
                      <Headphones className="w-4 h-4 text-[#E76F51]" />
                    </div>
                  )}

                  {/* Message Container */}
                  <div className={`${isUser ? 'max-w-[85%] sm:max-w-[70%]' : 'max-w-[90%] sm:max-w-[80%] space-y-4'}`}>
                    {isUser ? (
                      <div className="bg-[#252525] text-white p-4 rounded-t-xl rounded-bl-xl shadow-sm">
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <span className="text-[10px] opacity-60 mt-2 block text-right">
                          {formattedTime}
                        </span>
                      </div>
                    ) : (
                      <div className="bg-white border border-[#E8E3DE] p-5 rounded-t-xl rounded-br-xl shadow-sm">
                        {msg.intent && (
                          <div className="mb-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B6B6B] bg-[#FAF9F7] border border-[#E8E3DE] px-2 py-0.5 rounded">
                              Intent: {msg.intent.replace(/_/g, ' ')}
                            </span>
                          </div>
                        )}

                        <p className="text-sm leading-relaxed text-[#252525] whitespace-pre-line mb-3">
                          {msg.text}
                        </p>

                        {/* Embedded Smart Action Card */}
                        {msg.smartAction && (
                          <SmartActionCard
                            action={msg.smartAction}
                            onTrigger={onTriggerSmartAction}
                          />
                        )}

                        {/* Suggested Follow Up Chips */}
                        {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#E8E3DE]/60">
                            {msg.suggestedFollowUps.map((chip, idx) => (
                              <button
                                key={idx}
                                onClick={() => sendMessage(chip)}
                                className="text-xs px-2.5 py-1 bg-[#FAF9F7] hover:bg-[#F3EFEA] border border-[#E8E3DE] rounded-full text-[#6B6B6B] hover:text-[#252525] transition-colors cursor-pointer"
                              >
                                {chip}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Helpful Toolbar */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E8E3DE]">
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] text-[#6B6B6B] uppercase font-bold tracking-widest">
                              Helpful?
                            </span>
                            <button
                              onClick={() => handleFeedbackRating(msg, 'helpful')}
                              disabled={!!msg.feedback}
                              className={`text-xs flex items-center gap-1 font-medium cursor-pointer ${
                                msg.feedback?.rating === 'helpful'
                                  ? 'text-[#3A7D44] font-bold'
                                  : 'text-[#3A7D44] hover:opacity-80'
                              }`}
                            >
                              👍 Yes
                            </button>
                            <button
                              onClick={() => handleFeedbackRating(msg, 'unhelpful')}
                              disabled={!!msg.feedback}
                              className={`text-xs flex items-center gap-1 font-medium cursor-pointer ${
                                msg.feedback?.rating === 'unhelpful'
                                  ? 'text-[#E76F51] font-bold'
                                  : 'text-[#E76F51] hover:opacity-80'
                              }`}
                            >
                              👎 No
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleCopyMessage(msg.id, msg.text)}
                              title="Copy response"
                              className="text-[#6B6B6B] hover:text-[#252525] cursor-pointer"
                            >
                              {copiedMsgId === msg.id ? (
                                <Check className="w-3.5 h-3.5 text-[#3A7D44]" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              onClick={() => handleRegenerate(index)}
                              title="Regenerate answer"
                              className="text-[#6B6B6B] hover:text-[#252525] cursor-pointer"
                            >
                              <RotateCw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start gap-4 animate-in fade-in duration-150">
                <div className="w-8 h-8 bg-[#E76F51] rounded flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                  AI
                </div>
                <div className="flex items-center gap-1 bg-white border border-[#E8E3DE] px-3 py-2 rounded-full shadow-sm">
                  <div className="w-1.5 h-1.5 bg-[#E76F51] rounded-full opacity-40 animate-bot-dot-1"></div>
                  <div className="w-1.5 h-1.5 bg-[#E76F51] rounded-full opacity-70 animate-bot-dot-2"></div>
                  <div className="w-1.5 h-1.5 bg-[#E76F51] rounded-full animate-bot-dot-3"></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input & Prompt Suggestions - Editorial Aesthetic */}
          <div className="p-4 sm:p-6 bg-white border-t border-[#E8E3DE] shrink-0">
            {/* Suggestions */}
            <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
              <span className="text-[10px] font-bold uppercase text-[#6B6B6B] self-center mr-2 shrink-0">
                Suggestions:
              </span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(prompt)}
                  className="text-xs px-3 py-1.5 bg-[#FAF9F7] border border-[#E8E3DE] rounded-full hover:border-[#E76F51] text-[#6B6B6B] hover:text-[#252525] transition-all whitespace-nowrap cursor-pointer shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Row */}
            <div className="relative flex items-center">
              <div className="absolute left-4 text-[#6B6B6B] pointer-events-none">
                <HelpCircle className="w-4 h-4" />
              </div>

              <textarea
                ref={inputRef}
                id="chat-user-input"
                rows={1}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question... (e.g. What is your refund policy?)"
                className="w-full bg-[#FAF9F7] border border-[#E8E3DE] rounded-lg py-3.5 pl-11 pr-28 text-sm text-[#252525] placeholder:text-[#9E9E9E] focus:outline-none focus:border-[#E76F51] resize-none min-h-[48px] max-h-32"
              />

              <div className="absolute right-2 flex items-center gap-1.5">
                {speechSupported && (
                  <button
                    type="button"
                    onClick={toggleSpeechRecognition}
                    title={isListening ? 'Listening...' : 'Voice Input'}
                    className={`p-2 rounded text-[#6B6B6B] hover:bg-[#E8E3DE] transition-colors cursor-pointer ${
                      isListening ? 'bg-[#FDF2EE] text-[#E76F51] animate-pulse' : ''
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                )}

                <button
                  id="btn-send-chat"
                  type="button"
                  onClick={() => sendMessage()}
                  disabled={isLoading || !inputText.trim()}
                  className="bg-[#E76F51] hover:bg-[#C9573F] active:bg-[#B3462F] text-white px-4 py-2 rounded-md flex items-center gap-2 text-xs font-bold shadow-sm transition-colors disabled:opacity-40 cursor-pointer"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
