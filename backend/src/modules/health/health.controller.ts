import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: 'ok',
      app: 'learnlytica-backend',
      timestamp: new Date().toISOString(),
    };
  }
}
