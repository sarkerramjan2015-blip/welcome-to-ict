import { requireAdmin, verifyRequest } from '../src/server/firebaseAdminAccess.js';

const json = (res: any, status: number, payload: Record<string, unknown>) => {
  res.status(status).json(payload);
};

export default async function adminAuth(req: any, res: any) {
  try {
    if (!['GET', 'POST'].includes(req.method)) {
      res.setHeader('Allow', 'GET, POST');
      return json(res, 405, { success: false, error: 'Method not allowed.' });
    }

    const decoded = await verifyRequest(req);
    const admin = await requireAdmin(decoded);

    return json(res, 200, {
      success: true,
      admin: true,
      user: admin,
    });
  } catch (error: any) {
    console.error('adminAuth error:', error);
    return json(res, error?.status || 500, {
      success: false,
      admin: false,
      error: error?.message || 'Admin verification failed.',
    });
  }
}
