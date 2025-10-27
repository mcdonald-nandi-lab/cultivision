'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Minimize2, Maximize2, Loader2, Sparkles } from 'lucide-react';
import { useCalculations } from '@/context/calculation';
import { useChatbot } from '@/context/chatbot-context';
import { useDashboardActions } from '@/context/dashboard-actions';
import ActionConfirmation from './action-confirmation';
import { detectActionIntent } from '@/lib/rag/action-detection';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  id?: number;
  hasAction?: boolean;
}

const CultivisionChatbot = () => {
  const { isOpen, isMinimized, openChatbot, closeChatbot, minimizeChatbot, maximizeChatbot } = useChatbot();
  const calculationContext = useCalculations();
  const { activeReactorId, doublingTime, density, costs, expenses } = calculationContext;
  const { executeAction } = useDashboardActions();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m Viz AI, your Cultivision assistant. I can help you understand your current configuration and answer questions about production costs, bioreactor settings, and calculations. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleActionConfirm = () => {
    if (pendingAction) {
      executeAction(pendingAction);
      
      // Show success message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `✅ Great! I've updated your ${pendingAction.parameter} from ${pendingAction.currentValue} to ${pendingAction.suggestedValue}. Your dashboard metrics are now recalculating with the new value.`,
        timestamp: new Date()
      }]);
      
      setPendingAction(null);
    }
  };

  const handleActionReject = () => {
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: `No problem! Your ${pendingAction?.parameter} will remain at ${pendingAction?.currentValue}. Let me know if you'd like to try a different value or explore other optimizations.`,
      timestamp: new Date()
    }]);
    setPendingAction(null);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const contextPayload = {
        activeReactorId,
        doublingTime,
        density,
        costs,
        expenses,
      };

      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          context: contextPayload,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const aiMessageId = Date.now();
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        id: aiMessageId,
      }]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let accumulatedText = '';
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          accumulatedText += chunk;

          setMessages(prev => 
            prev.map(msg => 
              msg.id === aiMessageId 
                ? { ...msg, content: accumulatedText }
                : msg
            )
          );
        }
        
        const detectedAction = detectActionIntent(
            currentInput, 
            accumulatedText,
             { activeReactorId, doublingTime, density, costs }
            );

            if (detectedAction) {
            console.log('[Action Detected]', detectedAction);
            setPendingAction(detectedAction);
            
            setMessages(prev => 
                prev.map(msg => 
                msg.id === aiMessageId 
                    ? { ...msg, hasAction: true }
                    : msg
                )
            );
            }

      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      }]);
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

      {isOpen && !isMinimized && (
        <div className="bg-white rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Viz AI</h3>
                <p className="text-xs text-emerald-100">
                  {expenses ? 'Analyzing your data' : 'Always here to help'}
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

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div key={message.id || index}>
                <div className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
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
                      {message.role === 'assistant' && isLoading && index === messages.length - 1 && (
                        <span className="inline-block w-1 h-4 bg-emerald-600 ml-1 animate-pulse"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1 px-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                {message.hasAction && pendingAction && index === messages.length - 1 && !isLoading && (
                  <div className="mt-3">
                    <ActionConfirmation
                      action={pendingAction}
                      onConfirm={handleActionConfirm}
                      onReject={handleActionReject}
                    />
                  </div>
                )}
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === 'user' && (
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

          {messages.length === 1 && (
            <div className="px-4 py-3 bg-white border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="text-xs px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full hover:from-emerald-100 hover:to-teal-100 transition-colors border border-emerald-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

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
        </div>
      )}
    </div>
  );
};

export default CultivisionChatbot;