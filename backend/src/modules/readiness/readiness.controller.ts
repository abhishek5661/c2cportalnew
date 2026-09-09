import { Controller, Get, Param } from '@nestjs/common';
import { ReadinessService } from './readiness.service';

@Controller('readiness')
export class ReadinessController {
  constructor(private readonly readinessService: ReadinessService) {}

  @Get(':studentId')
  getStudentReadiness(@Param('studentId') studentId: string) {
    return this.readinessService.computeStudentReadiness(studentId);
  }
}
