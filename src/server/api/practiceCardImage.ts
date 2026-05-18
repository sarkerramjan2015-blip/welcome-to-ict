import sharp from 'sharp';
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

const shortText = (value: string, maxLength: number) =>
  value.length > maxLength ? `${value.slice(0, maxLength - 1).trim()}...` : value;

const wrapTextLines = (value: string, maxLength: number, maxLines: number) => {
  const words = cleanString(value).split(/\s+/).filter(Boolean);
  const lines: string[] = [];

  words.forEach(word => {
    const safeWord = word.length > maxLength ? shortText(word, maxLength) : word;
    const currentLine = lines[lines.length - 1];
    if (!currentLine) {
      lines.push(safeWord);
      return;
    }

    if (`${currentLine} ${safeWord}`.length <= maxLength) {
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

const createPracticeSvg = async (result: NonNullable<Awaited<ReturnType<typeof getPublicPracticeResult>>>) => {
  const avatarDataUri = await readAvatarDataUri(result.profileImage);
  const safeInitials = escapeXml(initials(result.name));
  const nameLines = wrapTextLines(shortText(result.name || 'ICT Student', 44), 24, 2).map(escapeXml);
  const chapterLines = wrapTextLines(shortText(result.chapterTitle || 'ICT Chapter', 48), 30, 2).map(escapeXml);
  const topicLines = wrapTextLines(shortText(result.topicTitle || 'ICT Topic', 72), 28, 2).map(escapeXml);
  const chapterStartY = 260 + nameLines.length * 38 + 12;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1080" y2="1080" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#07111f"/>
      <stop offset="0.48" stop-color="#0f172a"/>
      <stop offset="1" stop-color="#111827"/>
    </linearGradient>
    <linearGradient id="score" x1="110" y1="570" x2="420" y2="700" gradientUnits="userSpaceOnUse">
      <stop stop-color="#34d399"/>
      <stop offset="1" stop-color="#38bdf8"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="22" stdDeviation="24" flood-color="#020617" flood-opacity="0.32"/>
    </filter>
    <clipPath id="avatarClip">
      <circle cx="176" cy="270" r="78"/>
    </clipPath>
  </defs>
  <rect width="1080" height="1080" fill="url(#bg)"/>
  <circle cx="968" cy="104" r="252" fill="#0ea5e9" opacity="0.14"/>
  <circle cx="94" cy="1012" r="264" fill="#10b981" opacity="0.12"/>
  <rect x="48" y="48" width="984" height="984" rx="48" fill="white" opacity="0.055" stroke="#7dd3fc" stroke-opacity="0.2" stroke-width="2" filter="url(#shadow)"/>
  <text x="82" y="118" fill="#ffffff" font-family="Arial, sans-serif" font-size="42" font-weight="900">ICT Toppers</text>
  <text x="82" y="154" fill="#93c5fd" font-family="Arial, sans-serif" font-size="20" font-weight="800">Daily Topic Practice Result</text>

  <rect x="82" y="188" width="916" height="188" rx="34" fill="white" opacity="0.065" stroke="#94a3b8" stroke-opacity="0.18" stroke-width="2"/>
  <circle cx="176" cy="270" r="84" fill="#0f766e" opacity="0.28"/>
  <circle cx="176" cy="270" r="78" fill="#0f172a" stroke="#5eead4" stroke-width="4"/>
  ${avatarDataUri
    ? `<image href="${avatarDataUri}" x="98" y="192" width="156" height="156" preserveAspectRatio="xMidYMid slice" clip-path="url(#avatarClip)"/>`
    : `<text x="176" y="288" text-anchor="middle" fill="#ccfbf1" font-family="Arial, sans-serif" font-size="54" font-weight="900">${safeInitials}</text>`}
  ${nameLines.map((line, index) => `<text x="286" y="${260 + index * 38}" fill="#ffffff" font-family="Arial, sans-serif" font-size="34" font-weight="900">${line}</text>`).join('\n  ')}
  ${chapterLines.map((line, index) => `<text x="286" y="${chapterStartY + index * 28}" fill="#cbd5e1" font-family="Arial, sans-serif" font-size="20" font-weight="800">${line}</text>`).join('\n  ')}

  <rect x="82" y="404" width="916" height="418" rx="38" fill="white" opacity="0.075" stroke="#94a3b8" stroke-opacity="0.22" stroke-width="2"/>
  <text x="118" y="452" fill="#a5b4fc" font-family="Arial, sans-serif" font-size="20" font-weight="900">TOPIC</text>
  ${topicLines.map((line, index) => `<text x="118" y="${500 + index * 40}" fill="#ffffff" font-family="Arial, sans-serif" font-size="34" font-weight="900">${line}</text>`).join('\n  ')}
  <text x="118" y="626" fill="#94a3b8" font-family="Arial, sans-serif" font-size="22" font-weight="800">SCORE</text>
  <text x="118" y="724" fill="url(#score)" font-family="Arial, sans-serif" font-size="96" font-weight="900">${result.score}/${result.total}</text>

  <rect x="534" y="598" width="132" height="128" rx="26" fill="#10b981" opacity="0.16"/>
  <text x="600" y="638" text-anchor="middle" fill="#a7f3d0" font-family="Arial, sans-serif" font-size="17" font-weight="900">CORRECT</text>
  <text x="600" y="694" text-anchor="middle" fill="#34d399" font-family="Arial, sans-serif" font-size="44" font-weight="900">${result.correctCount}</text>

  <rect x="684" y="598" width="132" height="128" rx="26" fill="#fb7185" opacity="0.16"/>
  <text x="750" y="638" text-anchor="middle" fill="#fecdd3" font-family="Arial, sans-serif" font-size="17" font-weight="900">WRONG</text>
  <text x="750" y="694" text-anchor="middle" fill="#fb7185" font-family="Arial, sans-serif" font-size="44" font-weight="900">${result.wrongCount}</text>

  <rect x="834" y="598" width="132" height="128" rx="26" fill="#38bdf8" opacity="0.16"/>
  <text x="900" y="638" text-anchor="middle" fill="#bae6fd" font-family="Arial, sans-serif" font-size="17" font-weight="900">ACCURACY</text>
  <text x="900" y="694" text-anchor="middle" fill="#38bdf8" font-family="Arial, sans-serif" font-size="40" font-weight="900">${result.accuracy}%</text>

  <rect x="82" y="858" width="916" height="118" rx="32" fill="white" opacity="0.055" stroke="#94a3b8" stroke-opacity="0.16" stroke-width="2"/>
  <text x="118" y="905" fill="#94a3b8" font-family="Arial, sans-serif" font-size="18" font-weight="900">WRONG RATE</text>
  <text x="118" y="950" fill="#fbbf24" font-family="Arial, sans-serif" font-size="38" font-weight="900">${result.wrongPercent}%</text>
  <text x="962" y="950" text-anchor="end" fill="#e0f2fe" font-family="Arial, sans-serif" font-size="24" font-weight="800">www.icttoppers.com</text>
</svg>`;
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

    const svg = await createPracticeSvg(result);
    const png = await sharp(Buffer.from(svg)).png().toBuffer();

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
    return res.status(200).end(png);
  } catch (error) {
    console.error('practiceCardImage error:', error);
    return res.status(500).json({ success: false, error: 'Practice card image failed.' });
  }
}
