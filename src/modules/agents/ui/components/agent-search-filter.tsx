import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

import { AgentFilter } from "../../hooks/use-agent-filters";

export const AgentSearch = () => {

    const [Filter,SetFilter] = AgentFilter();

    return(
        <div className="relative">
            <Input
            placeholder="Filter By Name"
            className="h-9 bg-white w-[200px] pl-7"
            value = {Filter.search}
            onChange={(e)=>SetFilter({search : e.target.value})}
            />

            <SearchIcon 
            className="size-4 absolute left-2 top-1/2 -translate-y-1/2
            text-muted-foreground 
            "
            />

        </div>
    )


}