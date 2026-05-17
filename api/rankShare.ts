import { getPublicRankResult } from '../src/server/publicLeaderboardAccess.js';
import practiceShareHandler from '../src/server/api/practiceShare.js';

const cleanString = (value: unknown) => String(value || '').trim();

const queryValue = (req: any, key: string) => {
  const value = req.query?.[key];
  if (Array.isArray(value)) return cleanString(value[0]);
  return cleanString(value);
};

const escapeHtml = (value: unknown) =>
  cleanString(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const requestOrigin = (req: any) => {
  const host = cleanString(req.headers?.['x-forwarded-host'] || req.headers?.host) || 'www.icttoppers.com';
  const proto = cleanString(req.headers?.['x-forwarded-proto']) || 'https';
  return `${proto}://${host}`;
};

export default async function rankShare(req: any, res: any) {
  const gatewayRoute = Array.isArray(req.query?.route) ? req.query.route[0] : req.query?.route;
  if (gatewayRoute === 'practiceShare') return practiceShareHandler(req, res);

  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return res.status(405).send('Method not allowed.');
    }

    const rank = await getPublicRankResult(queryValue(req, 'challengeId'), queryValue(req, 'uid'));
    const origin = requestOrigin(req);
    const destination = `${origin}/monthly-quiz`;

    if (!rank) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(404).send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex">
  <meta http-equiv="refresh" content="1;url=${destination}">
  <title>ICT Toppers Leaderboard</title>
</head>
<body>Published rank result was not found.</body>
</html>`);
    }

    const shareUrl = `${origin}/api/rankShare?challengeId=${encodeURIComponent(rank.challengeId)}&uid=${encodeURIComponent(rank.userId)}`;
    const imageUrl = `${origin}/api/rankCardImage?challengeId=${encodeURIComponent(rank.challengeId)}&uid=${encodeURIComponent(rank.userId)}&v=${encodeURIComponent(rank.publishedAt || String(rank.rank))}`;
    const title = `${rank.name} ranked #${rank.rank} on ICT Toppers`;
    const description = `${rank.challengeTitle} score: ${rank.score}/${rank.total}.`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
    return res.status(200).send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(shareUrl)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(imageUrl)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(imageUrl)}">
  <meta http-equiv="refresh" content="1;url=${destination}">
</head>
<body style="margin:0;background:#0f172a;color:#fff;font-family:Arial,sans-serif;display:grid;min-height:100vh;place-items:center;text-align:center">
  <main>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(description)}</p>
    <p><a href="${destination}" style="color:#38bdf8">Open ICT Toppers</a></p>
  </main>
</body>
</html>`);
  } catch (error) {
    console.error('rankShare error:', error);
    return res.status(500).send('Rank share failed.');
  }
}
