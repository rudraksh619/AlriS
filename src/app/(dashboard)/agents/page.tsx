import { AgentError, AgentsLoading, AgentsView } from "@/modules/agents/ui/agents-view";
import { getQueryClient,trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { AgentHeader } from "@/modules/agents/ui/components/Agent-header";
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
// we are prefetching the data onm  server component 

const Page = async ()=>{
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())

    const session = await auth.api.getSession({
        headers : await headers(),
      })
    
    
    if(!session)
      {
        redirect("/sign-in")
      }
  
    return (
         <> 
         <AgentHeader/>
         <HydrationBoundary state = {dehydrate(queryClient)}>
         <Suspense fallback = {<AgentsLoading />}>
            <ErrorBoundary fallback={<AgentError />}>
                <AgentsView />
            </ErrorBoundary>
         </Suspense>
         </HydrationBoundary>
         </>
   
   )
}


export default Page;