import {parseAsInteger , parseAsString , useQueryStates} from "nuqs"

import { Default_PAGE } from "@/constant"


export const AgentFilter = ()=>{
    return (
        useQueryStates({
            search:parseAsString.withDefault("").withOptions({clearOnDefault : true}),
            page : parseAsInteger.withDefault(Default_PAGE).withOptions({clearOnDefault : true}),

        })
    )
}