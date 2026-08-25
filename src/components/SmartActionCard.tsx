import React from 'react';
import { SmartAction } from '../types';
import { 
  KeyRound, 
  Mail, 
  RotateCcw, 
  CreditCard, 
  Truck, 
  User, 
  Clock, 
  BookOpen, 
  FileText, 
  PhoneCall,
  ArrowRight
} from 'lucide-react';

interface SmartActionCardProps {
  action: SmartAction;
  onTrigger: (action: SmartAction) => void;
}

export const SmartActionCard: React.FC<SmartActionCardProps> = ({ action, onTrigger }) => {
  const getActionIcon = () => {
    switch (action.type) {
      case 'OPEN_RESET_PASSWORD':
        return <KeyRound className="w-4 h-4 text-[#E76F51]" />;
      case 'OPEN_CONTACT_FORM':
      case 'SUBMIT_TICKET':
        return <Mail className="w-4 h-4 text-[#E76F51]" />;
      case 'VIEW_REFUND_POLICY':
        return <RotateCcw className="w-4 h-4 text-[#E76F51]" />;
      case 'VIEW_PRICING':
        return <CreditCard className="w-4 h-4 text-[#E76F51]" />;
      case 'TRACK_ORDER':
        return <Truck className="w-4 h-4 text-[#E76F51]" />;
      case 'OPEN_ACCOUNT':
        return <User className="w-4 h-4 text-[#E76F51]" />;
      case 'VIEW_HOURS':
        return <Clock className="w-4 h-4 text-[#E76F51]" />;
      case 'OPEN_KB':
        return <BookOpen className="w-4 h-4 text-[#E76F51]" />;
      case 'SCHEDULE_CALLBACK':
        return <PhoneCall className="w-4 h-4 text-[#E76F51]" />;
      default:
        return <FileText className="w-4 h-4 text-[#E76F51]" />;
    }
  };

  return (
    <div 
      id={`smart-action-${action.id || 'default'}`}
      className="mt-3 bg-[#FAF9F7] border border-[#E8E3DE] rounded-lg p-4 transition-all hover:border-[#D8D2CB]"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#E76F51] mb-1">
            Smart Action
          </p>
          <h4 className="text-sm font-bold text-[#252525] flex items-center gap-1.5">
            {getActionIcon()}
            <span>{action.title}</span>
          </h4>
          <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
            {action.description}
          </p>
        </div>

        <button
          id={`btn-action-${action.id || 'card'}`}
          onClick={() => onTrigger(action)}
          className="bg-[#E76F51] text-white px-4 py-2 rounded text-xs font-bold hover:bg-[#C9573F] active:bg-[#B3462F] transition-colors shrink-0 shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>{action.buttonText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
