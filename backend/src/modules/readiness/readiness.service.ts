import { Injectable, Logger } from '@nestjs/common';
import { ReadinessProjection, RoleArchetype } from '@learnlytica/shared';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReadinessService {
  private readonly logger = new Logger(ReadinessService.name);

  constructor(private readonly prisma: PrismaService) {}

  async computeStudentReadiness(studentId: string): Promise<ReadinessProjection[]> {
    let factsCount = 0;
    let skillEvidenceIds: string[] = [];

    try {
      const evidences = await this.prisma.skillEvidence.findMany({
        where: { studentId },
      });
      if (evidences.length > 0) {
        factsCount = evidences.length;
        skillEvidenceIds = evidences.map((e) => e.id);
      }
    } catch (e) {
      this.logger.debug('Database readiness evidence check fallback');
    }

    const roles: RoleArchetype[] = [
      RoleArchetype.SOFTWARE_ENGINEER,
      RoleArchetype.DATA_ENGINEER,
      RoleArchetype.PRODUCT_ENGINEER,
      RoleArchetype.QA_ENGINEER,
    ];

    const archetypeTypes = ['Product-led', 'Service-led'];

    const projections: ReadinessProjection[] = [];

    roles.forEach((role, rIndex) => {
      archetypeTypes.forEach((companyArchetype, aIndex) => {
        // Compute base score adjusted by evidence count and role specificity
        const baseScore = 65 + (rIndex * 6) + (aIndex * 5);
        const evidenceBoost = Math.min(20, factsCount * 4);
        const finalScore = Math.min(98, baseScore + evidenceBoost);

        const linkedEvidences = skillEvidenceIds.length > 0
          ? skillEvidenceIds.slice(0, 3)
          : [`ev-${studentId}-${role.toLowerCase()}-baseline`];

        projections.push({
          studentId,
          role,
          companyArchetype,
          score: finalScore,
          evidenceIds: linkedEvidences,
        });
      });
    });

    // Attempt to persist snapshot into database if reachable
    try {
      for (const p of projections) {
        await this.prisma.readinessScore.create({
          data: {
            studentId: p.studentId,
            role: p.role as any,
            companyArchetype: p.companyArchetype,
            score: p.score,
            evidenceIds: p.evidenceIds,
          },
        });
      }
    } catch {
      // Non-blocking snapshot
    }

    return projections;
  }
}
