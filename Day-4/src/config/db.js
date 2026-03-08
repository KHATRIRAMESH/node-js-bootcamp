// Drizzle example with the Neon serverless driver
// import { setGlobalDispatcher, Agent } from "undici";
// setGlobalDispatcher(new Agent({ connect: { family: 4 } }));
import "dotenv/config.js";
import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as  schema from "../models/schema.js";

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set!'); // will show clearly in Vercel logs
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, { schema });