import { betterAuth } from "better-auth";

import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";

import * as schema from "@/db/schema"
 
export const auth = betterAuth({

     database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema : {
          ...schema,
        },
    }),

    emailAndPassword: {
      
    enabled: true, 
  }, 

  //...
});