import { db } from "@/db";
import { agent } from "@/db/schema";
import { createTRPCRouter,baseProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";


export const agentRouter = createTRPCRouter({
    getMany: baseProcedure.query(async ()=>{
        const data = await db.select().from(agent);
    
    return data;
    })
});