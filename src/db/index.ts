import { drizzle } from "drizzle-orm/neon-http";


// an instance of driizzel
export const db = drizzle(process.env.DATABASE_URL!);
