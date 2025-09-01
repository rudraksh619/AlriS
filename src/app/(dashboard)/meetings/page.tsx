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
import { loaderSearchParams } from "@/modules/meetings/params";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import type { SearchParams } from "nuqs/server"


interface Props {
  searchParams : Promise<SearchParams>
}

const Page = async ({searchParams}:Props) => {

  const filter = await loaderSearchParams(searchParams)
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({...filter}));

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
