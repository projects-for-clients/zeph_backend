import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { PG_CONNECTION } from './constants';
import * as schema from './schema';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        const pool = new Pool({
          connectionString,
          ssl: true,
        });

        console.log({ connectionString });

        const conn = drizzle(pool, { schema });

        console.log({ conn });

        return conn;
      },
    },
  ],
  exports: [PG_CONNECTION],
})
export class DrizzleModule {}
