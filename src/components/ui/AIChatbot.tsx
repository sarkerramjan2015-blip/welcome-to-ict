import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Send, Bot, Loader2 } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const SYSTEM_PROMPT = "You are an ICT Expert Tutor for Bangladeshi HSC/SSC students. Provide simple, accurate, board-standard explanations in Bengali. Be encouraging and professional.";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      let apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API Key not found in environment variables");
      }
      
      // Sanitize key (remove literal quotes if present from .env)
      apiKey = apiKey.replace(/['"]/g, '').trim();

      // Convert our messages to Gemini format
      const contents = newMessages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Gemini API Error Response:", errText);
        throw new Error(`API response error: ${response.status}`);
      }

      const data = await response.json();
      const modelText = data.candidates?.[0]?.content?.parts?.[0]?.text || "দুঃখিত, কোনো উত্তর পাওয়া যায়নি।";
      
      setMessages([...newMessages, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages([...newMessages, { role: 'model', text: "দুঃখিত, একটি প্রযুক্তিগত ত্রুটি হয়েছে। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div 
        className="fixed bottom-5 left-5 md:bottom-8 md:left-8 z-50 flex items-center gap-4 group cursor-pointer"
        style={{ display: isOpen ? 'none' : 'flex' }}
        onClick={() => setIsOpen(true)}
      >
        <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shrink-0">
          <div className="absolute -inset-2 rounded-full border-2 border-dotted border-purple-400 animate-spin-slow opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-400 to-pink-600 rounded-full blur opacity-70 group-hover:opacity-100 animate-spin-slow transition duration-1000"></div>
          
          <div className="relative w-full h-full bg-slate-900/90 text-white rounded-full flex items-center justify-center shadow-lg border border-white/20 z-10 transition-transform duration-300 group-hover:scale-110">
            {/* Custom Icon: Rounded Square with 'Picku' and Sparkle */}
            <div className="relative w-8 h-8 md:w-9 md:h-9 border-2 border-white rounded-lg flex items-center justify-center bg-transparent">
              <span className="font-bold text-[10px] md:text-[11px] leading-none tracking-wide text-white mt-0.5">Picku</span>
              <Sparkles className="absolute -top-2.5 -right-2.5 w-4 h-4 text-white fill-white animate-pulse" />
            </div>
          </div>
        </div>

        <div className="hidden sm:flex relative bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] border border-white/20 text-sm font-bold text-white animate-pulse">
          Picku-কে জিজ্ঞাসা করো!
          <div className="absolute top-1/2 -left-1.5 w-3 h-3 bg-slate-900/80 border-b border-l border-white/20 rotate-45 -translate-y-1/2"></div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 left-[4vw] sm:left-5 md:bottom-28 md:left-8 z-50 w-[92vw] sm:w-[380px] h-[550px] max-h-[85vh] flex flex-col bg-slate-950/85 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center text-indigo-400">
                  <Bot size={22} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-black text-white text-[16px] leading-tight">Picku</h3>
                  <p className="text-[10px] text-slate-300 font-medium tracking-wide">ICT Toppers: Your AI Assistant</p>
                  <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_5px_#34d399]"></span> 
                    Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.length === 0 && (
                <div className="text-center text-slate-400 text-sm mt-8 px-4 leading-relaxed">
                  <div className="w-16 h-16 rounded-full bg-indigo-500/10 mx-auto flex items-center justify-center mb-4">
                    <Bot size={32} className="text-indigo-400" />
                  </div>
                  <p className="font-semibold text-slate-300 mb-2">আসসালামু আলাইকুম! আমি Picku।</p>
                  ICT নিয়ে তোমার যেকোনো প্রশ্নে আমি তোমাকে সাহায্য করতে পারি। তুমি কী জানতে চাও?
                </div>
              )}
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-sky-500/90 text-white rounded-tr-sm shadow-[0_4px_14px_0_rgba(14,165,233,0.39)]' 
                      : 'bg-white/10 backdrop-blur-md text-slate-100 border border-white/20 rounded-tl-sm shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/80 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-3">
                    <Loader2 size={16} className="text-indigo-400 animate-spin" />
                    <span className="text-xs text-slate-400 font-medium tracking-wide">AI is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-1" />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-900/50 border-t border-white/10">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="এখানে তোমার প্রশ্ন লেখো..."
                  className="w-full bg-slate-950 border border-white/10 rounded-full py-3 pl-5 pr-14 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:bg-slate-900 transition-all shadow-inner"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 w-9 h-9 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-full transition-all"
                >
                  <Send size={16} className={input.trim() && !isLoading ? 'translate-x-px -translate-y-px' : ''} />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-900/80 py-1.5 text-center border-t border-white/5">
              <span className="text-[10px] text-slate-500 font-medium">Powered by ICT Toppers AI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
