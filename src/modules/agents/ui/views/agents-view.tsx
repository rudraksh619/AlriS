"use client";

import {  useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { AgentFilter } from "../../hooks/use-agent-filters";
import { DataPagination } from "../components/data-pagination";
import { useRouter } from "next/navigation";


export const AgentsView = ()=>{
    const trpc = useTRPC();
    const router = useRouter()
    const[filter,setFilters] = AgentFilter();

    const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions({...filter}));
    return(

        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
           
         
           
           <DataTable 
           data = {data.items} 
           columns={columns}
           onRowClick={(row)=>router.push(`/agents/${row.id}`)}
           />

             <DataPagination
           page = {filter.page}
           totalPages = {data.totalPages}

          onPageChange={(page)=>{setFilters({page})}}
           />
           {data.items.length === 0 && (
            <EmptyState
            title="Create your first Agent"
            description="Create an agent to join your 
            meetings . Each agent will follow your instruction and interact with participants 
            during the call"
            />
           )}
        </div>
    )
}



export const AgentsLoading = ()=>{
    return(
        <LoadingState
        title = "Loading Agents"
        description="Please wait. Agent are Loading"
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