"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_morph_1 = require("ts-morph");
var fs = require("fs");
var path = require("path");
var project = new ts_morph_1.Project();
project.addSourceFilesAtPaths("d:/ict_final_website/welcome-to-ict/src/data/chapters/chapter1/topic*.ts");
var files = project.getSourceFiles();
files.forEach(function (sourceFile) {
    var _a, _b, _c, _d;
    var filePath = sourceFile.getFilePath();
    var baseName = path.basename(filePath, ".ts");
    if (baseName === "index")
        return;
    console.log("Processing " + baseName + "...");
    var dirPath = path.join(path.dirname(filePath), baseName);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
    var practiceMCQs = "[]";
    var knowledgeQuestions = "[]";
    var analyticalQuestions = "[]";
    var cqsText = "[]";
    var practiceVar = sourceFile.getVariableDeclaration("practiceMCQs");
    if (practiceVar)
        practiceMCQs = ((_a = practiceVar.getInitializer()) === null || _a === void 0 ? void 0 : _a.getText()) || "[]";
    var kqVar = sourceFile.getVariableDeclaration("knowledgeQuestions");
    if (kqVar)
        knowledgeQuestions = ((_b = kqVar.getInitializer()) === null || _b === void 0 ? void 0 : _b.getText()) || "[]";
    var aqVar = sourceFile.getVariableDeclaration("analyticalQuestions");
    if (aqVar)
        analyticalQuestions = ((_c = aqVar.getInitializer()) === null || _c === void 0 ? void 0 : _c.getText()) || "[]";
    var cqVar = sourceFile.getVariableDeclaration("cqs");
    if (cqVar)
        cqsText = ((_d = cqVar.getInitializer()) === null || _d === void 0 ? void 0 : _d.getText()) || "[]";
    var topicVar = sourceFile.getVariableDeclaration(baseName);
    if (!topicVar) {
        console.error("No topic variable found in", baseName);
        return;
    }
    var initializer = topicVar.getInitializerIfKind(ts_morph_1.SyntaxKind.ObjectLiteralExpression);
    if (!initializer) {
        console.error("Topic is not an object literal in", baseName);
        return;
    }
    var getPropText = function (name) {
        var _a;
        var prop = initializer.getProperty(name);
        if (prop && prop.isKind(ts_morph_1.SyntaxKind.PropertyAssignment)) {
            return ((_a = prop.getInitializer()) === null || _a === void 0 ? void 0 : _a.getText()) || "";
        }
        return "";
    };
    var id = getPropText("id") || '""';
    var title = getPropText("title") || '""';
    var thumbnail = getPropText("thumbnail") || '""';
    var importance = getPropText("importance") || '""';
    var video_url = getPropText("video_url") || '""';
    var notesHtml = getPropText("board_notes") || '""';
    var inlinePractice = getPropText("practiceMcqs");
    if (inlinePractice && inlinePractice !== "practiceMCQs" && inlinePractice !== "[]" && !practiceVar) {
        practiceMCQs = inlinePractice;
    }
    var inlineCqs = getPropText("cqs");
    if (inlineCqs && inlineCqs !== "cqs" && inlineCqs !== "[]" && !cqVar) {
        cqsText = inlineCqs;
    }
    var shortQs = getPropText("shortQuestions");
    if (!shortQs)
        shortQs = "[]";
    var metaContent = "export const meta = {\n  id: " + id + ",\n  title: " + title + ",\n  importance: " + importance + ",\n  thumbnail: " + thumbnail + ",\n  video_url: " + video_url + "\n};\n";
    fs.writeFileSync(path.join(dirPath, "meta.ts"), metaContent);
    var notesContent = "export const notes = " + notesHtml + ";\n";
    fs.writeFileSync(path.join(dirPath, "notes.ts"), notesContent);
    var mcqsContent = "import { PracticeMCQ } from \"../../../ict-syllabus\";\n\nexport const practiceMCQs: PracticeMCQ[] = " + practiceMCQs + ";\n";
    fs.writeFileSync(path.join(dirPath, "mcqs.ts"), mcqsContent);
    var questionsContent = "export const knowledgeQuestions = " + knowledgeQuestions + ";\nexport const analyticalQuestions = " + analyticalQuestions + ";\n";
    fs.writeFileSync(path.join(dirPath, "questions.ts"), questionsContent);
    var cqsContent = "export const cqs = " + cqsText + ";\n";
    fs.writeFileSync(path.join(dirPath, "cqs.ts"), cqsContent);
    var indexContent = "import { Topic } from \"../../../ict-syllabus\";\nimport { generateQuiz } from \"../../../utils\";\nimport { meta } from \"./meta\";\nimport { notes } from \"./notes\";\nimport { practiceMCQs } from \"./mcqs\";\nimport { cqs } from \"./cqs\";\n\nexport const " + baseName + ": Topic = {\n  ...meta,\n  board_notes: notes,\n  shortQuestions: " + shortQs + ",\n  practiceMcqs: practiceMCQs,\n  cqs: cqs,\n  quizMcqs: generateQuiz(practiceMCQs, 2)\n};\n";
    fs.writeFileSync(path.join(dirPath, "index.ts"), indexContent);
    console.log("Successfully extracted " + baseName);
});
