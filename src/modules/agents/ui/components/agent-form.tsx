import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../type";
// import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AgentSchema } from "../../schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GenrateAvatar } from "@/components/generated-avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AgentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  intialsValues?: AgentGetOne;    
}

export const  AgentForm = ({
  onSuccess,
  onCancel,
  intialsValues,
}: AgentFormProps) => {
  const trpc = useTRPC();
//   const router = useRouter();

  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
       await queryClient.invalidateQueries(
            trpc.agents.getMany.queryOptions({}),

        );

       
  onSuccess?.();
      },

      onError: (error) => { 
        toast.error(error.message)
      },

    //   got to updgarde route

    })
  );

const UpdateAgent = useMutation(
    trpc.agents.update.mutationOptions({
      onSuccess: async () => {
       await queryClient.invalidateQueries(
            trpc.agents.getMany.queryOptions({}),

        );

        if(intialsValues?.id)
        {
            await queryClient.invalidateQueries(
             trpc.agents.getOne.queryOptions({id : intialsValues?.id})
            )
        }
  onSuccess?.();
      },

      onError: (error) => { 
        toast.error(error.message)
      },

    //   got to updgarde route

    })
  );
  

  const form = useForm<z.infer<typeof AgentSchema>>({
    resolver: zodResolver(AgentSchema),
    defaultValues: {
      name: intialsValues?.name ?? "",
      instruction: intialsValues?.instruction ?? "",
    },
  });

  const isEdit = !!intialsValues?.id;
  const isPending = createAgent.isPending || UpdateAgent.isPending;

  const onSubmit = (values: z.infer<typeof AgentSchema>) => {
    if (isEdit) {
      UpdateAgent.mutate({...values,id:intialsValues.id})
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form 
      className=" flex flex-col gap-y-3"
      onSubmit={form.handleSubmit(onSubmit)}>
        <GenrateAvatar
          seed={form.watch("name")}
          variant="botttsNeutral"
          className="border size-16"
        />

        <FormField
          name="name"
          
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="math tutor" />
              </FormControl>

              <FormMessage/>

            </FormItem>
          )}
        />

        <FormField
          name="instruction"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="You are help full assistant which can answer questions and help with asistent"
                />
              </FormControl>
              <FormMessage/>
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

          <Button disabled={isPending}  type="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
