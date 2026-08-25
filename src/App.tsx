import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ChatPage } from './pages/ChatPage';
import { KnowledgeBasePage } from './pages/KnowledgeBasePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { TrainingPage } from './pages/TrainingPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Modals
import { ResetPasswordModal } from './components/modals/ResetPasswordModal';
import { ContactFormModal } from './components/modals/ContactFormModal';
import { RefundModal } from './components/modals/RefundModal';
import { OrderTrackerModal } from './components/modals/OrderTrackerModal';
import { PricingModal } from './components/modals/PricingModal';
import { HoursModal } from './components/modals/HoursModal';
import { FeedbackModal } from './components/modals/FeedbackModal';
import { SmartAction } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [queuedQuery, setQueuedQuery] = useState<string>('');

  // Modals state
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isHoursOpen, setIsHoursOpen] = useState(false);

  // Feedback issue modal state
  const [feedbackModal, setFeedbackModal] = useState<{
    isOpen: boolean;
    messageId: string;
    query: string;
  }>({
    isOpen: false,
    messageId: '',
    query: ''
  });

  const handleStartChatWithQuery = (query?: string) => {
    if (query) {
      setQueuedQuery(query);
    }
    setActiveTab('chat');
  };

  const handleTriggerSmartAction = (action: SmartAction) => {
    switch (action.type) {
      case 'OPEN_RESET_PASSWORD':
      case 'reset_password':
        setIsResetPasswordOpen(true);
        break;
      case 'OPEN_CONTACT_FORM':
      case 'SUBMIT_TICKET':
      case 'SCHEDULE_CALLBACK':
      case 'contact_support':
        setIsContactOpen(true);
        break;
      case 'VIEW_REFUND_POLICY':
      case 'refund_policy':
        setIsRefundOpen(true);
        break;
      case 'TRACK_ORDER':
      case 'track_order':
        setIsOrderTrackerOpen(true);
        break;
      case 'VIEW_PRICING':
      case 'view_pricing':
        setIsPricingOpen(true);
        break;
      case 'VIEW_HOURS':
      case 'view_hours':
        setIsHoursOpen(true);
        break;
      case 'OPEN_KB':
        setActiveTab('knowledge');
        break;
      case 'OPEN_ACCOUNT':
        setIsResetPasswordOpen(true);
        break;
      case 'external_link':
        if (action.payload?.url) {
          window.open(action.payload.url, '_blank');
        }
        break;
      default:
        console.log('Action triggered:', action);
    }
  };

  const handleOpenFeedbackModal = (messageId: string, query: string) => {
    setFeedbackModal({
      isOpen: true,
      messageId,
      query
    });
  };

  const handleSubmitFeedback = async (reason: string, comment: string) => {
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId: feedbackModal.messageId,
          userQuery: feedbackModal.query,
          rating: 'unhelpful',
          reason,
          comment
        })
      });
    } catch (err) {
      console.error('Error submitting feedback:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#252525] flex flex-col font-sans selection:bg-[#E76F51]/20 selection:text-[#C9573F]">
      {/* Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onStartChat={() => handleStartChatWithQuery()}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage 
            onStartChatWithQuery={handleStartChatWithQuery}
            onExploreKB={() => setActiveTab('knowledge')}
            onOpenTraining={() => setActiveTab('training')}
          />
        )}

        {activeTab === 'chat' && (
          <div className="py-4">
            <ChatPage
              initialQuery={queuedQuery}
              onClearInitialQuery={() => setQueuedQuery('')}
              onTriggerSmartAction={handleTriggerSmartAction}
              onOpenFeedbackModal={handleOpenFeedbackModal}
            />
          </div>
        )}

        {activeTab === 'knowledge' && (
          <KnowledgeBasePage 
            onAskAI={handleStartChatWithQuery}
            onTriggerSmartAction={handleTriggerSmartAction}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsPage />
        )}

        {activeTab === 'training' && (
          <TrainingPage />
        )}

        {activeTab === 'about' && (
          <AboutPage onStartChat={() => handleStartChatWithQuery()} />
        )}

        {![
          'home', 
          'chat', 
          'knowledge', 
          'analytics', 
          'training', 
          'about'
        ].includes(activeTab) && (
          <NotFoundPage onGoHome={() => setActiveTab('home')} />
        )}
      </main>

      {/* Footer */}
      {activeTab !== 'chat' && <Footer onNav={setActiveTab} />}

      {/* Interactive Modals triggered by Smart Action Cards */}
      <ResetPasswordModal
        isOpen={isResetPasswordOpen}
        onClose={() => setIsResetPasswordOpen(false)}
      />

      <ContactFormModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <RefundModal
        isOpen={isRefundOpen}
        onClose={() => setIsRefundOpen(false)}
      />

      <OrderTrackerModal
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
      />

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />

      <HoursModal
        isOpen={isHoursOpen}
        onClose={() => setIsHoursOpen(false)}
      />

      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        messageId={feedbackModal.messageId}
        userQuery={feedbackModal.query}
        onClose={() => setFeedbackModal(prev => ({ ...prev, isOpen: false }))}
        onSubmit={handleSubmitFeedback}
      />
    </div>
  );
}
export default App;
