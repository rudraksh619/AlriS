import {z} from "zod";

export const AgentSchema = z.object({
    name : z.string().min(1,{message : "Name is Required"}),
  
    instruction : z.string().min(1,{message : "Please provide some Instruction"})
    
});

 