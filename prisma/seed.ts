import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
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
