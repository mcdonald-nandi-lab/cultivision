'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChatbotContextType {
  isOpen: boolean;
  isMinimized: boolean;
  isLoading: boolean;
  openChatbot: () => void;
  closeChatbot: () => void;
  toggleChatbot: () => void;
  minimizeChatbot: () => void;
  maximizeChatbot: () => void;
  toggleLoading: (val: boolean) => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


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

  const toggleLoading = (val: boolean) => {
    setIsLoading(val);
  }

  return (
    <ChatbotContext.Provider value={{
      isOpen,
      isMinimized,
      isLoading,
      openChatbot,
      closeChatbot,
      toggleChatbot,
      minimizeChatbot,
      maximizeChatbot,
      toggleLoading
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
