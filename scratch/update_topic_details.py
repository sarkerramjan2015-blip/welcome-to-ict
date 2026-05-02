import os

file_path = os.path.join(os.path.dirname(__file__), '../src/pages/TopicDetails.tsx')

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target1 = """<h3 className="text-base md:text-xl font-bold mb-5 md:mb-6 text-slate-800 dark:text-slate-100 leading-relaxed block break-words">
                          <span className="text-slate-400 mr-2">{idx + 1}.</span> <QuestionText text={mcq.q} />
                        </h3>"""
rep1 = """<h3 className="text-base md:text-xl font-bold mb-5 md:mb-6 text-slate-800 dark:text-slate-100 leading-relaxed block break-words">
                          <span className="text-slate-400 mr-2">{idx + 1}.</span> <QuestionText text={mcq.q} />
                          {mcq.boardQuestions && mcq.boardQuestions.map((board, bIdx) => (
                            <span key={bIdx} className="inline-block ml-0 sm:ml-3 mt-2 sm:mt-0 px-3 py-1 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-900/50 dark:to-orange-900/40 text-amber-800 dark:text-amber-300 text-[0.75rem] sm:text-xs font-black rounded-lg border border-amber-300/50 dark:border-amber-700/50 shadow-sm tracking-wider align-middle mb-1 uppercase max-w-full break-words">
                              {board}
                            </span>
                          ))}
                        </h3>"""

content = content.replace(target1, rep1)

target2 = """<h4 className="text-base md:text-lg font-bold mb-6 text-slate-800 dark:text-slate-200 leading-relaxed block break-words">
                            <span className="text-slate-400 mr-2">{idx + 1}.</span> <QuestionText text={mcq.q} />
                          </h4>"""
rep2 = """<h4 className="text-base md:text-lg font-bold mb-6 text-slate-800 dark:text-slate-200 leading-relaxed block break-words">
                            <span className="text-slate-400 mr-2">{idx + 1}.</span> <QuestionText text={mcq.q} />
                            {/* @ts-ignore */}
                            {mcq.boardQuestions && mcq.boardQuestions.map((board, bIdx) => (
                              <span key={bIdx} className="inline-block ml-0 sm:ml-3 mt-2 sm:mt-0 px-3 py-1 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-900/50 dark:to-orange-900/40 text-amber-800 dark:text-amber-300 text-[0.75rem] sm:text-xs font-black rounded-lg border border-amber-300/50 dark:border-amber-700/50 shadow-sm tracking-wider align-middle mb-1 uppercase max-w-full break-words">
                                {board}
                              </span>
                            ))}
                          </h4>"""
content = content.replace(target2, rep2)

target3 = """<h3 className="text-base md:text-xl font-bold mb-6 text-slate-800 dark:text-slate-100 leading-relaxed block break-words">
                          <span className="text-slate-400 mr-2">{idx + 1}.</span> <QuestionText text={mcq.q} />
                        </h3>"""
rep3 = """<h3 className="text-base md:text-xl font-bold mb-6 text-slate-800 dark:text-slate-100 leading-relaxed block break-words">
                          <span className="text-slate-400 mr-2">{idx + 1}.</span> <QuestionText text={mcq.q} />
                          {/* @ts-ignore */}
                          {mcq.boardQuestions && mcq.boardQuestions.map((board, bIdx) => (
                            <span key={bIdx} className="inline-block ml-0 sm:ml-3 mt-2 sm:mt-0 px-3 py-1 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-900/50 dark:to-orange-900/40 text-amber-800 dark:text-amber-300 text-[0.75rem] sm:text-xs font-black rounded-lg border border-amber-300/50 dark:border-amber-700/50 shadow-sm tracking-wider align-middle mb-1 uppercase max-w-full break-words">
                              {board}
                            </span>
                          ))}
                        </h3>"""
content = content.replace(target3, rep3)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("TopicDetails updated!")
