import os
import glob
import re

chapters_dir = os.path.join(os.path.dirname(__file__), '../src/data/chapters')
mcq_files = glob.glob(f"{chapters_dir}/**/mcqs.ts", recursive=True)

for file_path in mcq_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if there are keys that need to be replaced
    if 'question:' in content or 'correctAnswer:' in content:
        # Replace 'question: "..."' with 'q: "..."'
        content = re.sub(r'\bquestion:\s', 'q: ', content)
        
        # Replace 'correctAnswer: "..."' with 'correct: "..."'
        content = re.sub(r'\bcorrectAnswer:\s', 'correct: ', content)
        
        # Add the boardQuestion into the 'q' if needed? 
        # Actually, let's just update the interface instead, or keep them as optional fields.
        # Wait! The question doesn't have the board name inside brackets.
        # We can append it.
        # A regex to match q: "...", \n options: [...], \n correct: "...", \n explanation: "...", \n boardQuestions: ["..."]
        # It's better to update `QuestionText` component in `TopicDetails.tsx` and `MCQPractice.tsx`
        # OR we can just write a quick regex replacement to append the board to `q`.
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
print("MCQ keys migrated!")
