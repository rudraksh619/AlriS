"use client";

import {  useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";

export const AgentsView = ()=>{
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions());
    return(
        <div>
           {JSON.stringify(data,null,2)}
        </div>
    )
}


export const AgentsLoading = ()=>{
    return(
        <LoadingState
        title = "Loading Agents"
        description="Please wait while we fetch the details"
        />
    )
}


export const AgentError = ()=>{
    return (
        <ErrorState
        title="Error loading agents"
        description="There was an error loading the agents. Please try again later."
        />
    )}