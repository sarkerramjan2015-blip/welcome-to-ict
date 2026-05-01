import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  FileText,
  Loader2,
  MapPin,
  Maximize2,
  Share2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import type { PDFDocumentLoadingTask, PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
import { getBoardQuestionBySlugs } from '../data/boardQuestions';

type PdfState = 'loading' | 'ready' | 'error';
type RenderState = 'idle' | 'rendering' | 'error';
type ShareState = 'idle' | 'copied' | 'shared';
type PdfJsModule = typeof import('pdfjs-dist');

const siteUrl = 'https://icttoppers.com';
let pdfJsModulePromise: Promise<PdfJsModule> | null = null;

const loadPdfJs = () => {
  if (!pdfJsModulePromise) {
    pdfJsModulePromise = import('pdfjs-dist').then(module => {
      module.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
      return module;
    });
  }

  return pdfJsModulePromise;
};

const fetchPdfBytes = async (url: string, signal: AbortSignal) => {
  const response = await fetch(url, {
    cache: 'force-cache',
    signal,
  });

  if (!response.ok) {
    throw new Error(`PDF request failed with status ${response.status}`);
  }

  const buffer = await response.arrayBuffer();

  if (buffer.byteLength === 0) {
    throw new Error('PDF request returned an empty file');
  }

  return new Uint8Array(buffer);
};

const buildTitle = (chapterName: string, boardName: string, year: number) =>
  `${chapterName} - HSC ICT Question ${year} ${boardName} (CQ & MCQ) - Free PDF`;

const buildMetaDescription = (chapterName: string, boardName: string, year: number) =>
  `Download ${chapterName} HSC ICT Question ${year} ${boardName} PDF for free. Get the original board question with CQ & MCQ in a premium interactive viewer for Bangladesh HSC students.`;

const buildFaqs = (chapterName: string, boardName: string, boardFullName: string, year: number) => [
  {
    question: `Where to find ${chapterName} HSC ICT ${boardName} ${year} Question?`,
    answer: `You can read the ${chapterName} question from ${boardName} ${year} HSC ICT on ICT Toppers using the interactive viewer. The page is organized for students under ${boardFullName}, Bangladesh, who want chapter-wise original board questions for exam preparation.`,
  },
  {
    question: `How to download ${chapterName} HSC ICT Board Question PDF?`,
    answer: `Use the Download PDF button in the viewer toolbar to save the ${chapterName} HSC ICT board question. The PDF is prepared for quick revision, CQ practice, and MCQ practice before the HSC Exam ${year} in Bangladesh.`,
  },
  {
    question: `Is this ${chapterName} ${boardName} HSC ICT question free?`,
    answer: `Yes, the chapter-wise board question PDF is provided as a free study resource for Bangladesh HSC ICT students.`,
  },
  {
    question: `Does this page cover CQ and MCQ for ${chapterName}?`,
    answer: `Yes, this page targets both CQ and MCQ search intent for ${chapterName}, ${boardName}, ${boardFullName}, Bangladesh, and HSC ICT board question preparation.`,
  },
];

function PreviewFallback({
  pdfState,
  previewPages,
}: {
  pdfState: PdfState;
  previewPages: { title: string; sections: string[] }[];
}) {
  return (
    <div className="rounded-[1.4rem] border border-red-100 bg-white p-4 shadow-[0_24px_70px_-48px_rgba(185,28,28,0.5)] sm:p-6">
      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-yellow-200 bg-gradient-to-r from-yellow-50 via-white to-red-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-red-600 text-white shadow-lg shadow-red-900/20">
            {pdfState === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileText className="h-5 w-5" />}
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-red-600">PDF Viewer</p>
            <p className="mt-1 text-sm font-bold text-slate-700">
              {pdfState === 'loading' ? 'Preparing your document...' : 'PDF preview fallback active'}
            </p>
          </div>
        </div>
        <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-blue-800">
          Mobile ready
        </span>
      </div>

      <div className="grid gap-5">
        {previewPages.map((page, index) => (
          <article
            key={page.title}
            className="min-h-[380px] rounded-2xl border border-slate-200 bg-gradient-to-b from-white via-yellow-50/40 to-blue-50/50 p-5 shadow-inner md:p-8"
          >
            <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-red-600">Page {index + 1}</p>
            <h2 className="text-2xl font-black leading-tight text-slate-950">{page.title}</h2>
            <ul className="mt-7 space-y-4 text-base font-medium leading-8 text-slate-700">
              {page.sections.map(section => (
                <li key={section} className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  {section}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

function PdfFlipbookViewer({
  pdfUrl,
  previewPages,
}: {
  pdfUrl?: string;
  title: string;
  previewPages: { title: string; sections: string[] }[];
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pageShellRef = useRef<HTMLDivElement | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [pdfState, setPdfState] = useState<PdfState>(pdfUrl ? 'loading' : 'error');
  const [renderState, setRenderState] = useState<RenderState>('idle');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (pdfState !== 'ready') return;

    const target = pageShellRef.current;
    if (!target) return;

    const updateWidth = () => setContainerWidth(target.clientWidth);
    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(target);

    return () => resizeObserver.disconnect();
  }, [pdfState]);

  useEffect(() => {
    if (!pdfUrl) {
      setPdfDoc(null);
      setPdfState('error');
      return;
    }

    let isActive = true;
    const abortController = new AbortController();
    let loadingTask: PDFDocumentLoadingTask | null = null;

    setPdfState('loading');
    setRenderState('idle');
    setPageNumber(1);
    setZoom(1);

    const loadDocument = async () => {
      const pdfjs = await loadPdfJs();

      if (!isActive) return null;

      const data = await fetchPdfBytes(`${pdfUrl}data`, abortController.signal).catch(() =>
        fetchPdfBytes(pdfUrl, abortController.signal)
      );

      if (!isActive) return null;

      loadingTask = pdfjs.getDocument({ data });
      return loadingTask.promise;
    };

    loadDocument()
      .then(document => {
        if (!document) return;
        if (!isActive) return null;

        setPdfDoc(document);
        setPageCount(document.numPages);
        setPdfState('ready');
      })
      .catch(error => {
        if (!isActive) return;
        if ((error as { name?: string }).name === 'AbortError') return;
        setPdfDoc(null);
        setPageCount(0);
        setPdfState('error');
      });

    return () => {
      isActive = false;
      abortController.abort();
      loadingTask?.destroy();
    };
  }, [pdfUrl]);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current || !containerWidth) return;

    let isActive = true;
    let renderTask: RenderTask | null = null;

    const renderPage = async () => {
      setRenderState('rendering');

      try {
        const page = await pdfDoc.getPage(pageNumber);
        if (!isActive || !canvasRef.current) return;

        const baseViewport = page.getViewport({ scale: 1 });
        const availableWidth = Math.max(containerWidth - 28, 260);
        const fitScale = Math.min(availableWidth / baseViewport.width, 1.58);
        const renderScale = fitScale * zoom;
        const viewport = page.getViewport({ scale: renderScale });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) {
          setRenderState('error');
          return;
        }

        const outputScale = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        context.setTransform(outputScale, 0, 0, outputScale, 0, 0);
        context.clearRect(0, 0, viewport.width, viewport.height);

        renderTask = page.render({ canvasContext: context, viewport });
        await renderTask.promise;

        if (isActive) setRenderState('idle');
      } catch (error) {
        if (isActive && (error as { name?: string }).name !== 'RenderingCancelledException') {
          setRenderState('error');
        }
      }
    };

    void renderPage();

    return () => {
      isActive = false;
      renderTask?.cancel();
    };
  }, [containerWidth, pageNumber, pdfDoc, zoom]);

  const goToPreviousPage = () => setPageNumber(current => Math.max(1, current - 1));
  const goToNextPage = () => setPageNumber(current => Math.min(pageCount || 1, current + 1));
  const zoomOut = () => setZoom(current => Math.max(0.78, Number((current - 0.12).toFixed(2))));
  const zoomIn = () => setZoom(current => Math.min(1.46, Number((current + 0.12).toFixed(2))));
  const resetZoom = () => setZoom(1);

  if (pdfState !== 'ready') {
    return <PreviewFallback pdfState={pdfState} previewPages={previewPages} />;
  }

  if (renderState === 'error') {
    return <PreviewFallback pdfState="error" previewPages={previewPages} />;
  }

  return (
    <div className="overflow-hidden rounded-[1.4rem] border border-yellow-200/80 bg-gradient-to-b from-white to-yellow-50/55 shadow-[0_24px_80px_-48px_rgba(29,78,216,0.7)]">
      <div className="flex flex-col gap-3 border-b border-yellow-200/80 bg-white/92 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 via-blue-600 to-red-600 text-white shadow-lg shadow-blue-900/20">
            <FileText className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-red-600">Flipbook</p>
            <p className="text-sm font-black text-slate-900">Page {pageNumber} of {pageCount}</p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:flex">
          <button
            type="button"
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
            aria-label="Previous page"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-800 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40 sm:w-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goToNextPage}
            disabled={pageNumber >= pageCount}
            aria-label="Next page"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-800 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40 sm:w-10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={zoomOut}
            aria-label="Zoom out"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-yellow-200 bg-yellow-50 text-yellow-800 transition hover:bg-yellow-100 sm:w-10"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={resetZoom}
            aria-label="Fit page"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 sm:w-10"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={zoomIn}
            aria-label="Zoom in"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-700 transition hover:bg-red-100 sm:w-10"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div ref={pageShellRef} className="relative max-h-[76vh] min-h-[470px] overflow-auto bg-gradient-to-br from-blue-950 via-slate-950 to-red-950 px-3 py-5 sm:min-h-[560px] sm:px-5 md:max-h-[82vh]">
        <div className="mx-auto flex min-h-full w-full items-start justify-center">
          <canvas
            ref={canvasRef}
            className="rounded-xl bg-white shadow-[0_30px_70px_-38px_rgba(0,0,0,0.75)] ring-1 ring-yellow-200/70"
          />
        </div>

        {renderState === 'rendering' && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 backdrop-blur-[1px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/95 px-4 py-2 text-sm font-black text-blue-900 shadow-xl">
              <Loader2 className="h-4 w-4 animate-spin text-red-600" />
              Rendering page...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BoardQuestionDetails() {
  const { boardYearSlug, chapterSlug } = useParams();
  const questionPage = getBoardQuestionBySlugs(boardYearSlug, chapterSlug);
  const [shareState, setShareState] = useState<ShareState>('idle');

  if (!questionPage) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-center justify-center px-5 text-center">
        <h1 className="text-3xl font-black text-slate-950">Board question not found</h1>
        <p className="mt-3 text-slate-600">The requested HSC ICT chapter-wise board question page is not available yet.</p>
        <Link to="/board-questions" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-red-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950/20 hover:from-blue-600 hover:to-red-500">
          <ArrowLeft className="h-4 w-4" /> Back to Question Bank
        </Link>
      </div>
    );
  }

  const pageTitle = buildTitle(questionPage.chapterName, questionPage.boardName, questionPage.year);
  const metaDescription = buildMetaDescription(questionPage.chapterName, questionPage.boardName, questionPage.year);
  const canonicalUrl = `${siteUrl}/board-questions/${questionPage.boardYearSlug}/${questionPage.chapterSlug}`;
  const faqs = buildFaqs(questionPage.chapterName, questionPage.boardName, questionPage.boardFullName, questionPage.year);

  const handleShare = async () => {
    const sharePayload = {
      title: pageTitle,
      text: metaDescription,
      url: canonicalUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(sharePayload);
        setShareState('shared');
      } else {
        await navigator.clipboard.writeText(canonicalUrl);
        setShareState('copied');
      }
    } catch (error) {
      try {
        await navigator.clipboard.writeText(canonicalUrl);
        setShareState('copied');
      } catch {
        setShareState('idle');
      }
    }

    window.setTimeout(() => setShareState('idle'), 2200);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const learningResourceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: pageTitle,
    description: metaDescription,
    learningResourceType: 'Board question PDF',
    educationalLevel: 'HSC',
    inLanguage: ['en', 'bn'],
    about: ['HSC ICT', questionPage.chapterName, 'Board Questions', 'CQ', 'MCQ', questionPage.boardFullName, 'Bangladesh'],
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
    },
    provider: {
      '@type': 'Organization',
      name: 'ICT Toppers',
      url: siteUrl,
    },
    url: canonicalUrl,
    dateModified: questionPage.lastUpdated,
  };

  const shareLabel = shareState === 'shared' ? 'Shared' : shareState === 'copied' ? 'Copied' : 'Share';

  return (
    <div className="w-full bg-[linear-gradient(135deg,#ffffff_0%,#eff6ff_34%,#fff7cc_67%,#fff_100%)] text-slate-950">
      <Helmet>
        <title>{pageTitle} | ICT Toppers</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${questionPage.chapterName} HSC ICT question ${questionPage.year}, ${questionPage.boardName} ${questionPage.year} HSC ICT chapter question, HSC ICT board question PDF, ${questionPage.boardFullName}, Bangladesh HSC Exam ${questionPage.year}, CQ MCQ ICT`} />
        <meta name="geo.region" content="BD" />
        <meta name="geo.placename" content="Bangladesh" />
        <meta name="ICBM" content="23.6850, 90.3563" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(learningResourceSchema)}</script>
      </Helmet>

      <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 md:py-9">
        <section className="relative overflow-hidden rounded-[1.6rem] border border-white bg-white/90 shadow-[0_28px_90px_-52px_rgba(29,78,216,0.65)] ring-1 ring-blue-950/5 backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-blue-700 via-red-600 to-yellow-300" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent" />
          <div className="p-5 sm:p-7 md:p-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <Link
                  to="/board-questions"
                  className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-black text-blue-800 shadow-sm transition-colors hover:border-blue-200 hover:bg-white"
                >
                  <ArrowLeft className="h-4 w-4" /> Question Bank
                </Link>
                <div className="mt-7 flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-red-600">
                  <span>{questionPage.boardFullName}</span>
                  <span className="text-yellow-500">/</span>
                  <span>{questionPage.examName}</span>
                  <span className="text-yellow-500">/</span>
                  <span>Bangladesh</span>
                </div>
                <h1 className="mt-4 max-w-5xl text-[2rem] font-black leading-[1.08] tracking-normal text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl">
                  {pageTitle}
                </h1>
                <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600 md:text-lg">
                  A clean, distraction-free reader for the original {questionPage.chapterName} question from {questionPage.boardName}. Read CQ and MCQ patterns with a mobile-ready PDF flipbook built for Bangladesh HSC students.
                </p>
              </div>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-red-600 px-5 py-3 text-sm font-black text-white shadow-xl shadow-blue-900/20 transition-all hover:-translate-y-0.5 hover:from-blue-600 hover:to-red-500 sm:w-auto"
              >
                {shareState === 'idle' ? <Share2 className="h-4 w-4" /> : shareState === 'copied' ? <Copy className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                {shareLabel}
              </button>
            </div>

            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-4 shadow-sm">
                <dt className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">Chapter</dt>
                <dd className="mt-2 text-base font-black text-slate-950">{questionPage.chapterName}</dd>
              </div>
              <div className="rounded-2xl border border-red-100 bg-gradient-to-br from-white to-red-50 p-4 shadow-sm">
                <dt className="text-xs font-black uppercase tracking-[0.16em] text-red-600">Format</dt>
                <dd className="mt-2 text-base font-black text-slate-950">{questionPage.cqCount} CQ + {questionPage.mcqCount} MCQ</dd>
              </div>
              <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-white to-yellow-50 p-4 shadow-sm">
                <dt className="flex items-center gap-1 text-xs font-black uppercase tracking-[0.16em] text-yellow-700"><MapPin className="h-3.5 w-3.5" /> Region</dt>
                <dd className="mt-2 text-base font-black text-slate-950">Bangladesh</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-[1.6rem] border border-blue-100 bg-white shadow-[0_30px_100px_-54px_rgba(185,28,28,0.65)]">
          <div className="flex flex-col gap-4 border-b border-white/15 bg-gradient-to-r from-blue-800 via-blue-700 to-red-700 px-4 py-4 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-300 text-blue-950 shadow-lg shadow-yellow-950/10">
                <FileText className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-200">Interactive PDF Flipbook</p>
                <h2 className="mt-1 truncate text-lg font-black text-white">{questionPage.chapterName}</h2>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-black text-white transition-colors hover:bg-white/15"
              >
                <Share2 className="h-4 w-4" /> Share
              </button>
              <a
                href={questionPage.pdfUrl || '#'}
                download
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-300 px-4 py-2.5 text-sm font-black text-blue-950 transition-colors hover:bg-yellow-200"
              >
                <Download className="h-4 w-4" /> Download PDF
              </a>
            </div>
          </div>
          <div className="bg-gradient-to-br from-white via-blue-50 to-yellow-50 p-3 sm:p-5">
            <PdfFlipbookViewer
              pdfUrl={questionPage.pdfUrl}
              title={pageTitle}
              previewPages={questionPage.previewPages}
            />
          </div>
        </section>

        <section className="mt-9 rounded-[1.35rem] border border-yellow-200 bg-white/90 p-5 shadow-[0_24px_80px_-52px_rgba(29,78,216,0.45)] ring-1 ring-blue-950/5 backdrop-blur-xl sm:p-7" aria-labelledby="faq-heading">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">FAQ</p>
            <h2 id="faq-heading" className="mt-2 text-2xl font-black tracking-normal text-slate-950">
              {questionPage.chapterName} Board Question PDF Help
            </h2>
          </div>

          <div className="mt-5 grid gap-3">
            {faqs.map(item => (
              <details key={item.question} className="group rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/45 p-4 shadow-sm">
                <summary className="cursor-pointer list-none text-base font-black text-slate-900 marker:hidden">
                  <span className="inline-flex w-full items-center justify-between gap-4">
                    {item.question}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-300 text-blue-950 transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="mx-auto mt-7 max-w-5xl text-xs leading-6 text-slate-500">
          {questionPage.originalSource} This page is optimized for students searching from Dhaka, Chattogram, Rajshahi, Cumilla, Barishal, Sylhet, Rangpur, Mymensingh, and other regions of Bangladesh.
        </p>
      </main>
    </div>
  );
}
