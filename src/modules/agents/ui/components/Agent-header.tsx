"use client"
import {Button} from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { AgentDialog } from "./new-agent-dialog"
export const AgentHeader = ()=>{

  const[isDialogOpen , SetDialog] = useState(false);

    return(
        <>
        <AgentDialog open = {isDialogOpen} onOpenChange = {SetDialog} />
        <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
           <div className="flex  justify-between items-center">
            <h5 className="font-medium text-2xl">My agent</h5>
            <Button onClick={()=>{SetDialog(true)}}>
                <PlusIcon/>
                New Agent
            </Button>
           </div>
        </div>
        </>
        
    )
}