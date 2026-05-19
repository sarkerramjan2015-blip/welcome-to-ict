import { getPublicPracticeResult } from '../publicPracticeShareAccess.js';

const cleanString = (value: unknown) => String(value || '').trim();
const PRACTICE_CARD_LAYOUT_VERSION = 'square-v5';

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

export default async function practiceShare(req: any, res: any) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return res.status(405).send('Method not allowed.');
    }

    const result = await getPublicPracticeResult(queryValue(req, 'attemptId'));
    const origin = requestOrigin(req);
    const fallbackDestination = `${origin}/mcq-practice`;

    if (!result) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(404).send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex">
  <meta http-equiv="refresh" content="1;url=${fallbackDestination}">
  <title>ICT Toppers Practice Result</title>
</head>
<body>Practice result was not found.</body>
</html>`);
    }

    const destination = `${origin}/topics/${encodeURIComponent(result.topicId)}#quiz`;
    const shareUrl = `${origin}/api/practiceShare?attemptId=${encodeURIComponent(result.attemptId)}`;
    const imageVersion = `${result.completedAt || String(result.score)}-${PRACTICE_CARD_LAYOUT_VERSION}`;
    const imageUrl = `${origin}/api/practiceCardImage?attemptId=${encodeURIComponent(result.attemptId)}&v=${encodeURIComponent(imageVersion)}`;
    const title = `${result.name} completed ${result.topicTitle}`;
    const description = `Score ${result.score}/${result.total}. Accuracy ${result.accuracy}%. Correct ${result.correctCount}, wrong ${result.wrongCount}.`;

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
  <meta property="og:image:width" content="1080">
  <meta property="og:image:height" content="1080">
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
    console.error('practiceShare error:', error);
    return res.status(500).send('Practice share failed.');
  }
}
