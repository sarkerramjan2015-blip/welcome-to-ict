import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const pages = [
  {
    title: "Cover",
    content: "HSC ICT Master Suggestion\n\n100% Common Guarantee\n\nPrepared by: ICT Experts"
  },
  {
    title: "Chapter 1: Global Village",
    content: "Important Topics:\n\n1. Virtual Reality (VR)\n2. Artificial Intelligence (AI)\n3. Biometrics\n4. Genetic Engineering\n\nTop CQ:\nQ: Explain how VR is changing medical science.\nAns: VR allows medical students to practice surgeries in a simulated environment without risking human lives..."
  },
  {
    title: "Chapter 2: Communication Systems",
    content: "Important Topics:\n\n1. Bandwidth\n2. Data Transmission Modes\n3. Fiber Optic Cable\n4. Network Topologies\n\nTop CQ:\nQ: Differentiate between Simplex, Half-Duplex, and Full-Duplex.\nAns: Simplex is one-way, Half-Duplex is two-way but one at a time, Full-Duplex is simultaneous two-way..."
  },
  {
    title: "Chapter 3: Number Systems",
    content: "Important Topics:\n\n1. Number Conversions (Binary, Decimal, Octal, Hex)\n2. 2's Complement Method\n3. Logic Gates (AND, OR, NOT, NAND, NOR)\n4. Adder (Half & Full)\n\nTop CQ:\nQ: Implement an XOR gate using only NAND gates.\nAns: [Diagram required] It takes 4 NAND gates to create an XOR gate..."
  }
];

export default function EBookReader() {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full flex justify-between items-center mb-6">
        <Link to="/dashboard" className="text-sky-400 hover:text-sky-300 font-medium">
          &larr; Back to Dashboard
        </Link>
        <div className="flex items-center gap-2 text-slate-900 dark:text-white">
          <BookOpen className="w-5 h-5" />
          <span className="font-bold">HSC ICT E-Book</span>
        </div>
        <div className="text-slate-500 dark:text-gray-400">
          Page {currentPage + 1} of {pages.length}
        </div>
      </div>

      {/* Book Container */}
      <div className="w-full bg-[#fdf6e3] text-slate-900 rounded-lg shadow-2xl overflow-hidden min-h-[500px] flex flex-col relative">
        {/* Book Spine Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
        
        <div className="flex-1 p-8 md:p-12 font-serif text-lg leading-relaxed whitespace-pre-wrap">
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-800 border-b border-slate-300 pb-4">
            {pages[currentPage].title}
          </h2>
          <div className={currentPage === 0 ? "text-center text-2xl font-bold mt-20" : ""}>
            {pages[currentPage].content}
          </div>
        </div>

        {/* Page Controls */}
        <div className="bg-slate-200 p-4 flex justify-between items-center border-t border-slate-300">
          <button 
            onClick={prevPage}
            disabled={currentPage === 0}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-400 text-slate-900 dark:text-white rounded-lg font-bold transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>
          <span className="font-mono text-slate-500">{currentPage + 1}</span>
          <button 
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-400 text-slate-900 dark:text-white rounded-lg font-bold transition-colors flex items-center gap-2"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
