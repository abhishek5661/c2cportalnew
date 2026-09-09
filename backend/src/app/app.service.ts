import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot() {
    return {
      app: 'learnlytica-backend',
      status: 'running',
      message: 'Welcome to Learnlytica readiness engine',
      routes: [
        '/health',
        '/students',
        '/activity-log/:studentId',
        '/readiness/:studentId',
        '/dashboard/:studentId',
      ],
    };
  }
}
