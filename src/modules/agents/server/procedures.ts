import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter,baseProcedure, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { sql } from "drizzle-orm";
import { AgentSchema } from "../schemas";
import { z } from "zod";
import { eq, getTableColumns } from "drizzle-orm";
export const agentRouter = createTRPCRouter({

     

    getMany: protectedProcedure.query(async ()=>{
        const data = await db.select().from(agents);
    
    return data;
    }),

    create: protectedProcedure.input(AgentSchema)
    .mutation(async ({input,ctx})=>{
        const [NewAgent] = await db.insert(agents).values({
            ...input,
            userId : ctx.auth.user.id,
        }).returning();

        return NewAgent;
    }),

    getOne : protectedProcedure.input(z.object({id : z.string()})).query
    (async({input})=>{

        const[existingAgent] = await  db.select({
            meetingCount : sql<number>`5`,
            ...getTableColumns(agents)
        }).from(agents)
        .where(eq(agents.id,input.id))
        return existingAgent;
    })

    



}); 