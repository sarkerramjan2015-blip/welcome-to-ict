import React, { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

export default function Footer() {
  const [name, setName] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !suggestion.trim()) {
      showToast("দয়া করে আপনার নাম এবং পরামর্শ লিখুন।");
      return;
    }
    
    const text = encodeURIComponent(`আসসালামু আলাইকুম, আমি ${name.trim()}। ICT Toppers সম্পর্কে আমার পরামর্শ হলো: ${suggestion.trim()}`);
    const whatsappLink = `https://wa.me/8801518657869?text=${text}`;
    window.open(whatsappLink, '_blank');
    
    setName('');
    setSuggestion('');
  };

  return (
    <footer className="bg-slate-100/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-slate-900/10 dark:border-white/10 pt-16 pb-8 px-8 md:px-16 relative z-20 mt-auto">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-red-500/90 text-white px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md border border-red-400/50 flex items-center gap-3 font-medium"
          >
            <span>{toastMsg}</span>
            <button onClick={() => setToastMsg('')} className="p-1 hover:bg-white/20 rounded-full transition-colors">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-1">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">
            ICT Toppers
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed mb-6">
            ঘরে বসেই ICT mastery. Smart notes, interactive practice, quiz tracking, and mentor-guided problem solving for ambitious Bangladeshi students.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Important Links</h4>
          <ul className="space-y-3 text-slate-500 dark:text-slate-400">
            <li><Link to="/" className="hover:text-sky-400 transition-colors">Home</Link></li>
            <li><Link to="/syllabus" className="hover:text-sky-400 transition-colors">HSC ICT Course</Link></li>
            <li><Link to="/admin" className="hover:text-sky-400 transition-colors">Admin Portal</Link></li>
            <li><Link to="/terms" className="hover:text-sky-400 transition-colors">Terms and Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Contact Us</h4>
          <ul className="space-y-3 text-slate-500 dark:text-slate-400">
            <li>Email: <a href="mailto:sarkerramjan2015@gmail.com" className="hover:text-sky-400 transition-colors">sarkerramjan2015@gmail.com</a></li>
            <li>Facebook: <a href="https://www.facebook.com/ramjansarker02/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">Ramjan Sarker</a></li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>
        <div className="md:col-span-1">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <MessageCircle size={20} className="text-sky-400" /> Suggestion / Feedback
          </h4>
          <form onSubmit={handleFeedbackSubmit} className="space-y-3">
            <input 
              type="text" 
              placeholder="Your Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm text-slate-700 dark:text-slate-300 transition-all shadow-sm"
            />
            <textarea 
              placeholder="Your suggestion..." 
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm text-slate-700 dark:text-slate-300 transition-all resize-none shadow-sm"
            ></textarea>
            <button 
              type="submit" 
              className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-sky-500/20 active:scale-95"
            >
              <Send size={16} /> Submit
            </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center text-slate-500 border-t border-slate-900/10 dark:border-white/10 pt-8 text-sm font-medium">
        &copy; 2026 All rights reserved ICT Toppers
      </div>
    </footer>
  );
}
