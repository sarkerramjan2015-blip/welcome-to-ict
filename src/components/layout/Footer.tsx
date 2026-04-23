import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-100/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-slate-900/10 dark:border-white/10 pt-16 pb-8 px-8 md:px-16 relative z-20 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">
            Welcome to ICT
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
            ঘরে বসেই ICT এর সকল সমাধান। মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষার্থীদের জন্য বাংলাদেশের সবচেয়ে আধুনিক ও পূর্ণাঙ্গ আইসিটি লার্নিং প্ল্যাটফর্ম।
          </p>
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Important Links</h4>
          <ul className="space-y-3 text-slate-500 dark:text-slate-400">
            <li><Link to="/" className="hover:text-sky-400 transition-colors">Home</Link></li>
            <li><Link to="/syllabus" className="hover:text-sky-400 transition-colors">HSC ICT Course</Link></li>
            <li><Link to="/admin" className="hover:text-sky-400 transition-colors">Admin Portal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Contact Us</h4>
          <ul className="space-y-3 text-slate-500 dark:text-slate-400">
            <li>Email: support@welcometoict.com</li>
            <li>Phone: +880 1234 567890</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center text-slate-500 border-t border-slate-900/10 dark:border-white/10 pt-8 text-sm">
        &copy; {new Date().getFullYear()} Welcome to ICT. All rights reserved. Built with Liquid Clarity.
      </div>
    </footer>
  );
}
