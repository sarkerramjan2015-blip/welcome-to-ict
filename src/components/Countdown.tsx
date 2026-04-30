import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate?: string | null;
}

const calculateTimeLeft = (targetDate?: string | null) => {
  if (!targetDate) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const difference = Math.max(new Date(targetDate).getTime() - Date.now(), 0);

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

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
