import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchManualPayments, type ManualPaymentRecord } from '../../services/manualPayment';
import {
  getSscAccess,
  getSscAttempts,
  getSscCourseIdForChapter,
  getSscCourseIdForPackage,
  getSscIctConfig,
  getSscProgress,
  grantSscAccess,
  markSscAccessPending,
  subscribeSscIctStorage,
} from './storage';
import { isSscIctReviewMode } from './config';

const syncManualPaymentAccess = (userId: string, payments: ManualPaymentRecord[]) => {
  payments
    .filter(payment => payment.userId === userId)
    .forEach(payment => {
      if (payment.courseId === getSscCourseIdForPackage()) {
        if (payment.status === 'approved') grantSscAccess(userId, 'package');
        if (payment.status === 'pending') markSscAccessPending(userId, 'package');
        return;
      }

      if (payment.courseId.startsWith('ssc-ict:chapter:')) {
        const chapterSlug = payment.courseId.replace('ssc-ict:chapter:', '');
        if (payment.status === 'approved') grantSscAccess(userId, 'chapter', chapterSlug);
        if (payment.status === 'pending') markSscAccessPending(userId, 'chapter', chapterSlug);
      }
    });
};

export const useSscIct = () => {
  const { user } = useAuth();
  const userId = user?.id || '';
  const [version, setVersion] = useState(0);
  const [manualPaymentsLoading, setManualPaymentsLoading] = useState(false);

  const refresh = useCallback(() => setVersion(prev => prev + 1), []);

  useEffect(() => subscribeSscIctStorage(refresh), [refresh]);

  useEffect(() => {
    if (!userId) return undefined;
    let cancelled = false;

    const loadPayments = async () => {
      setManualPaymentsLoading(true);
      try {
        const payments = await fetchManualPayments({ userId });
        if (!cancelled) {
          syncManualPaymentAccess(userId, payments);
          refresh();
        }
      } catch {
        // The SSC module keeps a local fallback so the page remains usable if
        // Firebase Admin credentials are not available in local development.
      } finally {
        if (!cancelled) setManualPaymentsLoading(false);
      }
    };

    void loadPayments();
    const interval = window.setInterval(loadPayments, 20000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [refresh, userId]);

  const config = useMemo(() => getSscIctConfig(), [version]);
  const access = useMemo(() => getSscAccess(userId), [userId, version]);
  const progress = useMemo(() => getSscProgress(userId), [userId, version]);
  const attempts = useMemo(() => getSscAttempts(), [version]);

  const hasPackageAccess = Boolean(isSscIctReviewMode || user?.role === 'admin' || access.fullPackage);
  const hasChapterAccess = useCallback((chapterSlug: string) =>
    Boolean(isSscIctReviewMode || user?.role === 'admin' || access.fullPackage || access.chapterSlugs.includes(chapterSlug)),
  [access.chapterSlugs, access.fullPackage, user?.role]);

  const isChapterPending = useCallback((chapterSlug: string) =>
    Boolean(access.pendingPackage || access.pendingChapterSlugs.includes(chapterSlug)),
  [access.pendingChapterSlugs, access.pendingPackage]);

  return {
    user,
    userId,
    config,
    access,
    progress,
    attempts,
    manualPaymentsLoading,
    hasPackageAccess,
    hasChapterAccess,
    isChapterPending,
    refresh,
  };
};
