import { z } from "zod";

export const MeetingSchema = z.object({
  name: z.string().min(1, { message: "Name is Required" }),

  agentId: z.string().min(1, { message: "Agent is required" }),
});

export const MeetingUpadteSchema = MeetingSchema.extend({
  id: z.string().min(1, { message: "Id is required" }),
});
