import { PrismaClient, StudentYear, RoleArchetype, ActivityType, SourceType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample College
  const college = await prisma.college.upsert({
    where: { code: 'NIET-GREATER-NOIDA' },
    update: {},
    create: {
      name: 'Noida Institute of Engineering and Technology',
      code: 'NIET-GREATER-NOIDA',
    },
  });

  console.log(`✓ College created/verified: ${college.name} (${college.code})`);

  // Create sample Student
  const student = await prisma.student.upsert({
    where: { email: 'aarav.sharma@learnlytica.edu' },
    update: {},
    create: {
      id: 'student-101',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@learnlytica.edu',
      collegeId: college.id,
      year: StudentYear.YEAR_2,
      interests: ['DSA', 'System Design', 'Python', 'Backend'],
      goals: ['Get placement-ready', 'Build scalable systems'],
      targetRoles: [RoleArchetype.SOFTWARE_ENGINEER, RoleArchetype.DATA_ENGINEER],
    },
  });

  console.log(`✓ Student created/verified: ${student.name}`);

  // Create sample ActivityFacts
  const fact1 = await prisma.activityFact.create({
    data: {
      studentId: student.id,
      type: ActivityType.PRACTICE,
      skill: 'DSA',
      title: 'Solved Two Sum with optimal Hash Table solution',
      points: 100,
      evidence: {
        create: {
          studentId: student.id,
          skillId: 'dsa',
          confidence: 0.92,
          source: SourceType.PRACTICE,
        },
      },
    },
  });

  const fact2 = await prisma.activityFact.create({
    data: {
      studentId: student.id,
      type: ActivityType.PROJECT,
      skill: 'Backend',
      title: 'Shipped REST API backend with NestJS and Prisma',
      points: 250,
      evidence: {
        create: {
          studentId: student.id,
          skillId: 'backend',
          confidence: 0.88,
          source: SourceType.PROJECT,
        },
      },
    },
  });

  console.log(`✓ Seeded sample activity facts: ${fact1.title}, ${fact2.title}`);
  console.log('🚀 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
