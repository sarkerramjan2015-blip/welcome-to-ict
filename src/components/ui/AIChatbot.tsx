import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Send, Loader2 } from 'lucide-react';

// ── Types ───────────────────────────────────────────────────────────────────
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  typing?: boolean; // true while the typing animation is running
}

// ── Typing cursor character ──────────────────────────────────────────────────
const CURSOR = '▋';

// ── Helper: slowly render text char-by-char ──────────────────────────────────
function useTypingEffect(
  text: string,
  active: boolean,
  onDone: () => void,
): string {
  const [displayed, setDisplayed] = useState('');
  const idxRef = useRef(0);

  useEffect(() => {
    if (!active) {
      setDisplayed(text);
      return;
    }
    idxRef.current = 0;
    setDisplayed('');

    const step = () => {
      idxRef.current += 1;
      setDisplayed(text.slice(0, idxRef.current));
      if (idxRef.current < text.length) {
        setTimeout(step, 12);
      } else {
        onDone();
      }
    };
    step();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, active]);

  return displayed;
}

// ── TypingMessage sub-component ──────────────────────────────────────────────
function TypingMessage({
  content,
  typing,
  onDone,
}: {
  content: string;
  typing: boolean;
  onDone: () => void;
}) {
  const displayed = useTypingEffect(content, typing, onDone);
  return (
    <span className="whitespace-pre-wrap break-words">
      {displayed}
      {typing && displayed.length < content.length && (
        <span className="animate-pulse text-indigo-400">{CURSOR}</span>
      )}
    </span>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingIndex, setTypingIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading || typingIndex !== null) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json() as { reply?: string; error?: string };

      const reply = data.reply ?? data.error ?? 'দুঃখিত, কোনো উত্তর পাওয়া যায়নি।';
      const nextIndex = history.length;

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: reply, typing: true },
      ]);
      setTypingIndex(nextIndex);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'দুঃখিত, একটি ত্রুটি হয়েছে। দয়া করে আবার চেষ্টা করুন।',
          typing: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypingDone = useCallback((idx: number) => {
    setTypingIndex(null);
    setMessages(prev =>
      prev.map((m, i) => (i === idx ? { ...m, typing: false } : m)),
    );
  }, []);

  const canSend = input.trim().length > 0 && !isLoading && typingIndex === null;

  // ── JSX ─────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Floating trigger button ─────────────────────────────────────────── */}
      <div
        className="fixed bottom-5 left-5 md:bottom-8 md:left-8 z-50 flex items-center gap-3 cursor-pointer group"
        style={{ display: isOpen ? 'none' : 'flex' }}
        onClick={() => setIsOpen(true)}
        role="button"
        aria-label="Picku AI-এর সাথে চ্যাট করো"
      >
        {/* Button orb */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shrink-0">
          <div className="absolute -inset-2 rounded-full border-2 border-dotted border-purple-400 animate-spin-slow opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-600 rounded-full blur opacity-60 group-hover:opacity-90 animate-spin-slow transition-opacity duration-500" />
          <div className="relative w-full h-full bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg border border-white/20 z-10 transition-transform duration-300 group-hover:scale-110">
            <div className="relative w-8 h-8 md:w-9 md:h-9 border-2 border-white/80 rounded-lg flex items-center justify-center">
              <span className="font-bold text-[10px] md:text-[11px] leading-none tracking-wide text-white mt-0.5">Picku</span>
              <Sparkles className="absolute -top-2.5 -right-2.5 w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Tooltip bubble */}
        <div className="hidden sm:flex relative bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-[0_0_18px_rgba(0,0,0,0.4)] border border-white/15 text-sm font-bold text-white animate-pulse select-none">
          Picku-কে জিজ্ঞাসা করো!
          <div className="absolute top-1/2 -left-1.5 w-3 h-3 bg-slate-900/90 border-b border-l border-white/15 rotate-45 -translate-y-1/2" />
        </div>
      </div>

      {/* ── Chat panel ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-4 left-[3vw] sm:left-5 md:bottom-8 md:left-8 z-50
                       w-[94vw] sm:w-[380px] max-h-[88vh]
                       flex flex-col
                       bg-slate-950/92 backdrop-blur-2xl
                       border border-white/10 rounded-[1.75rem]
                       shadow-[0_16px_60px_rgba(0,0,0,0.7)]
                       overflow-hidden"
            style={{ height: 'clamp(480px, 80vh, 600px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-indigo-900/40 to-purple-900/30 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative w-10 h-10 shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur opacity-60" />
                  <div className="relative w-full h-full bg-slate-900 border border-white/20 rounded-full flex items-center justify-center">
                    <div className="relative w-5 h-5 border border-white/70 rounded-md flex items-center justify-center">
                      <span className="text-[6px] font-black text-white leading-none">P</span>
                      <Sparkles className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 text-yellow-300 fill-yellow-300" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-black text-white text-[15px] leading-none mb-1">Picku</h3>
                  <p className="text-[10px] text-slate-400 font-medium">HSC ICT AI Assistant</p>
                  <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_5px_#34d399]" />
                    Online
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="চ্যাট বন্ধ করো"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(99,102,241,0.3) transparent',
              }}
            >
              {/* Welcome state */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-6 px-4"
                >
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur" />
                    <div className="relative w-full h-full border border-white/10 rounded-full flex items-center justify-center">
                      <div className="relative w-7 h-7 border border-white/50 rounded-lg flex items-center justify-center">
                        <span className="text-[8px] font-black text-white">P</span>
                        <Sparkles className="absolute -top-2 -right-2 w-3.5 h-3.5 text-yellow-300 fill-yellow-300 animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <p className="font-bold text-white text-sm mb-1">আস্‌সালামু আলাইকুম! আমি Picku।</p>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    ICT-র যেকোনো প্রশ্ন করো, আমি বাংলায় সহজ করে বুঝিয়ে দেব।
                  </p>

                  {/* Suggestion chips */}
                  <div className="mt-5 flex flex-col gap-2">
                    {[
                      'ডেটা কমিউনিকেশন কী?',
                      'বাইনারি সংখ্যা কীভাবে কাজ করে?',
                      'HTML ও CSS-এর পার্থক্য বলো',
                    ].map(q => (
                      <button
                        key={q}
                        onClick={() => { setInput(q); inputRef.current?.focus(); }}
                        className="text-left text-xs text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-2 rounded-xl transition-colors font-medium"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Chat bubbles */}
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                const isTypingNow = typingIndex === idx && msg.typing === true;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'} gap-2`}
                  >
                    {!isUser && (
                      <div className="w-6 h-6 shrink-0 mt-1 border border-white/20 rounded-lg bg-slate-900 flex items-center justify-center">
                        <span className="text-[6px] font-black text-white">P</span>
                      </div>
                    )}
                    <div
                      className={`max-w-[82%] text-sm leading-relaxed rounded-2xl px-3.5 py-2.5 ${
                        isUser
                          ? 'bg-indigo-600 text-white rounded-tr-sm shadow-[0_4px_16px_rgba(99,102,241,0.4)]'
                          : 'bg-white/8 backdrop-blur text-slate-100 border border-white/12 rounded-tl-sm'
                      }`}
                    >
                      {isUser ? (
                        <span className="whitespace-pre-wrap break-words">{msg.content}</span>
                      ) : (
                        <TypingMessage
                          content={msg.content}
                          typing={isTypingNow}
                          onDone={() => handleTypingDone(idx)}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start gap-2">
                  <div className="w-6 h-6 shrink-0 mt-1 border border-white/20 rounded-lg bg-slate-900 flex items-center justify-center">
                    <span className="text-[6px] font-black text-white">P</span>
                  </div>
                  <div className="bg-white/8 border border-white/12 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2.5">
                    <Loader2 size={14} className="text-indigo-400 animate-spin shrink-0" />
                    <span className="text-xs text-slate-400 font-medium">Picku ভাবছে…</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} className="h-px" />
            </div>

            {/* Input */}
            <div className="p-3.5 bg-slate-900/60 border-t border-white/8 shrink-0">
              <div className="relative flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="এখানে প্রশ্ন লেখো…"
                  disabled={isLoading || typingIndex !== null}
                  className="
                    flex-1 bg-slate-950/80 border border-white/10 rounded-full
                    py-2.5 pl-4 pr-4 text-sm text-white placeholder-slate-500
                    focus:outline-none focus:border-indigo-500/60 focus:bg-slate-900/80
                    disabled:opacity-50 transition-all
                  "
                />
                <button
                  onClick={handleSend}
                  disabled={!canSend}
                  aria-label="পাঠাও"
                  className="
                    shrink-0 w-9 h-9 flex items-center justify-center
                    bg-indigo-600 hover:bg-indigo-500
                    disabled:bg-slate-800 disabled:text-slate-600
                    text-white rounded-full transition-all
                    shadow-[0_0_12px_rgba(99,102,241,0.35)]
                  "
                >
                  <Send size={15} className={canSend ? 'translate-x-px -translate-y-px' : ''} />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-950/70 py-1.5 text-center border-t border-white/5 shrink-0">
              <span className="text-[10px] text-slate-600 font-medium tracking-wide">
                Powered by Picku AI · ICT Toppers
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
