import { MeetingHeader } from "@/modules/meetings/ui/components/Meeting-header";
import {
  MeetingsviewError,
  MeetingsViewLoading,
  MeetingView,
} from "@/modules/meetings/ui/views/meetings-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));

  const session  = await auth.api.getSession({
    headers : await headers(),
  })

  if(!session)
  {
    redirect("/sign-in")
  }

  return (
    <>
    <MeetingHeader/>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingsViewLoading />}>
        <ErrorBoundary fallback={<MeetingsviewError />}>
          <MeetingView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
    </>
    

  );
};

export default Page;
