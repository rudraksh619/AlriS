import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { BanIcon, VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  meetingId: string;
  onCancellation: () => void;
  isCancelling: boolean;
}

export const UpcomingState = ({
  meetingId,
  onCancellation,
  isCancelling,
}: Props) => {
  return (
    <div className="bg-white rounded px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/upcoming.svg"
        title="Not Started yet"
        description="Once you start the meeting ,a summary will appear here"
      />

      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button
          onClick={onCancellation}
          disabled={isCancelling}
          className="w-full lg:w-auto"
          variant="secondary"
        >
          <BanIcon />
          Cancel Meeting
        </Button>

        <Button disabled={isCancelling} asChild className="w-full lg:w-auto">
          <Link href={`call/${meetingId}`}>
            <VideoIcon />
            Start Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
