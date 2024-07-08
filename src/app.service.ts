import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private readonly entityManager: EntityManager) {}

  async healthCheck(): Promise<{
    status: string;
    time?: string;
    message?: string;
  }> {
    try {
      const result = await this.entityManager.connection.query('SELECT NOW()');
      return { status: 'ok', time: result[0].now };
    } catch (error) {
      return { status: 'error', message: error };
    }
  }
}
