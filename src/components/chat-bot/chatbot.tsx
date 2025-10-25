'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Minimize2, Maximize2, Loader2, Sparkles } from 'lucide-react';
import { useCalculations } from '@/context/calculation';
import { useChatbot } from '@/context/chatbot-context';


const CultivisionChatbot = () => {
  // Get chatbot state from context instead of local state
  const { isOpen, isMinimized, openChatbot, closeChatbot, minimizeChatbot, maximizeChatbot } = useChatbot();
  
  const calculationContext = useCalculations();
  const { activeReactorId, doublingTime, density, costs, expenses } = calculationContext;

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m Viz AI, your Cultivision assistant. I can help you understand your current configuration and answer questions about production costs, bioreactor settings, and calculations. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSendMessage = async () => {
  if (!inputMessage.trim() || isLoading) return;

  const userMessage = {
    role: 'user',
    content: inputMessage,
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  setInputMessage('');
  setIsLoading(true);

  try {
    // Prepare context payload
    const contextPayload = calculationContext ? {
      activeReactorId: activeReactorId,
      doublingTime: doublingTime,
      density: density,
      costs: costs,
      expenses: expenses,
    } : undefined;

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: inputMessage,
        context: contextPayload,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response');
    }

    const data = await response.json();

    const aiResponse = {
      role: 'assistant',
      content: data.response,
      timestamp: new Date(),
      sources: data.sources,
    };

    setMessages(prev => [...prev, aiResponse]);
  } catch (error) {
    console.error('Chat error:', error);
    const errorMessage = {
      role: 'assistant',
      content: 'Sorry, I encountered an error. Please try again.',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsLoading(false);
  }
};

  const quickQuestions = calculationContext?.expenses 
    ? [
        "What's my current COGS?",
        "How can I reduce costs?",
        "Show configuration summary",
        "Explain my metrics"
      ]
    : [
        "What affects COGS?",
        "Compare bioreactor types",
        "Explain doubling time",
        "How to optimize costs?"
      ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Button - Long Format */}
      {!isOpen && (
        <button
          onClick={openChatbot}
          className="group relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full px-6 py-4 shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3"
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-semibold text-sm">Viz AI</span>
            <span className="text-xs text-emerald-100">Ask me anything</span>
          </div>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse font-semibold">
            AI
          </span>
        </button>
      )}

      {/* Chat Window - Minimized State */}
      {isOpen && isMinimized && (
        <button
          onClick={maximizeChatbot}
          className="group relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full px-6 py-4 shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3"
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
            <Bot className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-semibold text-sm">Viz AI</span>
            <span className="text-xs text-emerald-100">Click to expand</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeChatbot();
            }}
            className="hover:bg-white/20 p-1.5 rounded-lg transition-colors ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </button>
      )}

      {/* Chat Window - Full State */}
      {isOpen && !isMinimized && (
        <div className="bg-white rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Viz AI</h3>
                <p className="text-xs text-emerald-100">
                  {calculationContext?.expenses ? 'Analyzing your data' : 'Always here to help'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={minimizeChatbot}
                className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={closeChatbot}
                className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                      : 'bg-gradient-to-br from-emerald-500 to-teal-600'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`flex-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <div
                      className={`inline-block max-w-[85%] px-4 py-2 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                          : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 px-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 py-3 bg-white border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputMessage(question);
                      }}
                      className="text-xs px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full hover:from-emerald-100 hover:to-teal-100 transition-colors border border-emerald-200"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about your current analysis..."
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-2.5 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/50"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default CultivisionChatbot;