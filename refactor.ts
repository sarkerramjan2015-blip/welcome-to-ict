import { Project, SyntaxKind } from "ts-morph";
import * as fs from "fs";
import * as path from "path";

const project = new Project();
project.addSourceFilesAtPaths("d:/ict_final_website/welcome-to-ict/src/data/chapters/chapter[2-6]/topic*.ts");

const files = project.getSourceFiles();

files.forEach(sourceFile => {
  const filePath = sourceFile.getFilePath();
  const baseName = path.basename(filePath, ".ts");
  if (baseName === "index") return;
  
  console.log("Processing " + baseName + "...");

  const dirPath = path.join(path.dirname(filePath), baseName);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  let practiceMCQs = "[]";
  let knowledgeQuestions = "[]";
  let analyticalQuestions = "[]";
  let cqsText = "[]";

  const practiceVar = sourceFile.getVariableDeclaration("practiceMCQs");
  if (practiceVar) practiceMCQs = practiceVar.getInitializer()?.getText() || "[]";

  const kqVar = sourceFile.getVariableDeclaration("knowledgeQuestions");
  if (kqVar) knowledgeQuestions = kqVar.getInitializer()?.getText() || "[]";

  const aqVar = sourceFile.getVariableDeclaration("analyticalQuestions");
  if (aqVar) analyticalQuestions = aqVar.getInitializer()?.getText() || "[]";

  const cqVar = sourceFile.getVariableDeclaration("cqs");
  if (cqVar) cqsText = cqVar.getInitializer()?.getText() || "[]";

  const topicVar = sourceFile.getVariableDeclaration(baseName);
  if (!topicVar) {
     console.error("No topic variable found in", baseName);
     return;
  }
  
  const initializer = topicVar.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
  if (!initializer) {
      console.error("Topic is not an object literal in", baseName);
      return;
  }
  
  const getPropText = (name: string) => {
     const prop = initializer.getProperty(name);
     if (prop && prop.isKind(SyntaxKind.PropertyAssignment)) {
        return prop.getInitializer()?.getText() || "";
     }
     return "";
  };

  const id = getPropText("id") || '""';
  const title = getPropText("title") || '""';
  const thumbnail = getPropText("thumbnail") || '""';
  const importance = getPropText("importance") || '""';
  const video_url = getPropText("video_url") || '""';
  
  const notesHtml = getPropText("board_notes") || '""';
  
  const inlinePractice = getPropText("practiceMcqs");
  if (inlinePractice && inlinePractice !== "practiceMCQs" && inlinePractice !== "[]" && !practiceVar) {
     practiceMCQs = inlinePractice;
  }
  
  const inlineCqs = getPropText("cqs");
  if (inlineCqs && inlineCqs !== "cqs" && inlineCqs !== "[]" && !cqVar) {
     cqsText = inlineCqs;
  }

  let shortQs = getPropText("shortQuestions");
  if (!shortQs) shortQs = "[]";

  const metaContent = "export const meta = {\n  id: " + id + ",\n  title: " + title + ",\n  importance: " + importance + ",\n  thumbnail: " + thumbnail + ",\n  video_url: " + video_url + "\n};\n";
  fs.writeFileSync(path.join(dirPath, "meta.ts"), metaContent);

  const notesContent = "export const notes = " + notesHtml + ";\n";
  fs.writeFileSync(path.join(dirPath, "notes.ts"), notesContent);

  const mcqsContent = "import { PracticeMCQ } from \"../../../ict-syllabus\";\n\nexport const practiceMCQs: PracticeMCQ[] = " + practiceMCQs + ";\n";
  fs.writeFileSync(path.join(dirPath, "mcqs.ts"), mcqsContent);

  const questionsContent = "export const knowledgeQuestions = " + knowledgeQuestions + ";\nexport const analyticalQuestions = " + analyticalQuestions + ";\n";
  fs.writeFileSync(path.join(dirPath, "questions.ts"), questionsContent);

  const cqsContent = "export const cqs = " + cqsText + ";\n";
  fs.writeFileSync(path.join(dirPath, "cqs.ts"), cqsContent);

  const indexContent = "import { Topic } from \"../../../ict-syllabus\";\nimport { generateQuiz } from \"../../../utils\";\nimport { meta } from \"./meta\";\nimport { notes } from \"./notes\";\nimport { practiceMCQs } from \"./mcqs\";\nimport { cqs } from \"./cqs\";\n\nexport const " + baseName + ": Topic = {\n  ...meta,\n  board_notes: notes,\n  shortQuestions: " + shortQs + ",\n  practiceMcqs: practiceMCQs,\n  cqs: cqs,\n  quizMcqs: generateQuiz(practiceMCQs, 2)\n};\n";
  fs.writeFileSync(path.join(dirPath, "index.ts"), indexContent);

  console.log("Successfully extracted " + baseName);
});
