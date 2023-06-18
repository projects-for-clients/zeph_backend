import {
  pgTable,
  pgEnum,
  pgSchema,
  AnyPgColumn,
  serial,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';

import { sql } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  firstname: varchar('firstname', { length: 50 }).notNull(),
  lastname: varchar('lastname', { length: 50 }).notNull(),
  password: varchar('password', { length: 50 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
});
