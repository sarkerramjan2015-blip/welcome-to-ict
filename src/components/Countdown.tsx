import React, { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 12, minutes: 30, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-3 justify-center md:justify-start">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-md border border-slate-900/10 dark:border-white/20 rounded-xl w-14 h-14 flex items-center justify-center shadow-lg text-xl font-bold text-slate-900 dark:text-white">
            {value.toString().padStart(2, '0')}
          </div>
          <span className="text-[10px] uppercase tracking-wider text-slate-600 dark:text-slate-300 mt-1 font-semibold">{unit}</span>
        </div>
      ))}
    </div>
  );
}
