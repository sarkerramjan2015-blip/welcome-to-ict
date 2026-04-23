import React from 'react';
import { Facebook, MessageCircle, PlayCircle } from 'lucide-react';

export default function LiveCourseDashboard() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-gradient-to-br from-indigo-600/40 to-purple-600/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-900/10 dark:border-white/20 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Welcome to HSC ICT Live Course!</h1>
        <p className="text-slate-600 dark:text-gray-300 mb-8">Join our private groups to get live class links, updates, and support.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a 
            href="https://facebook.com/groups/dummy" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-transform hover:scale-105"
          >
            <Facebook className="w-6 h-6" />
            Join Facebook Group
          </a>
          <a 
            href="https://chat.whatsapp.com/dummy" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold transition-transform hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
            Join WhatsApp Group
          </a>
        </div>
      </div>

      <div className="bg-slate-900/5 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-slate-900/10 dark:border-white/10">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Past Live Classes (Recordings)</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((num) => (
            <div key={num} className="bg-slate-900/5 dark:bg-white/5 p-4 rounded-xl border border-slate-900/10 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400">
                  <PlayCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-bold">Live Class {num}: Chapter 1 Review</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400">Recorded on {new Date().toLocaleDateString()}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-slate-900/5 dark:bg-white/10 hover:bg-slate-900/20 dark:hover:bg-white/20 text-slate-900 dark:text-white rounded-lg transition-colors">
                Watch
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
