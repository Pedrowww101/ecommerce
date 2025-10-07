// import { drizzle } from 'drizzle-orm/vercel-postgres'; 
// import postgres from 'postgres';
// import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

// import * as appSchema from "../database/app-schema.js";

// console.log("DB URL CHECK:", process.env.DATABASE_URL ? "SET" : "NOT SET"); // <-- ADD THIS


// if (!process.env.DATABASE_URL) throw Error("Database connection env not set up")


//   function createDbClient() {
//     const client = postgres(process.env.DATABASE_URL!, {
//       max: 2
//     });
//     return drizzle(client, {
//       schema: { ...appSchema },
//     });
//   }
  
//   declare global {
//     var __db__: PostgresJsDatabase<typeof appSchema> | undefined;
//   }
  
//   if (!global.__db__) {
//     console.log("Initializing NEW Drizzle Client for Development...");
//     global.__db__ = createDbClient();
//   }
  
//   export const db = global.__db__;

//   export type DrizzleClient = typeof db;

// vercel=postgres
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as appSchema from "../database/app-schema.js";
import * as authSchema from "../database/auth-schema.js";

// Optional check for safety during local dev
console.log("DB URL CHECK:", process.env.DATABASE_URL ? "SET" : "NOT SET");
if (!process.env.DATABASE_URL) throw Error("Database connection env not set up");

// Combine your schemas if you have multiple
const schema = {
  ...appSchema,
  ...authSchema
};

// Create a Drizzle instance using Vercel's serverless-friendly client
export const db = drizzle(sql, { schema });

// Export the type for usage elsewhere
export type DrizzleClient = typeof db;
