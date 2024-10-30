import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from '../../constants';
import { ConfigModule, ConfigService } from '@nestjs/config';

const dbProvider = {
  provide: PG_CONNECTION,
  inject: [ConfigService],
  useFactory: async (service: ConfigService) => {
    return new Pool({
      user: service.get('DB_USER'),
      host: service.get('DB_HOST'),
      database: service.get('DB_NAME'),
      password: service.get('DB_PASSWORD'),
      port: service.get('DB_PORT'),
    });
  },
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
