import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { RoleArchetype, StudentProfile, StudentYear } from '@learnlytica/shared';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStudentDto, UpdateStudentDto } from './students.dto';

@Injectable()
export class StudentsService {
  private readonly logger = new Logger(StudentsService.name);

  private studentsMemory: StudentProfile[] = [
    {
      id: 'student-101',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@learnlytica.edu',
      collegeId: 'CSE-2026-101',
      year: StudentYear.YEAR_2,
      interests: ['DSA', 'System Design', 'Python'],
      goals: ['Get placement-ready', 'Build strong backend fundamentals'],
      targetRoles: [RoleArchetype.SOFTWARE_ENGINEER, RoleArchetype.DATA_ENGINEER],
    },
    {
      id: 'student-202',
      name: 'Meera Iyer',
      email: 'meera.iyer@learnlytica.edu',
      collegeId: 'ECE-2026-202',
      year: StudentYear.YEAR_3,
      interests: ['ML', 'Analytics', 'Product'],
      goals: ['Explore product engineering', 'Build portfolio'],
      targetRoles: [RoleArchetype.PRODUCT_ENGINEER],
    },
  ];

  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<StudentProfile[]> {
    try {
      const records = await this.prisma.student.findMany();
      if (records.length > 0) {
        return records.map((r) => this.mapToProfile(r));
      }
    } catch (e) {
      this.logger.debug('Database read fallback to memory');
    }
    return this.studentsMemory;
  }

  async findOne(id: string): Promise<StudentProfile> {
    try {
      const record = await this.prisma.student.findUnique({ where: { id } });
      if (record) {
        return this.mapToProfile(record);
      }
    } catch (e) {
      this.logger.debug('Database read fallback to memory');
    }

    const memoryStudent = this.studentsMemory.find((item) => item.id === id);
    if (!memoryStudent) {
      throw new NotFoundException(`Student with id "${id}" not found`);
    }
    return memoryStudent;
  }

  async create(dto: CreateStudentDto): Promise<StudentProfile> {
    try {
      const created = await this.prisma.student.create({
        data: {
          name: dto.name,
          email: dto.email,
          collegeId: dto.collegeId,
          year: dto.year as any,
          interests: dto.interests,
          goals: dto.goals,
          targetRoles: dto.targetRoles as any,
        },
      });
      return this.mapToProfile(created);
    } catch (e) {
      this.logger.warn('Could not persist to database, saving to memory fallback');
    }

    const student: StudentProfile = {
      id: `student-${Date.now()}`,
      ...dto,
    };
    this.studentsMemory.push(student);
    return student;
  }

  async update(id: string, dto: UpdateStudentDto): Promise<StudentProfile> {
    try {
      const updated = await this.prisma.student.update({
        where: { id },
        data: {
          name: dto.name,
          year: dto.year as any,
          interests: dto.interests,
          goals: dto.goals,
          targetRoles: dto.targetRoles as any,
        },
      });
      return this.mapToProfile(updated);
    } catch (e) {
      this.logger.debug('Database update fallback to memory');
    }

    const index = this.studentsMemory.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new NotFoundException(`Student with id "${id}" not found`);
    }

    const current = this.studentsMemory[index];
    const updated: StudentProfile = {
      ...current,
      ...dto,
      name: dto.name ?? current.name,
      year: dto.year ?? current.year,
      interests: dto.interests ?? current.interests,
      goals: dto.goals ?? current.goals,
      targetRoles: dto.targetRoles ?? current.targetRoles,
    };
    this.studentsMemory[index] = updated;
    return updated;
  }

  private mapToProfile(record: any): StudentProfile {
    return {
      id: record.id,
      name: record.name,
      email: record.email,
      collegeId: record.collegeId || '',
      year: record.year as StudentYear,
      interests: record.interests,
      goals: record.goals,
      targetRoles: record.targetRoles as RoleArchetype[],
    };
  }
}
