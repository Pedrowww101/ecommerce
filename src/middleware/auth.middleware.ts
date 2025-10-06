import { auth } from "../lib/auth.js";
import { factory } from "../lib/factory.js";

export const authMiddleware = factory.createMiddleware(async (c, next) => {

    const session = await auth.api.getSession({ headers: c.req.raw.headers })

    if (!session) {
        c.set("user", null);
        c.set("session", null);
        await next();
        return;
    }
    
    c.set("user", session.user);
    c.set("session", session.session);
    await next();
});