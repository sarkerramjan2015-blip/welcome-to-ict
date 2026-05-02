import os

file_path = os.path.join(os.path.dirname(__file__), '../src/pages/Home.tsx')

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add imports for useEffect, useState and quiz-utils
if "import { fetchUpcomingChallenge, UpcomingChallenge } from '../lib/quiz-utils';" not in content:
    # find where to inject import
    content = content.replace("import { motion, AnimatePresence } from 'motion/react';", "import { motion, AnimatePresence } from 'motion/react';\nimport { fetchUpcomingChallenge, UpcomingChallenge } from '../lib/quiz-utils';")

# 2. Add state inside Home component
state_code = """export default function Home() {
  const [phraseIndex, setPhraseIndex] = useState(0);"""

new_state_code = """export default function Home() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [upcomingChallenge, setUpcomingChallenge] = useState<UpcomingChallenge | null>(null);

  useEffect(() => {
    fetchUpcomingChallenge().then(setUpcomingChallenge);
  }, []);"""

content = content.replace(state_code, new_state_code)

# 3. Modify the Countdown usage and add syllabus
old_banner = """<div className="mb-6">
                <Countdown />
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">"""

new_banner = """<div className="mb-6">
                {upcomingChallenge && <Countdown targetDate={upcomingChallenge.startsAt} />}
              </div>

              {upcomingChallenge && upcomingChallenge.syllabus.length > 0 && (
                <div className="mb-6 text-left border-l-2 border-indigo-400 pl-4">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Syllabus:</p>
                  <div className="flex flex-col gap-1">
                    {upcomingChallenge.syllabus.map((topic, i) => (
                      <p key={i} className="text-xs font-semibold text-slate-600 dark:text-slate-400">- {topic}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">"""

content = content.replace(old_banner, new_banner)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Home.tsx updated!")
