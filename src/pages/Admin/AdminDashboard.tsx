import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FileText, HelpCircle, LogOut, Plus, X, Save, Users, Activity, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLms } from '../../context/LmsContext';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { adminStats } = useLms();
  const [showTopicEditor, setShowTopicEditor] = useState(false);
  const [newTopic, setNewTopic] = useState({ title: '', importance: 'Medium' });

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className="flex-1 flex flex-col px-8 md:px-16 py-8 relative z-20">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3">
            <LayoutDashboard className="text-sky-400" /> Admin Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your educational content and quizzes.</p>
        </div>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-slate-900/5 dark:bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 border border-slate-900/10 dark:border-white/10 transition-colors flex items-center gap-2 text-sm font-semibold"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Total Chapters', value: adminStats.chapters, icon: BookOpen, iconClass: 'bg-indigo-500/20 text-indigo-400', delay: 0.1 },
          { label: 'Total Topics', value: adminStats.topics, icon: FileText, iconClass: 'bg-sky-500/20 text-sky-400', delay: 0.2 },
          { label: 'Total MCQs', value: adminStats.mcqs, icon: HelpCircle, iconClass: 'bg-emerald-500/20 text-emerald-400', delay: 0.3 },
          { label: 'Active Students', value: adminStats.activeStudents, icon: Users, iconClass: 'bg-pink-500/20 text-pink-400', delay: 0.4 },
          { label: 'Quiz Attempts', value: adminStats.quizAttempts, icon: Activity, iconClass: 'bg-amber-500/20 text-amber-400', delay: 0.5 },
          { label: 'Completed Topics', value: adminStats.completedTopics, icon: CheckCircle, iconClass: 'bg-green-500/20 text-green-400', delay: 0.6 },
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: stat.delay }}
              className="bg-slate-900/5 dark:bg-white/5 backdrop-blur-md border border-slate-900/10 dark:border-white/10 rounded-3xl p-6 flex items-center gap-6"
            >
              <div className={`w-14 h-14 rounded-2xl ${stat.iconClass} flex items-center justify-center`}>
                <Icon size={28} />
              </div>
              <div>
                <div className="text-3xl font-black">{stat.value}</div>
                <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions (CRUD Placeholders) */}
      <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
        {['Add Chapter', 'Add Topic', 'Add MCQ', 'Add CQ', 'Manage Courses', 'Manage Suggestions'].map((action, i) => (
          <motion.button 
            key={action}
            onClick={() => {
              if (action === 'Add Topic') setShowTopicEditor(true);
              else alert(`${action} feature is coming soon!`);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-slate-900/5 dark:bg-white/5 hover:bg-slate-900/10 dark:hover:bg-white/10 border border-slate-900/10 dark:border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 font-semibold transition-colors text-center text-sm"
          >
            <Plus size={18} className="text-sky-400" /> {action}
          </motion.button>
        ))}
      </div>

      {showTopicEditor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-900/10 dark:border-white/10 rounded-3xl p-6 w-full max-w-lg shadow-2xl relative"
          >
            <button 
              onClick={() => setShowTopicEditor(false)}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-900/5 dark:bg-white/5 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-black mb-6 text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="text-sky-500" /> Admin Topic Editor
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-600 dark:text-gray-300">Topic Title</label>
                <input 
                  type="text" 
                  value={newTopic.title}
                  onChange={e => setNewTopic({...newTopic, title: e.target.value})}
                  className="w-full bg-white dark:bg-slate-900/50 border border-slate-900/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-sky-500"
                  placeholder="e.g. Logic Gates"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-600 dark:text-gray-300">Importance Level (HSC Board Exam)</label>
                <select 
                  value={newTopic.importance}
                  onChange={e => setNewTopic({...newTopic, importance: e.target.value})}
                  className="w-full bg-white dark:bg-slate-900/50 border border-slate-900/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-sky-500 cursor-pointer appearance-none"
                >
                  <option value="High" className="text-red-500 font-bold">High - Must Read</option>
                  <option value="Medium" className="text-yellow-500 font-bold">Medium - Important</option>
                  <option value="Low" className="text-green-500 font-bold">Low - Optional</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button 
                onClick={() => setShowTopicEditor(false)}
                className="px-6 py-3 rounded-xl font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert(`Saved! In a real app, this would mutate ict-syllabus.ts or the DB.\nSaved: ${newTopic.title} (${newTopic.importance} Importance)`);
                  setShowTopicEditor(false);
                  setNewTopic({ title: '', importance: 'Medium' });
                }}
                className="px-6 py-3 rounded-xl font-bold bg-sky-500 hover:bg-sky-400 text-white transition-colors flex items-center gap-2 shadow-lg shadow-sky-500/25"
              >
                <Save size={18} /> Save to Syllabus
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-6 text-yellow-400">Mega Challenge Management</h2>
      <div className="bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-3xl p-8 text-center">
        <p className="text-slate-600 dark:text-gray-300 mb-6">Generate a new set of 30 AI-powered MCQs for this month's Mega Challenge.</p>
        <button 
          onClick={async () => {
            const btn = document.getElementById('gen-btn');
            if(btn) btn.innerText = 'Generating... (Takes ~30s)';
            await new Promise(resolve => setTimeout(resolve, 900));
            localStorage.setItem('lms:activeChallenge', JSON.stringify({
              id: 'monthly-hsc-ict',
              month: new Date().toLocaleString('default', { month: 'long' }),
              year: new Date().getFullYear(),
              fee: 20,
              generatedAt: new Date().toISOString(),
            }));
            alert('Challenge Generated & Live!');
            if(btn) btn.innerText = 'Generate Challenge Questions';
          }}
          id="gen-btn"
          className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold rounded-xl shadow-lg transition-all"
        >
          Generate Challenge Questions
        </button>
      </div>
    </div>
  );
}
