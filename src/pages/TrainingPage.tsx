import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  X, 
  RefreshCw,
  AlertCircle,
  Play
} from 'lucide-react';
import { KnowledgeItem, IntentType } from '../types';

export const TrainingPage: React.FC = () => {
  const [knowledgeList, setKnowledgeList] = useState<KnowledgeItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Live Sandbox state
  const [testQuery, setTestQuery] = useState('can I get my money back within 30 days?');
  const [testResult, setTestResult] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);

  // Add/Edit Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    category: 'Business Hours',
    intent: 'BUSINESS_HOURS' as IntentType,
    answer: '',
    patterns: '',
    keywords: '',
    actionType: 'none',
    actionTitle: '',
    actionDescription: '',
    actionButtonText: ''
  });

  const categories = [
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

  const intents: IntentType[] = [
    'BUSINESS_HOURS',
    'CONTACT_SUPPORT',
    'PRICING',
    'REFUND',
    'PAYMENT_METHODS',
    'ORDER_STATUS',
    'DELIVERY_TIME',
    'ACCOUNT',
    'PASSWORD_RESET',
    'TECHNICAL_SUPPORT',
    'PRODUCT_INFO',
    'POLICIES',
    'GREETING',
    'THANKS',
    'HUMAN_AGENT',
    'UNKNOWN'
  ];

  useEffect(() => {
    fetchKnowledge();
    runLiveTest(testQuery);
  }, []);

  const fetchKnowledge = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/knowledge');
      const data = await res.json();
      if (data.items) {
        setKnowledgeList(data.items);
      }
    } catch (err) {
      console.error('Error fetching knowledge:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const runLiveTest = async (queryToTest: string) => {
    if (!queryToTest.trim()) return;
    setIsTesting(true);
    try {
      const res = await fetch('/api/chat/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryToTest })
      });
      if (res.ok) {
        const data = await res.json();
        setTestResult(data);
      } else {
        setTestResult({
          query: queryToTest,
          detectedIntent: 'UNKNOWN',
          confidence: 0,
          source: 'gemini_fallback',
          responsePreview: 'Unable to analyze intent at this time. Please try again.'
        });
      }
    } catch (err) {
      console.error('Error running test:', err);
      setTestResult({
        query: queryToTest,
        detectedIntent: 'UNKNOWN',
        confidence: 0,
        source: 'gemini_fallback',
        responsePreview: 'Unable to analyze intent due to a network interruption.'
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      question: '',
      category: 'Business Hours',
      intent: 'BUSINESS_HOURS',
      answer: '',
      patterns: '',
      keywords: '',
      actionType: 'none',
      actionTitle: '',
      actionDescription: '',
      actionButtonText: ''
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: KnowledgeItem) => {
    setEditingItem(item);
    setFormData({
      question: item.question,
      category: item.category,
      intent: item.intent,
      answer: item.answer,
      patterns: item.patterns.join(', '),
      keywords: item.keywords.join(', '),
      actionType: item.smartAction ? item.smartAction.type : 'none',
      actionTitle: item.smartAction ? item.smartAction.title : '',
      actionDescription: item.smartAction ? item.smartAction.description : '',
      actionButtonText: item.smartAction ? item.smartAction.buttonText : ''
    });
    setIsFormOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) return;

    const smartAction = formData.actionType !== 'none' ? {
      type: formData.actionType as any,
      title: formData.actionTitle || 'Perform Action',
      description: formData.actionDescription || 'Interactive modal',
      buttonText: formData.actionButtonText || 'Open'
    } : undefined;

    const payload = {
      question: formData.question,
      category: formData.category,
      intent: formData.intent,
      answer: formData.answer,
      patterns: formData.patterns.split(',').map(p => p.trim()).filter(Boolean),
      keywords: formData.keywords.split(',').map(k => k.trim()).filter(Boolean),
      smartAction
    };

    try {
      if (editingItem) {
        const res = await fetch(`/api/knowledge/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.item) {
          setKnowledgeList(prev => prev.map(k => k.id === editingItem.id ? data.item : k));
        }
      } else {
        const res = await fetch('/api/knowledge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.item) {
          setKnowledgeList(prev => [data.item, ...prev]);
        }
      }
      setIsFormOpen(false);
      runLiveTest(testQuery);
    } catch (err) {
      console.error('Error saving knowledge item:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this training rule?')) return;
    try {
      await fetch(`/api/knowledge/${id}`, { method: 'DELETE' });
      setKnowledgeList(prev => prev.filter(k => k.id !== id));
      runLiveTest(testQuery);
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const filteredItems = knowledgeList.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.intent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF9F7] border border-[#E8E3DE] rounded-full text-xs font-semibold text-[#E76F51]">
            <Sliders className="w-3.5 h-3.5" />
            <span>Admin Knowledge & Intent Training Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight mt-1">
            Training Patterns & Logic Sandbox
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B]">
            Configure intent rules, manage commercial variations, and test matching scores in real time.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#E76F51] hover:bg-[#C9573F] text-white rounded text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Training Q&A</span>
        </button>
      </div>

      {/* 1. Live Interactive Testing Sandbox */}
      <div className="p-6 bg-white border border-[#E8E3DE] rounded-lg shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-[#E76F51]" />
          <h3 className="text-sm font-bold text-[#252525]">
            Live Hybrid Intent Matching Sandbox
          </h3>
        </div>
        <p className="text-xs text-[#6B6B6B]">
          Enter any sample phrasing to see how our engine parses, normalizes tokens, calculates confidence, and chooses between verified retrieval or AI fallback.
        </p>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            runLiveTest(testQuery);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            placeholder="Type sample question, e.g. can I get my money back?"
            className="flex-1 px-4 py-2.5 bg-[#FAF9F7] border border-[#E8E3DE] rounded text-xs sm:text-sm text-[#252525] focus:outline-none focus:border-[#E76F51]"
          />
          <button
            type="submit"
            disabled={isTesting}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#252525] hover:bg-[#3D3D3D] rounded transition-colors cursor-pointer shrink-0"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isTesting ? 'Analyzing...' : 'Test Intent'}</span>
          </button>
        </form>

        {/* Live Diagnostics Card */}
        {testResult && (
          <div className="p-4 bg-[#FAF9F7] border border-[#E8E3DE] rounded-lg space-y-3 animate-in fade-in duration-150">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-[#6B6B6B] block text-[11px]">Detected Intent:</span>
                <span className="font-mono font-bold text-[#E76F51] text-xs">
                  {testResult.detectedIntent}
                </span>
              </div>
              <div>
                <span className="text-[#6B6B6B] block text-[11px]">Confidence Score:</span>
                <span className="font-mono font-bold text-[#252525] text-xs">
                  {testResult.confidence !== undefined ? `${Math.round(testResult.confidence * 100)}%` : 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-[#6B6B6B] block text-[11px]">Resolution Engine:</span>
                <span className={`font-semibold text-xs ${testResult.source === 'knowledge_base' ? 'text-[#3A7D44]' : 'text-[#E76F51]'}`}>
                  {testResult.source === 'knowledge_base' ? 'Verified Repository' : 'AI Hybrid Fallback'}
                </span>
              </div>
              <div>
                <span className="text-[#6B6B6B] block text-[11px]">Matched Pattern:</span>
                <span className="font-mono text-xs text-[#252525] truncate block">
                  {testResult.matchedPattern ? `"${testResult.matchedPattern}"` : 'Semantic Token Overlap'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E8E3DE] space-y-1">
              <span className="text-[11px] font-semibold text-[#6B6B6B] uppercase">Cleaned Output Preview:</span>
              <p className="text-xs text-[#252525] bg-white p-3 rounded border border-[#E8E3DE] whitespace-pre-line leading-relaxed">
                {testResult.responsePreview}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 2. Knowledge Items Table */}
      <div className="p-6 bg-white border border-[#E8E3DE] rounded-lg shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E3DE] pb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#252525]">Active Training Knowledge Base</h3>
            <span className="text-xs text-[#6B6B6B]">({filteredItems.length} total)</span>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#6B6B6B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter knowledge entries..."
              className="w-full pl-9 pr-3 py-2 bg-[#FAF9F7] border border-[#E8E3DE] rounded text-xs text-[#252525] focus:outline-none focus:border-[#E76F51]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E8E3DE] text-[#6B6B6B] uppercase font-semibold text-[10px]">
                <th className="py-2.5 px-3">Question</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Intent</th>
                <th className="py-2.5 px-3">Patterns</th>
                <th className="py-2.5 px-3">Smart Action</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E3DE]">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-[#FAF9F7]/60 transition-colors">
                  <td className="py-3 px-3 font-semibold text-[#252525] max-w-xs truncate">
                    {item.question}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 bg-[#FAF9F7] border border-[#E8E3DE] rounded text-[10px] text-[#6B6B6B]">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[10px] text-[#E76F51]">
                    {item.intent}
                  </td>
                  <td className="py-3 px-3 text-[#6B6B6B] max-w-[200px] truncate">
                    {item.patterns.length} triggers ({item.patterns.slice(0, 2).join(', ')})
                  </td>
                  <td className="py-3 px-3">
                    {item.smartAction ? (
                      <span className="px-2 py-0.5 bg-[#EDF7ED] text-[#3A7D44] rounded text-[10px] font-semibold">
                        {item.smartAction.title}
                      </span>
                    ) : (
                      <span className="text-[#9E9E9E] text-[10px]">None</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 text-[#6B6B6B] hover:text-[#252525] hover:bg-[#FAF9F7] rounded transition-colors cursor-pointer"
                        title="Edit entry"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-[#6B6B6B] hover:text-[#C9573F] hover:bg-[#FAF9F7] rounded transition-colors cursor-pointer"
                        title="Delete entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Add/Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white border border-[#E8E3DE] rounded-lg shadow-xl overflow-hidden animate-in fade-in duration-150 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-[#E8E3DE] bg-[#FAF9F7]">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#E76F51]" />
                <h3 className="text-base font-semibold text-[#252525]">
                  {editingItem ? 'Edit Knowledge & Training Rule' : 'Create New Training Q&A'}
                </h3>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 text-[#6B6B6B] hover:text-[#252525] rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-1">
                  Primary Customer Question *
                </label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. What is your refund policy?"
                  className="w-full px-3.5 py-2 bg-[#FAF9F7] border border-[#E8E3DE] rounded text-xs sm:text-sm text-[#252525]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#252525] mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#FAF9F7] border border-[#E8E3DE] rounded text-xs text-[#252525]"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#252525] mb-1">
                    Classified Intent *
                  </label>
                  <select
                    value={formData.intent}
                    onChange={(e) => setFormData({ ...formData, intent: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-[#FAF9F7] border border-[#E8E3DE] rounded text-xs text-[#252525]"
                  >
                    {intents.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-1">
                  Verified Commercial Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Provide complete, accurate answer policy..."
                  className="w-full px-3.5 py-2 bg-[#FAF9F7] border border-[#E8E3DE] rounded text-xs sm:text-sm text-[#252525] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-1">
                  Trained Input Patterns (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.patterns}
                  onChange={(e) => setFormData({ ...formData, patterns: e.target.value })}
                  placeholder="e.g. refund policy, money back, can I get a refund, return item"
                  className="w-full px-3.5 py-2 bg-[#FAF9F7] border border-[#E8E3DE] rounded text-xs text-[#252525]"
                />
              </div>

              {/* Smart Action Integration */}
              <div className="p-4 bg-[#FAF9F7] border border-[#E8E3DE] rounded-lg space-y-3">
                <label className="block text-xs font-semibold text-[#252525]">
                  Attach Smart Action Card
                </label>
                <select
                  value={formData.actionType}
                  onChange={(e) => setFormData({ ...formData, actionType: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-[#E8E3DE] rounded text-xs text-[#252525]"
                >
                  <option value="none">None (Text-only answer)</option>
                  <option value="reset_password">Reset Password Modal</option>
                  <option value="refund_policy">Refund Request Modal</option>
                  <option value="contact_support">Contact Support Form Modal</option>
                  <option value="track_order">Track Order Modal</option>
                  <option value="view_hours">View Support Hours Modal</option>
                  <option value="view_pricing">View Pricing Plans Modal</option>
                </select>

                {formData.actionType !== 'none' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    <input
                      type="text"
                      value={formData.actionTitle}
                      onChange={(e) => setFormData({ ...formData, actionTitle: e.target.value })}
                      placeholder="Action Card Title"
                      className="px-3 py-1.5 bg-white border border-[#E8E3DE] rounded text-xs"
                    />
                    <input
                      type="text"
                      value={formData.actionButtonText}
                      onChange={(e) => setFormData({ ...formData, actionButtonText: e.target.value })}
                      placeholder="Button Label (e.g. Reset Password)"
                      className="px-3 py-1.5 bg-white border border-[#E8E3DE] rounded text-xs"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#6B6B6B] hover:text-[#252525] bg-[#FAF9F7] border border-[#E8E3DE] rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#E76F51] hover:bg-[#C9573F] rounded shadow-xs cursor-pointer"
                >
                  Save Training Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
