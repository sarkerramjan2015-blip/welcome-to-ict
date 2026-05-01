export interface BoardQuestionChapter {
  slug: string;
  chapterName: string;
  chapterNumber: number;
  pdfUrl?: string;
  videoSolutionUrl?: string;
  cqCount: number;
  mcqCount: number;
  previewPages: {
    title: string;
    sections: string[];
  }[];
}

export interface BoardQuestionSet {
  boardYearSlug: string;
  boardName: string;
  boardFullName: string;
  year: number;
  examName: string;
  subject: string;
  allChaptersPdfUrl: string;
  originalSource: string;
  lastUpdated: string;
  chapters: BoardQuestionChapter[];
}

export interface BoardQuestionPage {
  boardYearSlug: string;
  chapterSlug: string;
  boardName: string;
  boardFullName: string;
  year: number;
  examName: string;
  subject: string;
  allChaptersPdfUrl: string;
  pdfUrl?: string;
  videoSolutionUrl: string;
  originalSource: string;
  lastUpdated: string;
  chapterName: string;
  chapterNumber: number;
  cqCount: number;
  mcqCount: number;
  previewPages: BoardQuestionChapter['previewPages'];
}

export interface QuestionBankChapterCard {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
}

export interface QuestionBankBoardYearCard {
  boardYearSlug: string;
  boardName: string;
  year: number;
  title: string;
  description: string;
  defaultChapterSlug: string;
}

const toTitleCase = (value: string) =>
  value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');

const boardDisplayName = (value: string) => {
  const title = toTitleCase(value.replace(/-?board$/i, ''));
  return title.toLowerCase().endsWith('board') ? title : `${title} Board`;
};

const chapterDisplayName = (chapterSlug: string) => {
  const match = chapterSlug.match(/^chapter-(\d+)-(.+)$/i);
  if (!match) return toTitleCase(chapterSlug);

  return `Chapter ${Number(match[1])}: ${toTitleCase(match[2])}`;
};

const chapterNumberFromSlug = (chapterSlug: string) => {
  const match = chapterSlug.match(/^chapter-(\d+)-/i);
  return match ? Number(match[1]) : 1;
};

const buildPdfUrl = (boardYearSlug: string, chapterSlug: string) =>
  `/board-questions/${boardYearSlug}/${chapterSlug}.pdf`;

const buildVideoSolutionUrl = (boardYearSlug: string, chapterSlug: string) =>
  `/courses?solution=${boardYearSlug}-${chapterSlug}`;

const buildFallbackPreviewPages = (boardName: string, year: number, chapterName: string) => [
  {
    title: `${chapterName} CQ Section`,
    sections: [
      `Original board-question structure for ${chapterName} from ${boardName} HSC ICT.`,
      `Useful for Bangladesh HSC students preparing chapter-wise for the ${year} board exam.`,
      'CQ patterns, marks distribution, and question style are kept easy to scan.',
    ],
  },
  {
    title: `${chapterName} MCQ Section`,
    sections: [
      `MCQ practice focus for ${chapterName} long-tail searches in ${boardName} HSC ICT.`,
      `Built for students looking for a free chapter-wise HSC ICT board question PDF in Bangladesh.`,
      'Use the full video solution and notes for guided explanation and exam strategy.',
    ],
  },
];

