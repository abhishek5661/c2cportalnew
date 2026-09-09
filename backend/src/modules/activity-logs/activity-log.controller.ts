import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateActivityLogDto } from './activity-log.dto';
import { ActivityLogService } from './activity-log.service';

@Controller('activity-log')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Get(':studentId')
  findByStudent(@Param('studentId') studentId: string) {
    return this.activityLogService.findByStudent(studentId);
  }

  @Post()
  create(@Body() dto: CreateActivityLogDto) {
    return this.activityLogService.create(dto);
  }
}
