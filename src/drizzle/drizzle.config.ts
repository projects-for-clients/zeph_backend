import type { Config } from "drizzle-kit";
import 'dotenv/config';
 
export default {
  schema: "./src/schema.ts",
  out: "./drizzle",

  dbCredentials: {

    user: process.env.PGUSER,
    password: process.env.PASSWORD,
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'postgres',
  }
  

} satisfies Config;