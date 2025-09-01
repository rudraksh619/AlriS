import {parseAsInteger , parseAsString , parseAsStringEnum, useQueryStates} from "nuqs"

import { Default_PAGE } from "@/constant"
import { MeetingStatus } from "../type"


export const MeetingFilters = ()=>{
    return (
        useQueryStates({
            search:parseAsString.withDefault("").withOptions({clearOnDefault : true}),
            page : parseAsInteger.withDefault(Default_PAGE).withOptions({clearOnDefault : true}),
            status : parseAsStringEnum(Object.values(MeetingStatus)),
            agentId : parseAsString.withDefault("").withOptions({clearOnDefault : true}),
        })
    )
}