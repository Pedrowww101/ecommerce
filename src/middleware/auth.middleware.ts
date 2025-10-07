import { auth } from "../lib/auth.js";
import { factory } from "../lib/factory.js";

export const authMiddleware = factory.createMiddleware(async (c, next) => {
    try {
        const headersObj: Record<string, string> = {};
        const authHeader = c.req.header("authorization");
        const cookieHeader = c.req.header("cookie");

        if (authHeader) headersObj["authorization"] = authHeader;
        if (cookieHeader) headersObj["cookie"] = cookieHeader;

        const session = await auth.api.getSession({ headers: headersObj });

        c.set("user", session?.user ?? null);
        c.set("session", session?.session ?? null);
    } catch (err) {
        console.error("Auth middleware error:", err);
        c.set("user", null);
        c.set("session", null);
    }

    await next();
});
