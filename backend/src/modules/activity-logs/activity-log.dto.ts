import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateActivityLogDto {
  @IsString()
  studentId: string;

  @IsIn(['practice', 'project', 'assessment', 'learning', 'competition'])
  type: 'practice' | 'project' | 'assessment' | 'learning' | 'competition';

  @IsString()
  skill: string;

  @IsString()
  title: string;

  @IsNumber()
  points: number;

  @IsOptional()
  @IsNumber()
  confidence?: number;
}
