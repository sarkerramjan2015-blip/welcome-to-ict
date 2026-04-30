import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const upcomingChallenges = [
    {
      id: 'quiz-2026-05-15-number-systems',
      title: 'Number Systems',
      month: 'May',
      year: 2026,
      fee: 20,
      startsAt: new Date('2026-05-15T21:00:00+06:00'),
      endsAt: new Date('2026-05-15T21:30:00+06:00'),
      totalMarks: 30,
      durationMinutes: 30,
      status: 'LIVE',
      syllabus: [
        'History of Number Systems',
        'Number System Conversions',
        'Binary & Number System Addition',
      ],
    },
    {
      id: 'quiz-2026-05-30-digital-codes',
      title: 'Digital Codes',
      month: 'May',
      year: 2026,
      fee: 20,
      startsAt: new Date('2026-05-30T21:00:00+06:00'),
      endsAt: new Date('2026-05-30T21:30:00+06:00'),
      totalMarks: 30,
      durationMinutes: 30,
      status: 'LIVE',
      syllabus: [
        "1's and 2's Complement",
        'Computer Codes: BCD, ASCII, EBCDIC, Unicode, etc.',
      ],
    },
    {
      id: 'quiz-2026-06-15-digital-logic',
      title: 'Digital Logic',
      month: 'June',
      year: 2026,
      fee: 20,
      startsAt: new Date('2026-06-15T21:00:00+06:00'),
      endsAt: new Date('2026-06-15T21:30:00+06:00'),
      totalMarks: 30,
      durationMinutes: 30,
      status: 'LIVE',
      syllabus: [
        'Boolean Algebra',
        'Truth Table',
        'Basic Logic Gates',
      ],
    },
  ];
  
  try {
    // Upsert Category
    const hscCategory = await prisma.category.upsert({
      where: { slug: 'hsc-ict' },
      update: {},
      create: {
        name: 'HSC ICT',
        slug: 'hsc-ict',
        isActive: true,
      },
    });

    // Upsert Version
    const banglaVersion = await prisma.version.upsert({
      where: { slug: 'hsc-ict-bangla' },
      update: {},
      create: {
        name: 'Bangla Version',
        slug: 'hsc-ict-bangla',
        isActive: true,
        categoryId: hscCategory.id,
      },
    });

    // Upsert Chapter
    const chapter1 = await prisma.chapter.upsert({
      where: { slug: 'hsc-ict-chap-1' },
      update: {},
      create: {
        title: 'Information and Communication Technology: World and Bangladesh Perspective',
        slug: 'hsc-ict-chap-1',
        order: 1,
        versionId: banglaVersion.id,
      },
    });

    await Promise.all(
      upcomingChallenges.map((challenge) =>
        prisma.challenge.upsert({
          where: { id: challenge.id },
          update: {
            title: challenge.title,
            month: challenge.month,
            year: challenge.year,
            fee: challenge.fee,
            startsAt: challenge.startsAt,
            endsAt: challenge.endsAt,
            totalMarks: challenge.totalMarks,
            durationMinutes: challenge.durationMinutes,
            status: challenge.status,
            syllabus: JSON.stringify(challenge.syllabus),
          },
          create: {
            id: challenge.id,
            title: challenge.title,
            month: challenge.month,
            year: challenge.year,
            fee: challenge.fee,
            startsAt: challenge.startsAt,
            endsAt: challenge.endsAt,
            totalMarks: challenge.totalMarks,
            durationMinutes: challenge.durationMinutes,
            status: challenge.status,
            syllabus: JSON.stringify(challenge.syllabus),
          },
        })
      )
    );

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Seeding failed. Ensure DATABASE_URL is set correctly in .env');
    console.error(error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
