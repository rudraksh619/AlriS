import {ResponsiveDialog} from "@/components/responsive-dialog"
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";

import { MeetingGetOne } from "../../type";

interface DialogUpdateMeetingProps {
    open : boolean;
    onOpenChange : (open:boolean)=>void;
    initialValues : MeetingGetOne;

}


export const UpdateMeetingDialog = ({
    open,
    onOpenChange,
    initialValues
}: DialogUpdateMeetingProps)=>{

    const router = useRouter();

    return(
       <ResponsiveDialog
       title="Update Meeting"
       description="Update Meeting Details"
       open = {open}
       onOpenChange={onOpenChange}
       >
        

        <MeetingForm
        onSuccess={()=>onOpenChange(false)}
        onCancel={()=> onOpenChange(false)}
         intialsValues={initialValues}
        />
        
   
       </ResponsiveDialog>
    )

}


