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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value: number, decimals: number = 2) => {
    return value.toFixed(decimals);
  };

  const getContextualResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase();

    // Current configuration questions
    if (lowerQuestion.includes('current') || lowerQuestion.includes('my') || lowerQuestion.includes('this')) {
      if (lowerQuestion.includes('cogs') || lowerQuestion.includes('cost')) {
        if (expenses?.cogsWithDepreciation) {
          return `Your current COGS with depreciation is **${formatCurrency(expenses.cogsWithDepreciation)}/kg**.\n\nThis is based on:\n• Bioreactor: ${activeReactorId}\n• Doubling Time: ${doublingTime} hours\n• Cell Density: ${density} g/L\n\nThe main cost drivers are media costs, facility depreciation, and operating expenses.`;
        }
      }
      
      if (lowerQuestion.includes('bioreactor') || lowerQuestion.includes('reactor')) {
        return `You're currently using the **${activeReactorId}** bioreactor configuration with:\n• Doubling Time: ${doublingTime} hours\n• Cell Density: ${density} g/L\n\nWould you like to know how this compares to other configurations?`;
      }

      if (lowerQuestion.includes('facilities') || lowerQuestion.includes('facility')) {
        if (expenses?.facilitiesNeeded) {
          return `Based on your current configuration, you need **${formatNumber(expenses.facilitiesNeeded, 1)} facilities** to produce 100M kg/year.\n\nThis calculation factors in your:\n• Bioreactor capacity\n• Doubling time (${doublingTime}h)\n• Cell density (${density} g/L)`;
        }
      }

      if (lowerQuestion.includes('capex') || lowerQuestion.includes('capital')) {
        if (expenses?.capitalExpenses) {
          return `Your current Capital Expenses are **$${formatNumber(expenses.capitalExpenses, 2)}M/year**.\n\nThis includes:\n• Direct fixed capital\n• Working capital\n• Startup capital\n\nThese are amortized over the facility lifetime.`;
        }
      }

      if (lowerQuestion.includes('opex') || lowerQuestion.includes('operating')) {
        if (expenses?.operatingExpenses) {
          return `Your current Operating Expenses are **$${formatNumber(expenses.operatingExpenses, 2)}M/year**.\n\nMajor components:\n• Media costs (~50%+)\n• Labor\n• Utilities\n• Raw materials\n• Waste treatment`;
        }
      }

      // General current status
      if (expenses) {
        return `**Current Configuration Summary:**\n\n📊 **Key Metrics:**\n• COGS: ${formatCurrency(expenses.cogsWithDepreciation)}/kg\n• OPEX: $${formatNumber(expenses.operatingExpenses, 2)}M/yr\n• CAPEX: $${formatNumber(expenses.capitalExpenses, 2)}M/yr\n• Facilities Needed: ${formatNumber(expenses.facilitiesNeeded, 1)}\n\n⚙️ **Settings:**\n• Bioreactor: ${activeReactorId}\n• Doubling Time: ${doublingTime}h\n• Cell Density: ${density} g/L\n\nWhat would you like to explore?`;
      }
    }

    // Comparison questions
    if (lowerQuestion.includes('compare') || lowerQuestion.includes('difference') || lowerQuestion.includes('better')) {
      return `To compare different configurations, try adjusting the parameters in the form:\n\n• Switch between bioreactor types (105kL, 150kL, 210kL, 262kL)\n• Modify doubling time (17-29 hours)\n• Change cell density\n• Adjust cost parameters\n\nYou can see real-time updates in all the charts and tables. Would you like specific guidance on what to compare?`;
    }

    // What if scenarios
    if (lowerQuestion.includes('what if') || lowerQuestion.includes('if i')) {
      return `Great question! You can explore "what-if" scenarios by:\n\n1. **Adjusting Parameters** in the left panel\n2. **Changing Bioreactor Type** to see capacity impacts\n3. **Modifying Costs** (media, labor, utilities)\n4. **Cell Growth Parameters** (doubling time, density)\n\nAll calculations update in real-time. What scenario would you like to explore?`;
    }

    // Optimization questions
    if (lowerQuestion.includes('optimize') || lowerQuestion.includes('improve') || lowerQuestion.includes('reduce cost')) {
      if (expenses) {
        return `To optimize your costs (currently ${formatCurrency(expenses.cogsWithDepreciation)}/kg), consider:\n\n1. **Media Costs** - Often 50%+ of total, negotiate better rates\n2. **Cell Density** - Higher density = more production per batch\n3. **Doubling Time** - Faster growth = more batches/year\n4. **Bioreactor Selection** - Larger reactors may have better economies of scale\n5. **Facility Utilization** - Currently need ${formatNumber(expenses.facilitiesNeeded, 1)} facilities\n\nWhich area interests you most?`;
      }
    }

    // General knowledge questions
    if (lowerQuestion.includes('bioreactor') && !calculationContext) {
      return 'Cultivision supports 4 bioreactor configurations:\n\n1. **105kL Stirred Tank**\n2. **150kL Stirred Tank**\n3. **210kL Stirred Tank**\n4. **262kL Airlift**\n\nEach has different efficiency characteristics, capital costs, and operating parameters. Select one in the parameter form to see detailed analysis.';
    }

    if (lowerQuestion.includes('doubling time')) {
      return `Doubling time is how long it takes for your cell culture to double in size, typically ranging from **17-29 hours**.\n\n**Impact:**\n• Faster doubling = more production cycles\n• Faster doubling = higher annual output\n• Affects facility requirements\n• Influences overall COGS\n\n${doublingTime ? `You're currently set to ${doublingTime} hours.` : 'Set this in the parameter form to see impacts.'}`;
    }

    if (lowerQuestion.includes('cell density')) {
      return `Cell density (g/L) represents the concentration of cells in your bioreactor.\n\n**Key Points:**\n• Standard: 100 g/L\n• Higher density = more product per batch\n• Affects bioreactor efficiency\n• Impacts media requirements\n\n${density ? `Your current setting: ${density} g/L` : 'Adjust this parameter to optimize production.'}`;
    }

    if (lowerQuestion.includes('cogs') && !calculationContext) {
      return 'COGS (Cost of Goods Sold) includes:\n\n• **Media costs** (typically 50%+)\n• **Facility depreciation**\n• **Labor expenses**\n• **Utilities** (power, steam, cooling)\n• **Raw materials**\n• **Waste treatment**\n• **Consumables**\n\nCultivision calculates both with and without depreciation for comprehensive analysis.';
    }

    // Export and sharing
    if (lowerQuestion.includes('export') || lowerQuestion.includes('save') || lowerQuestion.includes('share')) {
      return `You can export and share your analysis:\n\n📊 **Export Options:**\n• All tables have export buttons\n• Save as CSV or Excel\n• Charts can be downloaded as images\n\n🔗 **Share Configuration:**\n• Your current settings are in the URL\n• Copy the URL to share your exact configuration\n• Anyone with the link sees the same analysis\n\nWant help with a specific export?`;
    }

    // Default helpful response
    return `I can help you with:\n\n📊 **Current Analysis:**\n• "What's my current COGS?"\n• "Show my configuration summary"\n• "How many facilities do I need?"\n\n🔧 **Optimization:**\n• "How can I reduce costs?"\n• "What if I change the doubling time?"\n• "Compare bioreactor types"\n\n📖 **Understanding:**\n• "Explain COGS breakdown"\n• "What affects production capacity?"\n• "How do bioreactors differ?"\n\nWhat would you like to explore?`;
  };

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

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: getContextualResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 800);
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