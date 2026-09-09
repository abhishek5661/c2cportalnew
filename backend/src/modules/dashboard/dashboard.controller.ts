import { Controller, Get, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get(':studentId')
  getOverview(@Param('studentId') studentId: string) {
    return this.dashboardService.getOverview(studentId);
  }
}