export const boardQuestions: BoardQuestionSet[] = [
  {
    boardYearSlug: 'dhaka-board-2025',
    boardName: 'Dhaka Board',
    boardFullName: 'Dhaka Education Board',
    year: 2025,
    examName: 'HSC Exam 2025',
    subject: 'ICT',
    allChaptersPdfUrl: '/board-questions/dhaka-board-2025/all-chapters-mega-pdf.pdf',
    originalSource: 'Original Dhaka Education Board question for HSC ICT students in Bangladesh.',
    lastUpdated: '2026-05-02',
    chapters: [
      {
        slug: 'chapter-2-communication-networking',
        chapterName: 'Chapter 2: Communication Systems and Networking',
        chapterNumber: 2,
        pdfUrl: '/board-questions/dhaka-board-2025/chapter-2-communication-networking.pdf',
        videoSolutionUrl: '/courses?solution=dhaka-board-2025-chapter-2-communication-networking',
        cqCount: 2,
        mcqCount: 10,
        previewPages: [
          {
            title: 'Chapter 2 CQ Section',
            sections: [
              'Communication systems and networking creative questions from the Dhaka Education Board HSC ICT paper.',
              'Board-focused data communication, topology, network device, and transmission media question patterns.',
              'Prepared for Bangladesh HSC students searching chapter-wise ICT board questions.',
            ],
          },
          {
            title: 'Chapter 2 MCQ Section',
            sections: [
              'Original-style MCQ practice for networking, protocols, bandwidth, and communication modes.',
              'Useful for quick revision before HSC Exam 2025 and upcoming board tests.',
              'Pairs well with chapter-wise CQ practice and board question pattern analysis.',
            ],
          },
        ],
      },
      {
        slug: 'chapter-3-number-system',
        chapterName: 'Chapter 3: Number System',
        chapterNumber: 3,
        pdfUrl: '/board-questions/dhaka-board-2025/chapter-3-number-system.pdf',
        videoSolutionUrl: '/courses?solution=dhaka-board-2025-chapter-3-number-system',
        cqCount: 3,
        mcqCount: 12,
        previewPages: [
          {
            title: 'Chapter 3 CQ Section',
            sections: [
              'Number system creative questions from the Dhaka Education Board HSC ICT paper.',
              'Board-focused conversion, binary arithmetic, and code-related question patterns.',
              'Prepared for Bangladesh HSC students searching chapter-wise ICT board questions.',
            ],
          },
          {
            title: 'Chapter 3 MCQ Section',
            sections: [
              'Original-style MCQ practice for number systems and digital codes.',
              'Useful for quick revision before HSC Exam 2025 and upcoming board tests.',
              'Pairs well with the full video solution and chapter notes for weak areas.',
            ],
          },
        ],
      },
      {
        slug: 'chapter-4-web-design-html',
        chapterName: 'Chapter 4: Web Design and HTML',
        chapterNumber: 4,
        pdfUrl: '/board-questions/dhaka-board-2025/chapter-4-web-design-html.pdf',
        videoSolutionUrl: '/courses?solution=dhaka-board-2025-chapter-4-web-design-html',
        cqCount: 2,
        mcqCount: 8,
        previewPages: [
          {
            title: 'Chapter 4 CQ Section',
            sections: [
              'HTML, hyperlink, table, form, and web page structure questions from HSC ICT.',
              'Designed for Dhaka Education Board students practicing chapter-wise CQ.',
              'Highlights common board patterns for Bangladesh HSC ICT preparation.',
            ],
          },
          {
            title: 'Chapter 4 MCQ Section',
            sections: [
              'Chapter-wise MCQ practice for tags, attributes, URLs, and basic web concepts.',
              'Useful for students searching HSC ICT Web Design board question PDF.',
              'The video solution explains how to answer board-standard HTML questions.',
            ],
          },
        ],
      },
    ],
  },
];

export const questionBankChapters: QuestionBankChapterCard[] = [
  {
    slug: 'chapter-1-world-bd-perspectives',
    title: 'Chapter 1: World & BD Perspectives',
    shortTitle: 'World & BD Perspectives',
    description: 'Chapter-wise CQ from global village, e-services, AI, robotics, and ICT in Bangladesh.',
  },
  {
    slug: 'chapter-2-communication-networking',
    title: 'Chapter 2: Communication Systems & Networking',
    shortTitle: 'Communication & Networking',
    description: 'CQ practice for data communication, networking, topology, transmission media, and protocols.',
  },
  {
    slug: 'chapter-3-number-system',
    title: 'Chapter 3: Number System',
    shortTitle: 'Number System',
    description: 'Chapter-wise CQ for number conversion, binary arithmetic, Boolean ideas, and digital codes.',
  },
  {
    slug: 'chapter-4-web-design-html',
    title: 'Chapter 4: Web Design & HTML',
    shortTitle: 'Web Design & HTML',
    description: 'CQ practice from HTML tags, forms, tables, hyperlinks, web structure, and browser concepts.',
  },
  {
    slug: 'chapter-5-programming-c',
    title: 'Chapter 5: Programming Language',
    shortTitle: 'Programming Language',
    description: 'Board-style CQ for C programming basics, variables, operators, conditions, loops, and arrays.',
  },
  {
    slug: 'chapter-6-database-management',
    title: 'Chapter 6: Database Management System',
    shortTitle: 'Database Management',
    description: 'CQ practice for DBMS, tables, keys, relationships, queries, SQL, sorting, and security.',
  },
];

