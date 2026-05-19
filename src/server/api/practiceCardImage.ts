import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { getPublicPracticeResult } from '../publicPracticeShareAccess.js';

const cleanString = (value: unknown) => String(value || '').trim();

const queryValue = (req: any, key: string) => {
  const value = req.query?.[key];
  if (Array.isArray(value)) return cleanString(value[0]);
  return cleanString(value);
};

const escapeXml = (value: unknown) =>
  cleanString(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('') || 'IT';

const fontPath = (fileName: string) => fileURLToPath(new URL(`../assets/${fileName}`, import.meta.url));

const fonts = {
  regular: { family: 'Hind Siliguri', file: fontPath('HindSiliguri-Regular.ttf') },
  bold: { family: 'Hind Siliguri SemiBold', file: fontPath('HindSiliguri-SemiBold.ttf') },
  extraBold: { family: 'Hind Siliguri Bold', file: fontPath('HindSiliguri-Bold.ttf') },
  black: { family: 'Hind Siliguri Bold', file: fontPath('HindSiliguri-Bold.ttf') },
} as const;

type FontWeight = keyof typeof fonts;

type TextLayerOptions = {
  text: string;
  left: number;
  top: number;
  width: number;
  height: number;
  fontSize: number;
  color: string;
  weight?: FontWeight;
  align?: 'left' | 'center' | 'right';
};

const renderTextLayer = async ({
  text,
  left,
  top,
  width,
  height,
  fontSize,
  color,
  weight = 'regular',
  align = 'left',
}: TextLayerOptions) => {
  const font = fonts[weight];
  const input = await sharp({
    text: {
      text: `<span font="${font.family} ${fontSize}" foreground="${color}">${escapeXml(text)}</span>`,
      font: `${font.family} ${fontSize}`,
      fontfile: font.file,
      width,
      height,
      align,
      rgba: true,
    },
  })
    .png()
    .toBuffer();

  return { input, left: Math.round(left), top: Math.round(top) };
};

const textChars = (value: string) => Array.from(value);

const shortText = (value: string, maxLength: number) => {
  const chars = textChars(value);
  return chars.length > maxLength ? `${chars.slice(0, Math.max(0, maxLength - 3)).join('').trim()}...` : value;
};

const wrapTextLines = (value: string, maxLength: number, maxLines: number) => {
  const words = cleanString(value).split(/\s+/).filter(Boolean);
  const lines: string[] = [];

  words.forEach(word => {
    const safeWord = textChars(word).length > maxLength ? shortText(word, maxLength) : word;
    const currentLine = lines[lines.length - 1];
    if (!currentLine) {
      lines.push(safeWord);
      return;
    }

    if (textChars(`${currentLine} ${safeWord}`).length <= maxLength) {
      lines[lines.length - 1] = `${currentLine} ${safeWord}`;
      return;
    }

    lines.push(safeWord);
  });

  if (!lines.length) {
    return ['ICT Student'];
  }

  if (lines.length <= maxLines) {
    return lines;
  }

  const visible = lines.slice(0, maxLines);
  visible[maxLines - 1] = shortText(lines.slice(maxLines - 1).join(' '), maxLength);
  return visible;
};

const readAvatarDataUri = async (src: string | null) => {
  if (!src) return '';

  try {
    const sourceBuffer = src.startsWith('data:image/')
      ? Buffer.from(src.slice(src.indexOf(',') + 1), 'base64')
      : Buffer.from(await (await fetch(src)).arrayBuffer());
    const avatarPng = await sharp(sourceBuffer)
      .resize(220, 220, { fit: 'cover' })
      .png()
      .toBuffer();
    return `data:image/png;base64,${avatarPng.toString('base64')}`;
  } catch {
    return '';
  }
};

const createPracticeBackgroundSvg = (
  result: NonNullable<Awaited<ReturnType<typeof getPublicPracticeResult>>>,
  avatarDataUri: string,
) => {
  const scoreRatio = result.total ? Math.max(0, Math.min(1, result.score / result.total)) : 0;
  const scoreBarWidth = Math.round(scoreRatio * 364);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1080" y2="1080" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#06101f"/>
      <stop offset="0.52" stop-color="#111827"/>
      <stop offset="1" stop-color="#172033"/>
    </linearGradient>
    <linearGradient id="score" x1="118" y1="740" x2="430" y2="850" gradientUnits="userSpaceOnUse">
      <stop stop-color="#34d399"/>
      <stop offset="1" stop-color="#38bdf8"/>
    </linearGradient>
    <linearGradient id="panel" x1="86" y1="194" x2="994" y2="910" gradientUnits="userSpaceOnUse">
      <stop stop-color="#ffffff" stop-opacity="0.105"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.055"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="26" flood-color="#020617" flood-opacity="0.36"/>
    </filter>
    <clipPath id="avatarClip">
      <circle cx="180" cy="309" r="78"/>
    </clipPath>
  </defs>
  <rect width="1080" height="1080" fill="url(#bg)"/>
  <circle cx="986" cy="78" r="280" fill="#0ea5e9" opacity="0.12"/>
  <circle cx="64" cy="1020" r="300" fill="#10b981" opacity="0.11"/>
  <path d="M54 164C220 98 383 109 512 198C650 294 802 290 1026 214V1026H54V164Z" fill="#0f766e" opacity="0.09"/>
  <rect x="54" y="54" width="972" height="972" rx="46" fill="#ffffff" opacity="0.055" stroke="#7dd3fc" stroke-opacity="0.18" stroke-width="2" filter="url(#shadow)"/>

  <rect x="797" y="96" width="178" height="52" rx="26" fill="#0f172a" opacity="0.58" stroke="#7dd3fc" stroke-opacity="0.18"/>

  <rect x="86" y="194" width="908" height="230" rx="36" fill="url(#panel)" stroke="#94a3b8" stroke-opacity="0.18" stroke-width="2"/>
  <circle cx="180" cy="309" r="88" fill="#0f766e" opacity="0.26"/>
  <circle cx="180" cy="309" r="78" fill="#0f172a" stroke="#5eead4" stroke-width="4"/>
  ${avatarDataUri
    ? `<image href="${avatarDataUri}" x="102" y="231" width="156" height="156" preserveAspectRatio="xMidYMid slice" clip-path="url(#avatarClip)"/>`
    : ''}

  <rect x="86" y="454" width="908" height="190" rx="36" fill="url(#panel)" stroke="#94a3b8" stroke-opacity="0.18" stroke-width="2"/>

  <rect x="86" y="674" width="908" height="236" rx="36" fill="url(#panel)" stroke="#94a3b8" stroke-opacity="0.2" stroke-width="2"/>
  <rect x="122" y="866" width="364" height="14" rx="7" fill="#1e293b"/>
  <rect x="122" y="866" width="${scoreBarWidth}" height="14" rx="7" fill="#34d399"/>

  <rect x="532" y="724" width="136" height="132" rx="26" fill="#10b981" opacity="0.16" stroke="#34d399" stroke-opacity="0.18"/>

  <rect x="696" y="724" width="136" height="132" rx="26" fill="#fb7185" opacity="0.16" stroke="#fb7185" stroke-opacity="0.18"/>

  <rect x="860" y="724" width="104" height="132" rx="26" fill="#38bdf8" opacity="0.16" stroke="#38bdf8" stroke-opacity="0.18"/>

  <rect x="86" y="936" width="908" height="72" rx="28" fill="#ffffff" opacity="0.05" stroke="#94a3b8" stroke-opacity="0.14" stroke-width="2"/>
</svg>`;
};

const createPracticePng = async (result: NonNullable<Awaited<ReturnType<typeof getPublicPracticeResult>>>) => {
  const avatarDataUri = await readAvatarDataUri(result.profileImage);
  const nameLines = wrapTextLines(result.name || 'ICT Student', 25, 2);
  const chapterLines = wrapTextLines(result.chapterTitle || 'ICT Chapter', 38, 2);
  const topicLines = wrapTextLines(result.topicTitle || 'ICT Topic', 34, 2);
  const chapterStartTop = 326 + Math.max(0, nameLines.length - 1) * 34;
  const backgroundSvg = createPracticeBackgroundSvg(result, avatarDataUri);

  const textLayers: TextLayerOptions[] = [
    { text: 'ICT Toppers', left: 86, top: 74, width: 500, height: 72, fontSize: 48, color: '#ffffff', weight: 'black' },
    { text: 'Daily Topic Practice Result', left: 86, top: 144, width: 520, height: 34, fontSize: 19, color: '#93c5fd', weight: 'black' },
    { text: 'TOPIC EXAM', left: 797, top: 110, width: 178, height: 28, fontSize: 17, color: '#bfdbfe', weight: 'black', align: 'center' },
    { text: 'STUDENT', left: 292, top: 230, width: 180, height: 28, fontSize: 17, color: '#93c5fd', weight: 'black' },
    ...nameLines.map((text, index) => ({
      text,
      left: 292,
      top: 264 + index * 40,
      width: 630,
      height: 48,
      fontSize: 34,
      color: '#ffffff',
      weight: 'black' as const,
    })),
    ...chapterLines.map((text, index) => ({
      text,
      left: 292,
      top: chapterStartTop + index * 34,
      width: 610,
      height: 38,
      fontSize: 12,
      color: '#cbd5e1',
      weight: 'black' as const,
    })),
    { text: 'TOPIC', left: 122, top: 488, width: 180, height: 30, fontSize: 20, color: '#a5b4fc', weight: 'black' },
    ...topicLines.map((text, index) => ({
      text,
      left: 122,
      top: 530 + index * 50,
      width: 820,
      height: 48,
      fontSize: 18,
      color: '#ffffff',
      weight: 'black' as const,
    })),
    { text: 'SCORE', left: 122, top: 708, width: 180, height: 34, fontSize: 22, color: '#94a3b8', weight: 'black' },
    { text: `${result.score}/${result.total}`, left: 122, top: 744, width: 370, height: 112, fontSize: 104, color: '#37d8cf', weight: 'black' },
    { text: 'CORRECT', left: 532, top: 746, width: 136, height: 30, fontSize: 16, color: '#a7f3d0', weight: 'black', align: 'center' },
    { text: String(result.correctCount), left: 532, top: 786, width: 136, height: 62, fontSize: 46, color: '#34d399', weight: 'black', align: 'center' },
    { text: 'WRONG', left: 696, top: 746, width: 136, height: 30, fontSize: 16, color: '#fecdd3', weight: 'black', align: 'center' },
    { text: String(result.wrongCount), left: 696, top: 786, width: 136, height: 62, fontSize: 46, color: '#fb7185', weight: 'black', align: 'center' },
    { text: 'ACCURACY', left: 860, top: 748, width: 104, height: 26, fontSize: 13, color: '#bae6fd', weight: 'black', align: 'center' },
    { text: `${result.accuracy}%`, left: 860, top: 788, width: 104, height: 58, fontSize: 34, color: '#38bdf8', weight: 'black', align: 'center' },
    { text: `Wrong ${result.wrongPercent}%`, left: 122, top: 956, width: 240, height: 38, fontSize: 25, color: '#fbbf24', weight: 'black' },
    { text: 'www.icttoppers.com', left: 614, top: 959, width: 344, height: 36, fontSize: 22, color: '#e0f2fe', weight: 'black', align: 'right' },
  ];

  if (!avatarDataUri) {
    textLayers.push({
      text: initials(result.name),
      left: 102,
      top: 284,
      width: 156,
      height: 70,
      fontSize: 54,
      color: '#ccfbf1',
      weight: 'black',
      align: 'center',
    });
  }

  const composites = await Promise.all(textLayers.map(renderTextLayer));
  return sharp(Buffer.from(backgroundSvg)).png().composite(composites).toBuffer();
};

export default async function practiceCardImage(req: any, res: any) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return res.status(405).json({ success: false, error: 'Method not allowed.' });
    }

    const result = await getPublicPracticeResult(queryValue(req, 'attemptId'));
    if (!result) {
      return res.status(404).json({ success: false, error: 'Practice result not found.' });
    }

    const png = await createPracticePng(result);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
    return res.status(200).end(png);
  } catch (error) {
    console.error('practiceCardImage error:', error);
    return res.status(500).json({ success: false, error: 'Practice card image failed.' });
  }
}
