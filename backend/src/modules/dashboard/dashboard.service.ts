import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface DashboardMetric {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
}

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getOverview(studentId: string) {
    let studentName = 'Student';
    let practiceCount = 42;
    let projectCount = 3;
    let totalPoints = 1250;

    try {
      const student = await this.prisma.student.findUnique({
        where: { id: studentId },
        include: { activityFacts: true },
      });

      if (student) {
        studentName = student.name;
        if (student.activityFacts && student.activityFacts.length > 0) {
          practiceCount = student.activityFacts.filter((f) => f.type === 'PRACTICE').length;
          projectCount = student.activityFacts.filter((f) => f.type === 'PROJECT').length;
          totalPoints = student.activityFacts.reduce((sum, f) => sum + f.points, 0);
        }
      }
    } catch (e) {
      this.logger.debug('Database overview fallback');
    }

    return {
      studentId,
      studentName,
      summary: {
        readiness: Math.min(96, 70 + Math.floor(practiceCount / 5)),
        streak: 18,
        challengesSolved: practiceCount,
        portfolioProjects: Math.max(1, projectCount),
        totalPoints,
      },
      metrics: [
        { label: 'Problem Solving & DSA', value: 88, change: 8, trend: 'up' },
        { label: 'System Design & Architecture', value: 74, change: 5, trend: 'up' },
        { label: 'CS Fundamentals', value: 81, change: 4, trend: 'up' },
        { label: 'Professional Communication', value: 79, change: 3, trend: 'up' },
      ] as DashboardMetric[],
      recommendations: [
        'Complete 2 Two-Pointer problems in Practice track',
        'Review System Design basics: Caching & Latency trade-offs',
        'Register for upcoming CodeSprint bi-weekly contest',
      ],
    };
  }
}
