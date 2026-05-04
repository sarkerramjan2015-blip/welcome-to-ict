export interface UpcomingChallenge {
  id: string;
  title: string;
  month: string;
  year: number;
  fee: number;
  startsAt: string | null;
  endsAt: string | null;
  syllabus: string[];
  totalMarks: number;
  durationMinutes: number;
  status: string;
}

export const fallbackSyllabus = [
  'Chapter 1: World & Bangladesh Perspectives',
  'Chapter 2: Communication Systems & Networking',
  'Chapter 3: Number Systems & Digital Devices',
];

export const getNextFallbackQuizStart = () => {
  // Set fixed date for 15 May 2026 at 9:00 PM BDT (15:00:00 UTC)
  const fixedDateBdt = new Date('2026-05-15T21:00:00+06:00');
  return fixedDateBdt.toISOString();
};

export const parseScheduleDate = (value: unknown): string | null => {
  if (!value) return null;

  if (typeof value === 'object' && value !== null && 'toDate' in value && typeof (value as { toDate?: unknown }).toDate === 'function') {
    const date = (value as { toDate: () => Date }).toDate();
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

export const parseSyllabus = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map(item => String(item).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map(item => String(item).trim()).filter(Boolean);
      }
    } catch {}

    return value.split(/\r?\n|,/).map(item => item.trim()).filter(Boolean);
  }

  return [];
};

export const normalizeChallenge = (id: string, data: Record<string, any>): UpcomingChallenge | null => {
  const startsAt = parseScheduleDate(data.startsAt);
  const durationMs = Number(data.durationMinutes || 30) * 60 * 1000;
  const endTime = parseScheduleDate(data.endsAt) ? new Date(parseScheduleDate(data.endsAt)).getTime() : (startsAt ? new Date(startsAt).getTime() + durationMs : 0);

  if (!startsAt || endTime < Date.now()) {
    return null;
  }

  const status = String(data.status || 'LIVE').toUpperCase();
  if (!['LIVE', 'PUBLISHED', 'APPROVED'].includes(status)) {
    return null;
  }

  return {
    id,
    title: String(data.title || 'HSC ICT Monthly Quiz Exam').trim(),
    month: String(data.month || new Date(startsAt).toLocaleString('en-US', { month: 'long', timeZone: 'Asia/Dhaka' })),
    year: Number(data.year || new Date(startsAt).getFullYear()),
    fee: Number(data.fee ?? 20),
    startsAt,
    endsAt: parseScheduleDate(data.endsAt),
    syllabus: parseSyllabus(data.syllabus),
    totalMarks: Number(data.totalMarks || data.questionCount || 30),
    durationMinutes: Number(data.durationMinutes || 30),
    status,
  };
};

export const getFallbackChallenge = (): UpcomingChallenge => {
  const startsAt = getNextFallbackQuizStart();
  const startDate = new Date(startsAt);

  return {
    id: 'monthly-quiz',
    title: 'HSC ICT Monthly Quiz Exam',
    month: startDate.toLocaleString('en-US', { month: 'long', timeZone: 'Asia/Dhaka' }),
    year: Number(startDate.toLocaleString('en-US', { year: 'numeric', timeZone: 'Asia/Dhaka' })),
    fee: 20,
    startsAt,
    endsAt: new Date(startDate.getTime() + 30 * 60 * 1000).toISOString(),
    syllabus: fallbackSyllabus,
    totalMarks: 30,
    durationMinutes: 30,
    status: 'PUBLISHED',
  };
};

export const fetchApiChallenges = async (): Promise<UpcomingChallenge[]> => {
  try {
    const response = await fetch('/api/challenges/upcoming');
    if (!response.ok) return [];

    const challenges = await response.json() as UpcomingChallenge[];
    return challenges
      .map(item => normalizeChallenge(item.id, item))
      .filter((item): item is UpcomingChallenge => Boolean(item));
  } catch {
    return [];
  }
};

export const fetchFirestoreChallenges = async (): Promise<UpcomingChallenge[]> => [];

export const fetchUpcomingChallenge = async (): Promise<UpcomingChallenge> => {
  const items = await fetchApiChallenges();
  const byId = new Map<string, UpcomingChallenge>();
  items.forEach(item => byId.set(item.id, item));

  const challenges = Array.from(byId.values()).sort((a, b) => {
    const aTime = a.startsAt ? new Date(a.startsAt).getTime() : Number.MAX_SAFE_INTEGER;
    const bTime = b.startsAt ? new Date(b.startsAt).getTime() : Number.MAX_SAFE_INTEGER;
    return aTime - bTime;
  });
  
  return challenges[0] || getFallbackChallenge();
};
