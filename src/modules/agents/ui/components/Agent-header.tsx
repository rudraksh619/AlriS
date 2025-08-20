"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { AgentDialog } from "./new-agent-dialog";
import { AgentFilter } from "../../hooks/use-agent-filters";
import { AgentSearch } from "./agent-search-filter";
import { Default_PAGE } from "@/constant";

export const AgentHeader = () => {
  const [isDialogOpen, SetDialog] = useState(false);
  const [filters, setFilters] = AgentFilter();

  const ifiltered = !!filters.search;

  const onClearFilter = ()=>{
   setFilters({
    search : "",
    page : Default_PAGE
   })
  }

  return (
    <>
      <AgentDialog open={isDialogOpen} onOpenChange={SetDialog} />

      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex  justify-between items-center">
          <h5 className="font-medium text-2xl">My agent</h5>
          <Button
            onClick={() => {
              SetDialog(true);
            }}
          >
            <PlusIcon />
            New Agent
          </Button>
        </div>

        <div className="flex items-center gap-x-2 p-1">
            <AgentSearch/>
            {ifiltered && (
            <Button variant= "outline" size = "sm" onClick={onClearFilter}>
                <XCircleIcon/>
                Clear
            </Button>
            )}
        </div>

      </div>
    </>
  );
};
