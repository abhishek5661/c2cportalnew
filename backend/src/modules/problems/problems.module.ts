import { Module } from '@nestjs/common';
import { ActivityLogModule } from '../activity-logs/activity-log.module';
import { ProblemsController } from './problems.controller';
import { ProblemsService } from './problems.service';

@Module({
  imports: [ActivityLogModule],
  controllers: [ProblemsController],
  providers: [ProblemsService],
  exports: [ProblemsService],
})
export class ProblemsModule {}
