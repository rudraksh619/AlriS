 import { createLoader, parseAsInteger,parseAsString } from "nuqs/server";
import { Default_PAGE } from "@/constant";

 export const FilterSearchParams = {
    search : parseAsString.withDefault("").withOptions({clearOnDefault : true}),
    page : parseAsInteger.withDefault(Default_PAGE).withOptions({clearOnDefault : true})
 } 


 export const loaderSearchParams = createLoader(FilterSearchParams) 