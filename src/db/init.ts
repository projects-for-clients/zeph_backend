// import { Client } from '@neondatabase/serverless';
// import type { NeonDatabase } from 'drizzle-orm/neon-serverless';
// import { drizzle } from 'drizzle-orm/neon-serverless';

// interface Request {
//   client: Client;
//   db: NeonDatabase;
// }

// async function injectDB(request: Request, env: Env) {
//   request.client = new Client(env.DATABASE_URL);
//   request.db = drizzle(request.client);
// }

// router.get(
//   '/users',
//   injectDB,
//   async (req: Request, env: Env, ctx: ExecutionContext) => {
//     req.client.connect();
//     const result = await req.db.select().from(users);
//     ctx.waitUntil(req.client.end());
//     return json({ status: 'ok', result });
//   },
// );

export default function () {
  return 'hello world';
}
