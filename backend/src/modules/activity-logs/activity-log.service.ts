import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateActivityLogDto } from './activity-log.dto';

export interface ActivityLogEntry {
  id: string;
  studentId: string;
  type: 'practice' | 'project' | 'assessment' | 'learning' | 'competition';
  skill: string;
  title: string;
  points: number;
  confidence?: number;
  createdAt: string;
}

@Injectable()
export class ActivityLogService {
  private readonly logger = new Logger(ActivityLogService.name);

  private entriesMemory: ActivityLogEntry[] = [
    {
      id: 'activity-1',
      studentId: 'student-101',
      type: 'practice',
      skill: 'DSA',
      title: 'Solved 2 arrays problems',
      points: 120,
      confidence: 0.85,
      createdAt: '2026-09-01T09:00:00.000Z',
    },
    {
      id: 'activity-2',
      studentId: 'student-101',
      type: 'project',
      skill: 'Backend',
      title: 'Built REST API sprint',
      points: 240,
      confidence: 0.9,
      createdAt: '2026-09-03T11:30:00.000Z',
    },
    {
      id: 'activity-3',
      studentId: 'student-202',
      type: 'assessment',
      skill: 'Analytics',
      title: 'Performance review completed',
      points: 180,
      confidence: 0.78,
      createdAt: '2026-09-05T16:00:00.000Z',
    },
  ];

  constructor(private readonly prisma: PrismaService) {}

  async findByStudent(studentId: string): Promise<ActivityLogEntry[]> {
    try {
      const records = await this.prisma.activityFact.findMany({
        where: { studentId },
        include: { evidence: true },
        orderBy: { createdAt: 'desc' },
      });

      if (records.length > 0) {
        return records.map((fact) => ({
          id: fact.id,
          studentId: fact.studentId,
          type: fact.type.toLowerCase() as any,
          skill: fact.skill,
          title: fact.title,
          points: fact.points,
          confidence: fact.evidence?.[0]?.confidence ?? 0.8,
          createdAt: fact.createdAt.toISOString(),
        }));
      }
    } catch (e) {
      this.logger.debug('Database read fallback to memory');
    }

    return this.entriesMemory.filter((entry) => entry.studentId === studentId);
  }

  async create(dto: CreateActivityLogDto): Promise<ActivityLogEntry> {
    const defaultConfidence = dto.confidence ?? (dto.type === 'project' ? 0.9 : 0.85);

    try {
      const typeEnum = dto.type.toUpperCase() as any;
      const createdFact = await this.prisma.activityFact.create({
        data: {
          studentId: dto.studentId,
          type: typeEnum,
          skill: dto.skill,
          title: dto.title,
          points: dto.points,
          evidence: {
            create: {
              studentId: dto.studentId,
              skillId: dto.skill.toLowerCase(),
              confidence: defaultConfidence,
              source: typeEnum,
            },
          },
        },
        include: { evidence: true },
      });

      return {
        id: createdFact.id,
        studentId: createdFact.studentId,
        type: dto.type,
        skill: createdFact.skill,
        title: createdFact.title,
        points: createdFact.points,
        confidence: createdFact.evidence?.[0]?.confidence ?? defaultConfidence,
        createdAt: createdFact.createdAt.toISOString(),
      };
    } catch (e) {
      this.logger.warn('Could not persist ActivityFact to database, saving to memory fallback');
    }

    const item: ActivityLogEntry = {
      id: `activity-${Date.now()}`,
      createdAt: new Date().toISOString(),
      confidence: defaultConfidence,
      ...dto,
    };

    this.entriesMemory.unshift(item);
    return item;
  }
}
