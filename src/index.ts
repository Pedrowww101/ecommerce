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
.use("/auth/*", (c, next) => {
  const authUrl = env(c).BETTER_AUTH_URL; 
  
  return authCorsMiddleware(authUrl)(c, next);
})

.on(["POST", "GET"], "/auth/*", (c) => {
	return auth.handler(c.req.raw);
})

.use("*", authMiddleware)

export default handle(app);

