import { IsArray, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { RoleArchetype, StudentYear } from '@learnlytica/shared';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  collegeId: string;

  @IsEnum(StudentYear)
  year: StudentYear;

  @IsArray()
  @IsString({ each: true })
  interests: string[];

  @IsArray()
  @IsString({ each: true })
  goals: string[];

  @IsArray()
  @IsEnum(RoleArchetype, { each: true })
  targetRoles: RoleArchetype[];
}

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(StudentYear)
  year?: StudentYear;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  goals?: string[];

  @IsOptional()
  @IsArray()
  @IsEnum(RoleArchetype, { each: true })
  targetRoles?: RoleArchetype[];
}
