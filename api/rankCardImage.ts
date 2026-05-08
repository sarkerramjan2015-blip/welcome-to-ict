import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { getPublicRankResult } from '../src/server/publicLeaderboardAccess.js';

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

const readLogoDataUri = async () => {
  try {
    const logoPath = path.join(process.cwd(), 'public', 'logo-256.webp');
    const logoPng = await sharp(await fs.readFile(logoPath)).png().toBuffer();
    return `data:image/png;base64,${logoPng.toString('base64')}`;
  } catch {
    return '';
  }
};

const createRankSvg = async (rank: Awaited<ReturnType<typeof getPublicRankResult>>) => {
  if (!rank) throw new Error('Rank result not found.');

  const logoDataUri = await readLogoDataUri();
  const safeName = escapeXml(rank.name);
  const safeChallenge = escapeXml(rank.challengeTitle);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#0f172a"/>
      <stop offset="0.52" stop-color="#1e1b4b"/>
      <stop offset="1" stop-color="#082f49"/>
    </linearGradient>
    <linearGradient id="rank" x1="120" y1="230" x2="360" y2="450" gradientUnits="userSpaceOnUse">
      <stop stop-color="#fde68a"/>
      <stop offset="1" stop-color="#f59e0b"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="#020617" flood-opacity="0.28"/>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1030" cy="80" r="260" fill="#38bdf8" opacity="0.18"/>
  <circle cx="120" cy="600" r="260" fill="#fbbf24" opacity="0.16"/>
  <rect x="66" y="48" width="1068" height="534" rx="44" fill="white" opacity="0.055" stroke="#7dd3fc" stroke-opacity="0.25" stroke-width="2" filter="url(#shadow)"/>
  ${logoDataUri ? `<image href="${logoDataUri}" x="84" y="64" width="110" height="110" preserveAspectRatio="xMidYMid slice"/>` : '<rect x="84" y="64" width="110" height="110" rx="26" fill="#38bdf8"/>'}
  <text x="222" y="106" fill="#ffffff" font-family="Arial, sans-serif" font-size="48" font-weight="900">ICT Toppers</text>
  <text x="222" y="144" fill="#93c5fd" font-family="Arial, sans-serif" font-size="22" font-weight="800">All Bangladesh Monthly Quiz Leaderboard</text>
  <rect x="86" y="212" width="1028" height="314" rx="38" fill="white" opacity="0.08" stroke="#7dd3fc" stroke-opacity="0.25" stroke-width="2"/>
  <text x="126" y="372" fill="url(#rank)" font-family="Arial, sans-serif" font-size="132" font-weight="900">#${rank.rank}</text>
  <text x="414" y="318" fill="#ffffff" font-family="Arial, sans-serif" font-size="52" font-weight="900">${safeName}</text>
  <text x="414" y="372" fill="#cbd5e1" font-family="Arial, sans-serif" font-size="28" font-weight="800">${safeChallenge}</text>
  <text x="414" y="458" fill="#34d399" font-family="Arial, sans-serif" font-size="60" font-weight="900">${rank.score}/${rank.total}</text>
  <text x="414" y="500" fill="#94a3b8" font-family="Arial, sans-serif" font-size="24" font-weight="800">Score</text>
  <text x="86" y="586" fill="#e0f2fe" font-family="Arial, sans-serif" font-size="24" font-weight="800">www.icttoppers.com</text>
  <text x="1114" y="586" text-anchor="end" fill="#e0f2fe" font-family="Arial, sans-serif" font-size="24" font-weight="800">Shared from Student Dashboard</text>
</svg>`;
};

export default async function rankCardImage(req: any, res: any) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return res.status(405).json({ success: false, error: 'Method not allowed.' });
    }

    const rank = await getPublicRankResult(queryValue(req, 'challengeId'), queryValue(req, 'uid'));
    if (!rank) {
      return res.status(404).json({ success: false, error: 'Published rank result not found.' });
    }

    const svg = await createRankSvg(rank);
    const png = await sharp(Buffer.from(svg)).png().toBuffer();

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
    return res.status(200).end(png);
  } catch (error) {
    console.error('rankCardImage error:', error);
    return res.status(500).json({ success: false, error: 'Rank card image failed.' });
  }
}
