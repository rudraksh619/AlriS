import {ResponsiveDialog} from "@/components/responsive-dialog"
import { AgentForm } from "./agent-form";

interface DialogAgentProps {
    open : boolean;
    onOpenChange : (open:boolean)=>void
}


export const AgentDialog = ({
    open ,
    onOpenChange
}: DialogAgentProps)=>{

    return(
       <ResponsiveDialog
       title="New Agent"
       description="Create New Agent"
       open = {open}
       onOpenChange={onOpenChange}
       >
       <AgentForm
      onSuccess={()=>onOpenChange(false)}
      onCancel={()=>onOpenChange(false)} 
       />
       </ResponsiveDialog>
    )

}


