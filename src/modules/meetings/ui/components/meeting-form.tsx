import { useTRPC } from "@/trpc/client";
import { MeetingGetOne } from "../../type";
// import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { MeetingSchema } from "../../schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { CommandSelect } from "./command-select";
import { GenrateAvatar } from "@/components/generated-avatar";
import { AgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

interface MeetingFormProps {
  onSuccess: (id: string) => void;
  onCancel: () => void;
  intialsValues?: MeetingGetOne;
}

export const MeetingForm = ({
  onSuccess,
  onCancel,
  intialsValues,
}: MeetingFormProps) => {
  const trpc = useTRPC();
  //   const router = useRouter();

  const queryClient = useQueryClient();

  const [agentsearch, setagentsearch] = useState("");
  const [OpenAgent, setOpenAgent] = useState(false);
  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentsearch,
    })
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );

        onSuccess?.(data.id);
      },

      onError: (error) => {
        toast.error(error.message);
      },

      //   got to updgarde route
    })
  );

  const UpdateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );

        if (intialsValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: intialsValues?.id })
          );
        }
        onSuccess?.(data.id);
      },

      onError: (error) => {
        toast.error(error.message);
      },

      //   got to updgarde route
    })
  );

  const form = useForm<z.infer<typeof MeetingSchema>>({
    resolver: zodResolver(MeetingSchema),
    defaultValues: {
      name: intialsValues?.name ?? "",
      agentId: intialsValues?.agentId ?? "",
    },
  });

  const isEdit = !!intialsValues?.id;
  const isPending = createMeeting.isPending || UpdateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof MeetingSchema>) => {
    if (isEdit) {
      UpdateMeeting.mutate({ ...values, id: intialsValues.id });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
    <AgentDialog open = {OpenAgent}  onOpenChange = {setOpenAgent} />
    <Form {...form}>
      <form
        className=" flex flex-col gap-y-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="math consultant" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="agentId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent</FormLabel>
              
              <FormControl>
                <CommandSelect
                  options={(agents.data?.items ?? []).map((agent) => ({
                    id: agent.id,
                    value: agent.id,
                    children: (
                      <div className="flex items-center gap-x-2">
                        <GenrateAvatar
                          seed={agent.name}
                          variant="botttsNeutral"
                          className="border size-6"
                        />
                        <span>{agent.name}</span>
                      </div>
                    ),
                  }))}
                  onSelect={field.onChange}
                  onSearch={setagentsearch}
                  value={field.value}
                  placeholder="Select an agent"
                />
              </FormControl>

              <FormDescription>
               Not found what you&apos;re looking for?{" "} 

               <button
               type="button"
               className="text-primary hover:underline"
               onClick={()=> setOpenAgent(true)}
               >
                Create a New Agent
               </button>
               
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-x-2 justify-between">
          {onCancel && (
            <Button
              variant="ghost"
              disabled={isPending}
              type="button"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          )}

          <Button disabled={isPending} type="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
    </>
  );
};
