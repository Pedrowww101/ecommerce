import { auth } from "../lib/auth.js";
import { factory } from "../lib/factory.js";

export const authMiddleware = factory.createMiddleware(async (c, next) => {
    try {
        const rawRequest = c.req.raw as Request; 

        const session = await auth.api.getSession({ headers: rawRequest.headers });
        c.set("user", session?.user ?? null);
        c.set("session", session?.session ?? null);
    } catch (err) {
        console.error("Auth middleware error:", err);
        c.set("user", null);
        c.set("session", null);
    }
    await next();
});
