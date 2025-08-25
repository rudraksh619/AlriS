"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { AgentIdHeader } from "../components/agent-id-view-header";
import { GenrateAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { error } from "zod/v4/locales/ar.js";
import { TRPCError } from "@trpc/server";
import { useConfirm } from "@/hooks/use-confirm";
import { agents } from "@/db/schema";
import { useState } from "react";

import { UpdateAgentDialog } from "../components/update-agent-dialog";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  const router = useRouter();

  const [updateAgentIdDialog, setupdateAgentDiallog] = useState(false);

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );

        router.push("/agents");
      },

      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfimation, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove ${data.meetingCount} associated meetings`
  );

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();
    if (!ok) {
      return;
    }
    await removeAgent.mutateAsync({ id: agentId });
  };

  return (
    <>
      <RemoveConfimation />

      <UpdateAgentDialog
        open={updateAgentIdDialog}
        onOpenChange={setupdateAgentDiallog}
        initialValues={data}
      />

      <div className="flex-1 flex flex-col px-4 py-4 md:px-8 gap-y-4">
        <AgentIdHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => {
            setupdateAgentDiallog(true);
          }}
          onRemove={handleRemoveAgent}
        />

        <div className="bg-white rounded-lg border">
          <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5 ">
            <div className="flex items-center gap-x-3">
              <GenrateAvatar
                variant="botttsNeutral"
                seed={data.name}
                className="size-10"
              />
              <h2 className="text-2xl font-medium">{data.name}</h2>
            </div>

            <Badge
              variant="outline"
              className="flex items-center  gap-x-2 [&>svg]:size-4"
            >
              <VideoIcon className="text-blue-700" />
              {data.meetingCount}{" "}
              {data.meetingCount === 1 ? "meeting" : "meetings"}
            </Badge>

            <div className="flex flex-col gap-y-4 ">
              <p className="font-medium text-lg">Instruction</p>
              <p className="text-neutral-800">{data.instruction}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AgentsIdLoading = () => {
  return (
    <LoadingState
      title="Loading Agent"
      description="Please wait. Agent are Loading"
    />
  );
};

export const AgentIdError = () => {
  return (
    <ErrorState
      title="Error loading agent"
      description="There was an error loading the agent. Please try again later."
    />
  );
};
