"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { MeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";
import { MeetingSearch } from "./meeting-search-filter";
import { MeetingStatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { MeetingFilters } from "../../hooks/use-meetings-filters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const MeetingHeader = () => {
  const [isDialogOpen, SetDialogOpen] = useState(false);
  const [filter, setfilter] = MeetingFilters();
  const is_filtering_isdone =
    !!filter.agentId || !!filter.search || !!filter.status;

const onClear = ()=>{
  setfilter({
    agentId: "",
    search: "",
    status: null,
  })
}

  return (
    <>
      <MeetingDialog open={isDialogOpen} onOpenChange={SetDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex  justify-between items-center">
          <h5 className="font-medium text-2xl">My Meetings</h5>
          <Button
            onClick={() => {
              SetDialogOpen(true);
            }}
          >
            <PlusIcon />
            New Meeting
          </Button>
        </div>

        <ScrollArea>
            <div className="flex items-center gap-x-2 p-1">
          <MeetingSearch />
          <MeetingStatusFilter />
          <AgentIdFilter />

          {is_filtering_isdone && (
            <Button
              variant="outline"
              onClick={onClear}
            >
             
              <XCircleIcon className="size-4" />
            </Button>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
        </ScrollArea>
      


      </div>
    </>
  );
};
