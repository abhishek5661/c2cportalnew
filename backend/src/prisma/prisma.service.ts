import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Connected to PostgreSQL database via Prisma');
    } catch (error) {
      this.logger.warn(
        'Could not connect to database on startup. In-memory fallback or local database required for live queries.',
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
