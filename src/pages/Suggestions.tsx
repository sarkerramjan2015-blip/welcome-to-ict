import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Book, Eye, ShoppingCart, Lock, CheckCircle } from 'lucide-react';
import MockPaymentPopup from '../components/MockPaymentPopup';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Suggestions() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPayment, setShowPayment] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const handleBuy = async () => {
    if (!user) {
      await login({ redirectTo: `${location.pathname}${location.search}${location.hash}` });
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    localStorage.setItem('hasPurchasedSuggestion', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">ICT Short Suggestions</h1>
        <p className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get the ultimate last-minute preparation guide to secure top marks in your board exams.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* HSC ICT Suggestion */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-red-600/20 to-orange-600/20 backdrop-blur-xl rounded-3xl p-8 border border-red-500/30 flex flex-col h-full relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 rounded-bl-xl font-bold text-sm">
            HOT SELLER
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center text-red-400">
              <Book className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">HSC ICT Master Suggestion</h2>
              <div className="text-3xl font-black text-red-400 mt-1">৳ 150</div>
            </div>
          </div>

          <div className="space-y-4 mb-8 flex-1">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center mb-6">
              <p className="text-xl font-bold text-red-300">🎯 90% Common Inshallah!</p>
            </div>
            <div className="flex items-center gap-3 text-gray-200">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
              <span>Chapter-wise Most Important Topics</span>
            </div>
            <div className="flex items-center gap-3 text-gray-200">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
              <span>Top 50 CQ (Creative Questions)</span>
            </div>
            <div className="flex items-center gap-3 text-gray-200">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
              <span>Top 200 MCQ with Explanations</span>
            </div>
            <div className="flex items-center gap-3 text-gray-200">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
              <span>Interactive E-Book Format</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setShowDemo(true)}
              className="py-4 bg-slate-900/5 dark:bg-white/10 hover:bg-slate-900/20 dark:hover:bg-white/20 text-slate-900 dark:text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" />
              View Demo
            </button>
            <button 
              onClick={handleBuy}
              className="py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-red-500/25 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Buy Now
            </button>
          </div>
        </motion.div>

        {/* SSC ICT Suggestion */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-slate-900/5 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-slate-900/10 dark:border-white/10 flex flex-col h-full opacity-75"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-500/20 rounded-2xl flex items-center justify-center text-slate-500 dark:text-gray-400">
              <Book className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">SSC ICT Short Suggestion</h2>
              <div className="text-xl font-bold text-slate-500 dark:text-gray-400 mt-1">Price TBA</div>
            </div>
          </div>

          <div className="space-y-4 mb-8 flex-1 flex flex-col items-center justify-center text-center">
            <Lock className="w-16 h-16 text-gray-500 mb-4" />
            <h3 className="text-2xl font-bold text-slate-600 dark:text-gray-300">Coming Soon</h3>
            <p className="text-gray-500">We are preparing the best materials for SSC candidates.</p>
          </div>

          <button disabled className="w-full py-4 bg-slate-900/5 dark:bg-white/5 text-gray-500 rounded-xl font-bold text-lg cursor-not-allowed flex items-center justify-center gap-2">
            <Lock className="w-5 h-5" />
            Not Available Yet
          </button>
        </motion.div>
      </div>

      {showPayment && (
        <MockPaymentPopup 
          challengeId="hsc-suggestion" 
          fee={150} 
          onClose={() => setShowPayment(false)} 
          onSuccess={handlePaymentSuccess} 
        />
      )}

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-900/10 dark:border-white/20 rounded-3xl p-8 max-w-2xl w-full relative">
            <button 
              onClick={() => setShowDemo(false)}
              className="absolute top-4 right-4 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Demo: HSC ICT Suggestion</h2>
            <div className="bg-slate-900/5 dark:bg-white/5 rounded-xl p-6 h-64 overflow-y-auto text-slate-600 dark:text-gray-300 space-y-4 font-serif">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Chapter 1: Global Village</h3>
              <p><strong>Q1:</strong> What is Virtual Reality?</p>
              <p><strong>Ans:</strong> Virtual reality is a simulated experience that can be similar to or completely different from the real world...</p>
              <hr className="border-slate-900/10 dark:border-white/10" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Chapter 2: Communication Systems</h3>
              <p><strong>Q2:</strong> Explain Bandwidth.</p>
              <p><strong>Ans:</strong> Bandwidth is the maximum rate of data transfer across a given path...</p>
              <p className="text-center text-red-400 font-bold mt-8">... Buy the full e-book to read more!</p>
            </div>
            <button 
              onClick={() => { setShowDemo(false); handleBuy(); }}
              className="w-full mt-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors"
            >
              Buy Full E-Book for ৳150
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
