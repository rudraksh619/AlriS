"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { MeetingIdHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog copy";
import { useState } from "react";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { Processingstate } from "../components/proccessing-state";

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [RemoveConfirmation, setConfirmation] = useConfirm(
    "Are You Sure?",
    "The following action will remove this meeting"
  );

  const [openUpdateMeetingDialog, setUpdateMeetingDialog] = useState(false);

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },

      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleRemove = async () => {
    const ok = await setConfirmation();
    if (ok) {
      await removeMeeting.mutateAsync({ id: meetingId });
    } else {
      return;
    }
  };

  const isActive = data.status === "active";
  const isCompleted = data.status === "completed";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isProcessing = data.status === "processing";

  return (
    <>
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <RemoveConfirmation />

        <UpdateMeetingDialog
          open={openUpdateMeetingDialog}
          onOpenChange={setUpdateMeetingDialog}
          initialValues={data}
        />

        <MeetingIdHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialog(true)}
          onRemove={handleRemove}
        />

        {isCancelled && <CancelledState />}
        {isCompleted && <p>This meeting has been completed.</p>}
        {isUpcoming && <UpcomingState
          meetingId={meetingId}
          onCancellation={() => {}}
          isCancelling={false}
        />}
        {isProcessing && <Processingstate/>}
        {isActive && <ActiveState  meetingId= {meetingId}/>}
      </div>
    </>
  );
};

export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="Please wait. Meeting is Loading"
    />
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Error loading Meeting"
      description="There was an error loading the Meeting. Please try again later."
    />
  );
};
