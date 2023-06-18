import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import postgres from 'postgres';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const client = postgres({ ssl: true });
        const db = drizzle(client);
      },
    },
  ],
  exports: [PG_CONNECTION],
})
export class DrizzleModule {}
