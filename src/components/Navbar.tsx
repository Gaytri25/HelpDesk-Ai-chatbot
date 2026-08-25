import React, { useState } from 'react';
import { 
  Headphones,
  Bot, 
  MessageSquare, 
  BookOpen, 
  BarChart3, 
  Sliders, 
  Info, 
  Menu, 
  X, 
  ArrowRight
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onStartChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onStartChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Bot },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'training', label: 'Training', icon: Sliders },
    { id: 'about', label: 'About', icon: Info }
  ];

  const handleNav = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DE] flex-shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand in Editorial Style */}
          <div className="flex items-center gap-8">
            <div 
              id="nav-logo"
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative w-9 h-9 bg-[#252525] rounded flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105 border border-[#3D3D3D]">
                <Headphones className="w-5 h-5 text-[#E76F51]" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#3A7D44] border-2 border-white rounded-full" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-[#252525]">
                  HelpDesk<span className="text-[#E76F51]">.AI</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold text-[#3A7D44] bg-[#EDF7ED] border border-[#BDE3BD] rounded-full">
                  Live
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#6B6B6B]">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNav(item.id)}
                    className={`cursor-pointer transition-colors ${
                      isActive
                        ? 'text-[#252525] font-semibold'
                        : 'hover:text-[#252525]'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="btn-nav-start-chat"
              onClick={onStartChat}
              className="bg-[#E76F51] text-white px-5 py-2 rounded font-medium text-sm hover:bg-[#C9573F] active:bg-[#B3462F] transition-colors shadow-xs cursor-pointer flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start Chat</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="btn-mobile-chat-quick"
              onClick={onStartChat}
              className="sm:hidden px-3.5 py-1.5 text-xs font-semibold text-white bg-[#E76F51] rounded cursor-pointer"
            >
              Chat
            </button>
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#6B6B6B] hover:text-[#252525] hover:bg-[#FAF9F7] rounded border border-[#E8E3DE] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E8E3DE] px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top duration-150">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded text-left transition-all ${
                  isActive
                    ? 'bg-[#FAF9F7] text-[#E76F51] font-semibold border border-[#E8E3DE]'
                    : 'text-[#6B6B6B] hover:text-[#252525] hover:bg-[#FAF9F7]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#E76F51]' : 'text-[#6B6B6B]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#E8E3DE] mt-2">
            <button
              onClick={() => {
                onStartChat();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-[#E76F51] hover:bg-[#C9573F] rounded shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Open HelpDesk AI Chat</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

