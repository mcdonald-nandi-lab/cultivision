'use client';

import React from 'react';
import { Bot } from 'lucide-react';
import { useChatbot } from '@/context/chatbot-context';

const NavbarChatButton = () => {
  const { openChatbot } = useChatbot();

  return (
    <button
      onClick={openChatbot}
      className="flex items-center gap-x-2 rounded-md border border-slate-300 py-2 px-3 text-sm transition-all hover:shadow-md text-slate-700 hover:bg-gray-100 hover:border-slate-800 cursor-pointer"
      aria-label="Open AI Assistant"
    >
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full p-1 text-white">
        <Bot className="w-3 h-3" />
      </div>
      <span>Wiz</span>
    </button>
  );
};

export default NavbarChatButton;
