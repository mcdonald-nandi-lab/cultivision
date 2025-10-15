'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChatbotContextType {
  isOpen: boolean;
  isMinimized: boolean;
  openChatbot: () => void;
  closeChatbot: () => void;
  toggleChatbot: () => void;
  minimizeChatbot: () => void;
  maximizeChatbot: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const openChatbot = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const closeChatbot = () => {
    setIsOpen(false);
  };

  const toggleChatbot = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) setIsMinimized(false);
  };

  const minimizeChatbot = () => {
    setIsMinimized(true);
  };

  const maximizeChatbot = () => {
    setIsMinimized(false);
  };

  return (
    <ChatbotContext.Provider value={{
      isOpen,
      isMinimized,
      openChatbot,
      closeChatbot,
      toggleChatbot,
      minimizeChatbot,
      maximizeChatbot
    }}>
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
}
