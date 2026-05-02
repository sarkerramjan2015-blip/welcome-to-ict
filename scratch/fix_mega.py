import os
import re

file_path = os.path.join(os.path.dirname(__file__), '../src/pages/MegaChallenge.tsx')

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix getNextFallbackQuizStart
old_start = """const getNextFallbackQuizStart = () => {
  const nowBdt = new Date(Date.now() + BDT_OFFSET_MS);
  const targetBdt = new Date(Date.UTC(
    nowBdt.getUTCFullYear(),
    nowBdt.getUTCMonth(),
    nowBdt.getUTCDate(),
    21,
    0,
    0,
    0
  ));
  const daysUntilFriday = (5 - targetBdt.getUTCDay() + 7) % 7;
  targetBdt.setUTCDate(targetBdt.getUTCDate() + daysUntilFriday);

  if (targetBdt.getTime() <= nowBdt.getTime()) {
    targetBdt.setUTCDate(targetBdt.getUTCDate() + 7);
  }

  return new Date(targetBdt.getTime() - BDT_OFFSET_MS).toISOString();
};"""

new_start = """const getNextFallbackQuizStart = () => {
  const nowBdt = new Date(Date.now() + BDT_OFFSET_MS);
  const targetBdt = new Date(Date.UTC(
    nowBdt.getUTCFullYear(),
    nowBdt.getUTCMonth(),
    nowBdt.getUTCDate(),
    21,
    0,
    0,
    0
  ));
  const daysUntilFriday = (5 - targetBdt.getUTCDay() + 7) % 7;
  targetBdt.setUTCDate(targetBdt.getUTCDate() + daysUntilFriday);

  // Allow the fallback quiz to remain active for 30 minutes after it starts
  if (targetBdt.getTime() + 30 * 60 * 1000 <= nowBdt.getTime()) {
    targetBdt.setUTCDate(targetBdt.getUTCDate() + 7);
  }

  return new Date(targetBdt.getTime() - BDT_OFFSET_MS).toISOString();
};"""

content = content.replace(old_start, new_start)

# 2. Fix getFallbackChallenge
old_fallback = """const getFallbackChallenge = (): UpcomingChallenge => ({
  id: 'monthly-quiz',
  title: 'HSC ICT Monthly Quiz Exam',
  month: new Date().toLocaleString('default', { month: 'long' }),
  year: new Date().getFullYear(),
  fee: 20,
  startsAt: null,
  endsAt: null,
  syllabus: [],
  totalMarks: 30,
  durationMinutes: 30,
  status: 'PUBLISHED',
});"""

new_fallback = """const getFallbackChallenge = (): UpcomingChallenge => {
  const startsAt = getNextFallbackQuizStart();
  const startDate = new Date(startsAt);

  return {
    id: 'monthly-quiz',
    title: 'HSC ICT Monthly Quiz Exam',
    month: startDate.toLocaleString('en-US', { month: 'long', timeZone: 'Asia/Dhaka' }),
    year: Number(startDate.toLocaleString('en-US', { year: 'numeric', timeZone: 'Asia/Dhaka' })),
    fee: 20,
    startsAt,
    endsAt: new Date(startDate.getTime() + 30 * 60 * 1000).toISOString(),
    syllabus: fallbackSyllabus,
    totalMarks: 30,
    durationMinutes: 30,
    status: 'PUBLISHED',
  };
};"""

content = content.replace(old_fallback, new_fallback)

# 3. Fix normalizeChallenge logic
content = content.replace(
  "  if (!startsAt || new Date(startsAt).getTime() < Date.now()) {\n    return null;\n  }",
  """  const durationMs = Number(data.durationMinutes || 30) * 60 * 1000;
  const endTime = parseScheduleDate(data.endsAt) ? new Date(parseScheduleDate(data.endsAt)).getTime() : (startsAt ? new Date(startsAt).getTime() + durationMs : 0);

  // Hide the challenge only after it ends completely
  if (!startsAt || endTime < Date.now()) {
    return null;
  }"""
)

# 4. UI Replacement
new_ui = """      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-2xl rounded-3xl p-6 md:p-8 border border-slate-900/10 dark:border-white/20 shadow-xl shadow-black/10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 opacity-50" />
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400 mb-2">Upcoming Quiz Schedule</p>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Select a live registration slot</h2>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/5 dark:bg-white/5 py-2 px-4 rounded-full border border-slate-900/10 dark:border-white/10 shadow-inner">
            <Clock className="w-4 h-4 text-sky-400" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Exam starts at 9:00 PM BDT</p>
          </div>
        </div>

        {upcomingChallenges.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-900/20 dark:border-white/20 p-8 text-center bg-slate-900/5 dark:bg-white/5">
            <p className="text-lg font-medium text-slate-600 dark:text-slate-400">No upcoming quiz is published yet.</p>
          </div>
        ) : (
          <motion.div 
            className="grid gap-5 md:grid-cols-3"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {upcomingChallenges.map((item) => {
              const isSelected = item.id === displayChallenge.id;

              return (
                <motion.button
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  key={item.id}
                  onClick={() => setChallenge(item)}
                  className={`group text-left rounded-3xl border p-6 transition-all duration-300 relative overflow-hidden ${
                    isSelected
                      ? 'border-indigo-500/50 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 shadow-2xl shadow-indigo-500/20'
                      : 'border-slate-900/10 bg-slate-900/5 hover:border-indigo-400/30 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                  )}
                  {isSelected && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400"
                    />
                  )}
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <p className={`text-xs font-black uppercase tracking-[0.18em] mb-3 transition-colors ${isSelected ? 'text-indigo-400 drop-shadow-sm' : 'text-sky-500 dark:text-sky-400 group-hover:text-indigo-400'}`}>
                      {formatSchedule(item.startsAt)}
                    </p>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight mb-5">
                      {item.title}
                    </h3>
                    
                    <div className="space-y-2 mt-auto">
                      {item.syllabus.map((topic, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${isSelected ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]' : 'bg-slate-400 dark:bg-slate-500 group-hover:bg-indigo-300'}`} />
                          <p className={`text-sm font-medium leading-relaxed ${isSelected ? 'text-slate-800 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'}`}>
                            {topic}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </motion.section>"""

content = re.sub(r'<motion\.section[\s\S]*?</motion\.section>', new_ui, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("MegaChallenge successfully fixed and UI upgraded!")
