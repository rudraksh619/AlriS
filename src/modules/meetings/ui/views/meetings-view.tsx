"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { DataTable } from "@/components/ui/data-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

export const MeetingView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data.items} columns={columns} />

      {data.items.length === 0 && (
        <EmptyState
          title="Create your first Meeting"
          description="Schedule a meeting to connnect with others .Each
                      meeting lets you collaborate , share ideas,and interact with partcipants in real time."
        />
      )}
    </div>
  );
};

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
