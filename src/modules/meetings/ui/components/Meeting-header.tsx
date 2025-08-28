"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { MeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";

export const MeetingHeader = () => {
  const[isDialogOpen,SetDialogOpen] = useState(false);
  return (
    <>
    <MeetingDialog open={isDialogOpen} onOpenChange = {SetDialogOpen}/>
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex  justify-between items-center">
          <h5 className="font-medium text-2xl">My Meetings</h5>
          <Button onClick={() => {SetDialogOpen(true)}}>
            <PlusIcon />
            New Meeting
          </Button> 
        </div>

        <div className="flex items-center gap-x-2 p-1">
          TODO : Meeting filter
        </div>
      </div>
    </>
  );
};
