import { auth } from './lib/auth';
import { Env } from './lib/auth.type';
import { authMiddleware } from './middleware/auth.middleware';
import { authCorsMiddleware } from './middleware/cors-middleware';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { handle } from '@vercel/hono'
import { env } from 'hono/adapter'; 

const app = new Hono<Env>()
.basePath("/api")

.use(logger())
.use("/auth/*", async (c, next) => {
  console.log("CORS middleware start");  
  const authUrl = env(c).BETTER_AUTH_URL; 
  await authCorsMiddleware(authUrl)(c, next);
  console.log("CORS middleware finished");
})

.on(["POST", "GET"], "/auth/*", async (c) => {
	return await auth.handler(c.req.raw);
})

.use("*", authMiddleware)

export default handle(app);

