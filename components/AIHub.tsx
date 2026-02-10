
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { geminiService } from '../services/geminiService';
import { MOCK_PROPERTIES } from '../constants';
import { 
  Send, Bot, User, Zap, Calculator, Landmark, 
  ShieldCheck, Loader2, Home, TrendingUp, Sparkles, X,
  CheckCircle2, Target, BarChart3, Paintbrush, Lightbulb, ArrowUpRight
} from 'lucide-react';

interface AIHubProps {
  user: UserProfile;
}

const AIHub: React.FC<AIHubProps> = ({ user }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: `Hi ${user.name}! I'm your PropTransfer assistant. How can I help you with your property journey in South Africa today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingTool, setIsProcessingTool] = useState(false);
  const [affordabilityInsight, setAffordabilityInsight] = useState<string | null>(null);
  const [valuationResult, setValuationResult] = useState<any>(null);
  const [improvementTips, setImprovementTips] = useState<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Utility to remove markdown characters if they appear
  const cleanText = (text: string) => {
    if (!text) return '';
    return text
      .replace(/\*\*/g, '')
      .replace(/##/g, '')
      .replace(/###/g, '')
      .replace(/`/g, '')
      .trim();
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await geminiService.getChatResponse(messages, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response || 'Sorry, I encountered an error processing that.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'I am having trouble connecting to my brain right now. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setAffordabilityInsight(null);
    setValuationResult(null);
    setImprovementTips(null);
  };

  const checkAffordability = async () => {
    setIsProcessingTool(true);
    clearResults();
    try {
      const result = await geminiService.getAffordabilityInsight(user.income || 0, (user.income || 0) * 0.4, user.creditScore || 0);
      setAffordabilityInsight(result || "Unable to calculate at this time.");
      setMessages(prev => [...prev, { role: 'model', text: "I've analyzed your affordability based on your profile. Check the summary card on the right!" }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessingTool(false);
    }
  };

  const performValuation = async () => {
    setIsProcessingTool(true);
    clearResults();
    try {
      const demoProperty = MOCK_PROPERTIES[0];
      const result = await geminiService.getPropertyValuation(demoProperty);
      setValuationResult(result);
      setMessages(prev => [...prev, { role: 'model', text: `I've completed the AI Valuation for ${demoProperty.title}. See the detailed breakdown in the sidebar.` }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessingTool(false);
    }
  };

  const getAppealTips = async () => {
    setIsProcessingTool(true);
    clearResults();
    try {
      const demoProperty = MOCK_PROPERTIES[0];
      const result = await geminiService.getPropertyImprovementTips(demoProperty);
      setImprovementTips(result);
      setMessages(prev => [...prev, { role: 'model', text: `I've generated some personalized appeal tips for your property. These focus on staging and minor renovations to boost your selling price!` }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessingTool(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-12rem)] animate-in fade-in duration-500">
      {/* Chat Interface */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="bg-slate-900 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-slate-900">
              <Bot size={24} />
            </div>
            <div>
              <h3 className="font-bold">PropTransfer Assistant</h3>
              <p className="text-xs text-slate-400">Powered by Gemini 3 Flash</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full uppercase tracking-widest border border-amber-500/20">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
            System Online
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'}`}>
                  {cleanText(msg.text)}
                </div>
              </div>
            </div>
          ))}
          {(isLoading || isProcessingTool) && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl flex items-center gap-2 text-slate-400 border border-slate-100 shadow-sm">
                <Loader2 size={16} className="animate-spin text-amber-500" />
                <span className="text-xs font-semibold text-slate-600 tracking-wide">AI is analyzing South African market data...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t border-slate-100 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about bond approvals, transfer costs, or property tips..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-slate-400"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || isProcessingTool || !input.trim()}
              className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-900 px-6 rounded-xl transition-all shadow-md active:scale-95 font-bold"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Tools Sidebar */}
      <div className="space-y-6 overflow-y-auto pr-2 pb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Calculator size={20} className="text-amber-600" />
            PropTransfer Tools
          </h3>
          <div className="space-y-3">
            <button 
              onClick={checkAffordability}
              className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-amber-50 border border-slate-100 hover:border-amber-200 rounded-xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <Landmark size={18} className="text-slate-500 group-hover:text-amber-600" />
                <span className="text-sm font-bold text-slate-700 group-hover:text-amber-900">Affordability Check</span>
              </div>
              <Zap size={14} className="text-amber-400 group-hover:text-amber-600" />
            </button>
            
            <button 
              onClick={performValuation}
              className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-amber-50 border border-slate-100 hover:border-amber-200 rounded-xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <Home size={18} className="text-slate-500 group-hover:text-amber-600" />
                <span className="text-sm font-bold text-slate-700 group-hover:text-amber-900">AI Valuation (AVM)</span>
              </div>
              <Sparkles size={14} className="text-amber-400 group-hover:text-amber-600" />
            </button>

            {(user.role === UserRole.SELLER || user.role === UserRole.REAL_ESTATE_AGENT) && (
              <button 
                onClick={getAppealTips}
                className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-amber-50 border border-slate-100 hover:border-amber-200 rounded-xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Paintbrush size={18} className="text-slate-500 group-hover:text-amber-600" />
                  <span className="text-sm font-bold text-slate-700 group-hover:text-amber-900">Property Appeal Tips</span>
                </div>
                <Lightbulb size={14} className="text-amber-400 group-hover:text-amber-600" />
              </button>
            )}
          </div>
        </div>

        {/* Improvement Tips Result */}
        {improvementTips && (
          <div className="bg-white rounded-2xl border border-amber-200 shadow-lg overflow-hidden animate-in slide-in-from-right-4 duration-500">
            <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Paintbrush size={20} className="text-amber-500" />
                <h4 className="font-bold text-sm uppercase tracking-wider">Property Doctor Tips</h4>
              </div>
              <button onClick={() => setImprovementTips(null)} className="hover:bg-white/20 p-1 rounded-md transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600 italic leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                "{cleanText(improvementTips.summary)}"
              </p>
              <div className="space-y-4">
                {improvementTips.tips.map((tip: any, i: number) => (
                  <div key={i} className="group relative pl-4 border-l-2 border-amber-100 hover:border-amber-600 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">{tip.category}</span>
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${
                        tip.impact === 'High' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>{tip.impact} Impact</span>
                    </div>
                    <h5 className="text-sm font-bold text-slate-900 mb-1">{cleanText(tip.title)}</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">{cleanText(tip.description)}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors">
                Save Checklist
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Valuation Result Display */}
        {valuationResult && (
          <div className="bg-white rounded-2xl border border-amber-200 shadow-lg overflow-hidden animate-in slide-in-from-right-4 duration-500">
            <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Home size={20} className="text-amber-500" />
                <h4 className="font-bold text-sm uppercase tracking-wider">AI Valuation Result</h4>
              </div>
              <button onClick={() => setValuationResult(null)} className="hover:bg-white/20 p-1 rounded-md transition-colors">
                <X size={16} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Value Range</p>
                <p className="text-2xl font-black text-slate-900">{cleanText(valuationResult.estimatedRange)}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 size={18} className="text-amber-600" />
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Market Demand</span>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-full ${
                    valuationResult.marketSentiment?.toLowerCase().includes('high') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {cleanText(valuationResult.marketSentiment)?.toUpperCase() || 'MEDIUM'}
                  </span>
                </div>
                {/* Prediction Field */}
                <p className="text-xs text-slate-500 leading-relaxed italic border-t border-slate-200 pt-3">
                  <span className="font-bold text-slate-700 not-italic">Forecast: </span>
                  {cleanText(valuationResult.marketDemandPrediction)}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-600">
                  <Target size={18} />
                  <h5 className="text-xs font-bold uppercase tracking-wider">Key Selling Points</h5>
                </div>
                <ul className="space-y-2">
                  {valuationResult.sellingPoints?.map((point: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="text-amber-500 mt-0.5 shrink-0" />
                      <span>{cleanText(point)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-md">
                Download Official AVM Report
              </button>
            </div>
          </div>
        )}

        {/* Affordability Result Display */}
        {affordabilityInsight && (
          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 shadow-sm animate-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <Zap size={18} className="text-amber-600 fill-amber-600" />
                Affordability Analysis
              </h4>
              <button onClick={() => setAffordabilityInsight(null)} className="text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>
            <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
              {cleanText(affordabilityInsight)}
            </div>
            <div className="mt-6 p-4 bg-white/60 rounded-xl border border-amber-100">
              <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">Recommended Price Cap</p>
              <p className="text-xl font-black text-slate-900">R 2,450,000</p>
            </div>
          </div>
        )}

        <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-lg overflow-hidden relative">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
          <h4 className="font-bold mb-2 relative z-10 flex items-center gap-2">
            <TrendingUp size={16} className="text-amber-500" />
            Market Note
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed relative z-10">
            Interest rates are currently holding steady at 11.75%. Fixed-rate options are becoming more popular for 5-year terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIHub;
