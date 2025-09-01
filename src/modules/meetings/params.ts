 import { createLoader, parseAsInteger,parseAsString, parseAsStringEnum } from "nuqs/server";
import { Default_PAGE } from "@/constant";
import { MeetingStatus } from "./type";



 export const FilterSearchParams = {
    search : parseAsString.withDefault("").withOptions({clearOnDefault : true}),
    page : parseAsInteger.withDefault(Default_PAGE).withOptions({clearOnDefault : true}),
    status : parseAsStringEnum(Object.values(MeetingStatus)),
    agentId : parseAsString.withDefault("").withOptions({clearOnDefault:true}),
    

   }


 export const loaderSearchParams = createLoader(FilterSearchParams) 