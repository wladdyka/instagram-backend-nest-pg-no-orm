import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../constants';
import { Pool } from 'pg';

@Injectable()
export class AppService {
  constructor(@Inject(PG_CONNECTION) private readonly db: Pool) {}

  async getUsers() {
    const client = await this.db.connect();

    try {
      const res = await client.query('SELECT * FROM users');
      return res.rows;
    } finally {
      client.release();
    }
  }
}