export const questionBankBoardYears: QuestionBankBoardYearCard[] = [
  {
    boardYearSlug: 'dhaka-board-2025',
    boardName: 'Dhaka Board',
    year: 2025,
    title: 'Dhaka Board ICT Question 2025',
    description: 'Board-wise MCQ and CQ practice from Dhaka Education Board HSC ICT Question 2025.',
    defaultChapterSlug: 'chapter-3-number-system',
  },
  {
    boardYearSlug: 'rajshahi-board-2024',
    boardName: 'Rajshahi Board',
    year: 2024,
    title: 'Rajshahi Board ICT Question 2024',
    description: 'Board-wise MCQ practice and original-style HSC ICT questions for Rajshahi Board students.',
    defaultChapterSlug: 'chapter-3-number-system',
  },
  {
    boardYearSlug: 'chattogram-board-2024',
    boardName: 'Chattogram Board',
    year: 2024,
    title: 'Chattogram Board ICT Question 2024',
    description: 'HSC ICT Board Question 2024 with board-wise MCQ preparation for Chattogram Board.',
    defaultChapterSlug: 'chapter-4-web-design-html',
  },
  {
    boardYearSlug: 'cumilla-board-2024',
    boardName: 'Cumilla Board',
    year: 2024,
    title: 'Cumilla Board ICT Question 2024',
    description: 'Board-wise MCQ set for Cumilla Education Board HSC ICT exam preparation.',
    defaultChapterSlug: 'chapter-4-web-design-html',
  },
  {
    boardYearSlug: 'sylhet-board-2023',
    boardName: 'Sylhet Board',
    year: 2023,
    title: 'Sylhet Board ICT Question 2023',
    description: 'HSC ICT Board-wise MCQ and CQ pattern practice from Sylhet Board question archives.',
    defaultChapterSlug: 'chapter-3-number-system',
  },
  {
    boardYearSlug: 'barishal-board-2023',
    boardName: 'Barishal Board',
    year: 2023,
    title: 'Barishal Board ICT Question 2023',
    description: 'Board-wise MCQ preparation for HSC ICT students following Barishal Education Board.',
    defaultChapterSlug: 'chapter-6-database-management',
  },
];

export const getBoardQuestionBySlugs = (boardYearSlug = '', chapterSlug = ''): BoardQuestionPage | null => {
  const boardSet = boardQuestions.find(item => item.boardYearSlug === boardYearSlug);
  const chapter = boardSet?.chapters.find(item => item.slug === chapterSlug);

  if (boardSet && chapter) {
    return {
      boardYearSlug: boardSet.boardYearSlug,
      chapterSlug: chapter.slug,
      boardName: boardSet.boardName,
      boardFullName: boardSet.boardFullName,
      year: boardSet.year,
      examName: boardSet.examName,
      subject: boardSet.subject,
      allChaptersPdfUrl: boardSet.allChaptersPdfUrl,
      pdfUrl: chapter.pdfUrl || buildPdfUrl(boardSet.boardYearSlug, chapter.slug),
      videoSolutionUrl: chapter.videoSolutionUrl || buildVideoSolutionUrl(boardSet.boardYearSlug, chapter.slug),
      originalSource: boardSet.originalSource,
      lastUpdated: boardSet.lastUpdated,
      chapterName: chapter.chapterName,
      chapterNumber: chapter.chapterNumber,
      cqCount: chapter.cqCount,
      mcqCount: chapter.mcqCount,
      previewPages: chapter.previewPages,
    };
  }

  const boardMatch = boardYearSlug.match(/^(.+?)-board-(20\d{2})$/i);
  const chapterMatch = chapterSlug.match(/^chapter-(\d+)-(.+)$/i);
  if (!boardMatch || !chapterMatch) return null;

  const boardName = boardDisplayName(boardMatch[1]);
  const year = Number(boardMatch[2]);
  const chapterName = chapterDisplayName(chapterSlug);

  return {
    boardYearSlug,
    chapterSlug,
    boardName,
    boardFullName: `${boardName.replace(/\s+Board$/i, '')} Education Board`,
    year,
    examName: `HSC Exam ${year}`,
    subject: 'ICT',
    allChaptersPdfUrl: `/board-questions/${boardYearSlug}/all-chapters-mega-pdf.pdf`,
    pdfUrl: buildPdfUrl(boardYearSlug, chapterSlug),
    videoSolutionUrl: buildVideoSolutionUrl(boardYearSlug, chapterSlug),
    originalSource: `Original ${boardName} chapter-wise question for HSC ICT students in Bangladesh.`,
    lastUpdated: new Date().toISOString().slice(0, 10),
    chapterName,
    chapterNumber: chapterNumberFromSlug(chapterSlug),
    cqCount: 2,
    mcqCount: 10,
    previewPages: buildFallbackPreviewPages(boardName, year, chapterName),
  };
};
