import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, X, Link as LinkIcon, Facebook, MessageCircle, MessageSquare, CheckCircle2, PhoneCall } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ShareButtonProps {
  className?: string;
}

export default function ShareButton({ className }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
    setTitle(document.title);
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: 'Check out this awesome ICT resource!',
          url: url,
        });
      } catch (err) {
        console.log('Native share failed', err);
      }
    } else {
      handleCopy();
    }
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5 text-[#1877F2]" fill="currentColor" />,
      bg: 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400')
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5 text-[#25D366]" fill="currentColor" />,
      bg: 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40',
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(title + " - " + url)}`, '_blank')
    },
    {
      name: 'Messenger',
      icon: <MessageSquare className="w-5 h-5 text-[#AA336A]" fill="currentColor" />, // Generic purple/pink for messenger
      bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/20 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900/40',
      action: () => window.open(`fb-messenger://share/?link=${encodeURIComponent(url)}`, '_self')
    },
    {
      name: 'Imo',
      icon: <MessageSquare className="w-5 h-5 text-sky-500" fill="currentColor" />, // Generic blue for imo
      bg: 'bg-sky-50 dark:bg-sky-900/20 hover:bg-sky-100 dark:hover:bg-sky-900/40',
      action: handleNativeShare // Imo web intent is unreliable, native share sheet or copy fallback is best
    }
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={cn(
          "flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-white text-sm font-bold shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all hover:scale-105 group",
          className
        )}
      >
        <Share2 size={16} className="group-hover:-rotate-12 transition-transform" />
        <span className="tracking-wide">Share</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-sm bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-[2rem] p-6 shadow-2xl flex flex-col gap-6 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
                  Share this page
                </h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Share Options Grid */}
              <div className="grid grid-cols-4 gap-3">
                {shareOptions.map((opt) => (
                  <button 
                    key={opt.name}
                    onClick={opt.action}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-200/50 dark:border-white/5 shadow-sm transition-transform group-hover:scale-110 group-active:scale-95",
                      opt.bg
                    )}>
                      {opt.icon}
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">{opt.name}</span>
                  </button>
                ))}
              </div>

              {/* Copy Link Section */}
              <div className="mt-2">
                <div className="relative flex items-center bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden p-1.5">
                  <div className="flex-1 truncate px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                    {url}
                  </div>
                  <button
                    onClick={handleCopy}
                    className={cn(
                      "shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all",
                      copied 
                        ? "bg-emerald-500 text-white" 
                        : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                    )}
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 size={16} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <LinkIcon size={16} />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Copied Toast Banner */}
              <AnimatePresence>
                {copied && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-lg flex items-center gap-2"
                  >
                    <CheckCircle2 size={14} />
                    লিঙ্ক কপি হয়েছে!
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
