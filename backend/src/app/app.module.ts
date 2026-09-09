import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from '../modules/students/students.module';
import { ActivityLogModule } from '../modules/activity-logs/activity-log.module';
import { ReadinessModule } from '../modules/readiness/readiness.module';
import { HealthModule } from '../modules/health/health.module';
import { DashboardModule } from '../modules/dashboard/dashboard.module';
import { ProblemsModule } from '../modules/problems/problems.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, HealthModule, StudentsModule, ActivityLogModule, ReadinessModule, DashboardModule, ProblemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
