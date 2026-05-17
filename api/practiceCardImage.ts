import sharp from 'sharp';
import { getPublicPracticeResult } from '../src/server/publicPracticeShareAccess.js';

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
  const safeName = escapeXml(shortText(result.name, 30));
  const safeTopic = escapeXml(shortText(result.topicTitle, 44));
  const safeChapter = escapeXml(shortText(result.chapterTitle, 42));
  const safeInitials = escapeXml(initials(result.name));

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#07111f"/>
      <stop offset="0.48" stop-color="#0f172a"/>
      <stop offset="1" stop-color="#111827"/>
    </linearGradient>
    <linearGradient id="score" x1="790" y1="178" x2="1052" y2="356" gradientUnits="userSpaceOnUse">
      <stop stop-color="#34d399"/>
      <stop offset="1" stop-color="#38bdf8"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="22" stdDeviation="24" flood-color="#020617" flood-opacity="0.32"/>
    </filter>
    <clipPath id="avatarClip">
      <circle cx="186" cy="240" r="104"/>
    </clipPath>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1070" cy="88" r="250" fill="#0ea5e9" opacity="0.14"/>
  <circle cx="96" cy="588" r="250" fill="#10b981" opacity="0.12"/>
  <rect x="54" y="42" width="1092" height="546" rx="42" fill="white" opacity="0.055" stroke="#7dd3fc" stroke-opacity="0.2" stroke-width="2" filter="url(#shadow)"/>
  <text x="84" y="104" fill="#ffffff" font-family="Arial, sans-serif" font-size="42" font-weight="900">ICT Toppers</text>
  <text x="84" y="140" fill="#93c5fd" font-family="Arial, sans-serif" font-size="20" font-weight="800">Daily Topic Practice Result</text>

  <circle cx="186" cy="240" r="110" fill="#0f766e" opacity="0.28"/>
  <circle cx="186" cy="240" r="104" fill="#0f172a" stroke="#5eead4" stroke-width="4"/>
  ${avatarDataUri
    ? `<image href="${avatarDataUri}" x="82" y="136" width="208" height="208" preserveAspectRatio="xMidYMid slice" clip-path="url(#avatarClip)"/>`
    : `<text x="186" y="258" text-anchor="middle" fill="#ccfbf1" font-family="Arial, sans-serif" font-size="72" font-weight="900">${safeInitials}</text>`}
  <text x="84" y="400" fill="#ffffff" font-family="Arial, sans-serif" font-size="42" font-weight="900">${safeName}</text>
  <text x="84" y="438" fill="#cbd5e1" font-family="Arial, sans-serif" font-size="22" font-weight="800">${safeChapter}</text>

  <rect x="362" y="166" width="736" height="332" rx="34" fill="white" opacity="0.075" stroke="#94a3b8" stroke-opacity="0.22" stroke-width="2"/>
  <text x="402" y="220" fill="#a5b4fc" font-family="Arial, sans-serif" font-size="20" font-weight="900">TOPIC</text>
  <text x="402" y="264" fill="#ffffff" font-family="Arial, sans-serif" font-size="34" font-weight="900">${safeTopic}</text>
  <text x="402" y="320" fill="#94a3b8" font-family="Arial, sans-serif" font-size="22" font-weight="800">SCORE</text>
  <text x="402" y="394" fill="url(#score)" font-family="Arial, sans-serif" font-size="88" font-weight="900">${result.score}/${result.total}</text>

  <rect x="666" y="314" width="122" height="116" rx="24" fill="#10b981" opacity="0.16"/>
  <text x="727" y="350" text-anchor="middle" fill="#a7f3d0" font-family="Arial, sans-serif" font-size="18" font-weight="900">CORRECT</text>
  <text x="727" y="398" text-anchor="middle" fill="#34d399" font-family="Arial, sans-serif" font-size="42" font-weight="900">${result.correctCount}</text>

  <rect x="804" y="314" width="122" height="116" rx="24" fill="#fb7185" opacity="0.16"/>
  <text x="865" y="350" text-anchor="middle" fill="#fecdd3" font-family="Arial, sans-serif" font-size="18" font-weight="900">WRONG</text>
  <text x="865" y="398" text-anchor="middle" fill="#fb7185" font-family="Arial, sans-serif" font-size="42" font-weight="900">${result.wrongCount}</text>

  <rect x="942" y="314" width="122" height="116" rx="24" fill="#38bdf8" opacity="0.16"/>
  <text x="1003" y="350" text-anchor="middle" fill="#bae6fd" font-family="Arial, sans-serif" font-size="18" font-weight="900">ACCURACY</text>
  <text x="1003" y="398" text-anchor="middle" fill="#38bdf8" font-family="Arial, sans-serif" font-size="42" font-weight="900">${result.accuracy}%</text>

  <text x="84" y="548" fill="#e0f2fe" font-family="Arial, sans-serif" font-size="22" font-weight="800">www.icttoppers.com</text>
  <text x="1116" y="548" text-anchor="end" fill="#e0f2fe" font-family="Arial, sans-serif" font-size="22" font-weight="800">Wrong ${result.wrongPercent}%</text>
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
