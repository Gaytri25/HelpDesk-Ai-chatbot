import React, { useState, useEffect } from 'react';
import { 
  Search, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Tag, 
  Filter, 
  ArrowRight, 
  ExternalLink,
  Plus
} from 'lucide-react';
import { KnowledgeItem, SmartAction } from '../types';
import { SmartActionCard } from '../components/SmartActionCard';

interface KnowledgeBasePageProps {
  onAskAI: (query: string) => void;
  onTriggerSmartAction: (action: SmartAction) => void;
}

export const KnowledgeBasePage: React.FC<KnowledgeBasePageProps> = ({ 
  onAskAI,
  onTriggerSmartAction
}) => {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    'All',
    'Business Hours',
    'Contact',
    'Pricing',
    'Refunds',
    'Payments',
    'Orders',
    'Delivery',
    'Account',
    'Technical Support',
    'Products / Services',
    'Policies',
    'General Information'
  ];

  useEffect(() => {
    fetchKnowledge();
  }, [selectedCategory, searchQuery]);

  const fetchKnowledge = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== 'All') {
        params.append('category', selectedCategory);
      }
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const res = await fetch(`/api/knowledge?${params.toString()}`);
      const data = await res.json();
      if (data.items) {
        setItems(data.items);
      }
    } catch (err) {
      console.error('Error fetching knowledge:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedItemId(prev => prev === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF9F7] border border-[#E8E3DE] rounded-full text-xs font-semibold text-[#E76F51]">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Predefined Commercial Knowledge Repository</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
          Search Help Articles & FAQs
        </h1>
        <p className="text-sm text-[#6B6B6B]">
          Explore verified business policies, pricing tiers, order guides, and account procedures.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="w-4 h-4 text-[#6B6B6B] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            id="kb-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords, e.g. refund, delivery time, reset password, pricing..."
            className="w-full pl-11 pr-4 py-3 bg-[#FAF9F7] border border-[#E8E3DE] rounded-lg text-sm text-[#252525] placeholder:text-[#9E9E9E] shadow-xs focus:outline-none focus:border-[#E76F51] transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start sm:justify-center no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#252525] text-white shadow-xs'
                    : 'bg-white text-[#6B6B6B] hover:text-[#252525] hover:bg-[#FAF9F7] border border-[#E8E3DE]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Knowledge Items Accordion List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-12 text-xs text-[#6B6B6B]">
            Loading verified knowledge articles...
          </div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center bg-white border border-[#E8E3DE] rounded-lg space-y-3">
            <h4 className="text-sm font-semibold text-[#252525]">No exact matches found</h4>
            <p className="text-xs text-[#6B6B6B] max-w-md mx-auto">
              Our automated HelpDesk AI can still synthesize and guide you through our chat interface.
            </p>
            <button
              onClick={() => onAskAI(searchQuery || 'Help with my account')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#E76F51] hover:bg-[#C9573F] rounded transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask HelpDesk AI in Chat</span>
            </button>
          </div>
        ) : (
          items.map((item) => {
            const isExpanded = expandedItemId === item.id;
            return (
              <div
                key={item.id}
                id={`kb-item-${item.id}`}
                className="bg-white border border-[#E8E3DE] rounded-lg overflow-hidden shadow-xs hover:border-[#D8D2CB] transition-all"
              >
                {/* Header Question */}
                <div
                  onClick={() => toggleExpand(item.id)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none bg-white hover:bg-[#FAF9F7]/50 transition-colors"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B6B6B] bg-[#FAF9F7] border border-[#E8E3DE] px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-[#E76F51] bg-[#FDF2EE] px-1.5 py-0.5 rounded">
                        Intent: {item.intent}
                      </span>
                      <span className="text-[10px] text-[#6B6B6B]">
                        Used {item.usageCount} times
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#252525]">
                      {item.question}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAskAI(item.question);
                      }}
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#E76F51] hover:text-white hover:bg-[#E76F51] bg-[#FDF2EE] border border-[#F6D5CC] rounded transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ask AI</span>
                    </button>

                    <div className="p-1 text-[#6B6B6B]">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Answer & Metadata Details */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-[#E8E3DE] bg-[#FAF9F7]/30 space-y-4 animate-in fade-in duration-150">
                    <div className="text-xs sm:text-sm text-[#252525] leading-relaxed whitespace-pre-line bg-white p-4 rounded border border-[#E8E3DE]">
                      {item.answer}
                    </div>

                    {/* Embedded Smart Action Card preview */}
                    {item.smartAction && (
                      <SmartActionCard
                        action={item.smartAction}
                        onTrigger={onTriggerSmartAction}
                      />
                    )}

                    {/* Predefined Input Patterns & Trigger Variations */}
                    {item.patterns && item.patterns.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-semibold text-[#6B6B6B] uppercase tracking-wider block">
                          Trained Input Patterns & Variations:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.patterns.map((pat, idx) => (
                            <span 
                              key={idx}
                              className="text-[11px] text-[#252525] bg-white border border-[#E8E3DE] px-2.5 py-1 rounded italic"
                            >
                              "{pat}"
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mobile Ask AI Button */}
                    <div className="sm:hidden pt-2">
                      <button
                        onClick={() => onAskAI(item.question)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-[#E76F51] rounded"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Ask this question in Chat</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer Banner */}
      <div className="p-6 bg-white border border-[#E8E3DE] rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div>
          <h4 className="text-sm font-bold text-[#252525]">Need to add new company procedures?</h4>
          <p className="text-xs text-[#6B6B6B] mt-0.5">
            Use the Admin Training Console to inject custom Q&As and input patterns into the hybrid engine.
          </p>
        </div>
        <button
          onClick={() => onAskAI('How can I contact customer support?')}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#252525] hover:bg-[#3D3D3D] rounded transition-colors shrink-0 cursor-pointer"
        >
          <span>Contact Human Support</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
