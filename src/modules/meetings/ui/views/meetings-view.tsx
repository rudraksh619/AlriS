"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";

export const MeetingView = ()=>{
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

    return(
        <div>
          
        </div>
    )
}


export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="Please wait. Meetings are Loading"
    />
  );
};

export const MeetingsviewError = () => {
  return (
    <ErrorState
      title="Error loading Meetings"
      description="There was an error loading the Meetings. Please try again later."
    />
  );
};