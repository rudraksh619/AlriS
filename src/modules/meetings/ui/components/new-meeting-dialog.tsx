import {ResponsiveDialog} from "@/components/responsive-dialog"
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";

interface DialogMeetingProps {
    open : boolean;
    onOpenChange : (open:boolean)=>void
}


export const MeetingDialog = ({
    open ,
    onOpenChange
}: DialogMeetingProps)=>{

    const router = useRouter();

    return(
       <ResponsiveDialog
       title="New Meeting"
       description="Create New Meeting"
       open = {open}
       onOpenChange={onOpenChange}
       >
        

        <MeetingForm
        onSuccess={(id)=>{
            onOpenChange(false)
            router.push(`/meetings/${id}`);
        }}
        onCancel={()=> onOpenChange(false)}
        />
        
   
       </ResponsiveDialog>
    )

}


