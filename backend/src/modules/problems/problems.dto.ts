import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SubmitProblemDto {
  @IsString()
  @IsNotEmpty()
  problemId: string;

  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsIn(['Python 3', 'Java', 'C++', 'JavaScript', 'TypeScript'])
  language: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}

export class QueryProblemDto {
  @IsOptional()
  @IsString()
  difficulty?: 'Easy' | 'Medium' | 'Hard';

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
