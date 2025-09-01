import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CommandSelect } from "./command-select";
import { GenrateAvatar } from "@/components/generated-avatar";
import { MeetingFilters } from "../../hooks/use-meetings-filters";

export const AgentIdFilter = () => {
  const [AgentSearch, setAgentSearch] = useState("");
  const [filter, setfilter] = MeetingFilters();
  const trpc = useTRPC();

  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: AgentSearch,
    })
  );

  return (
    <CommandSelect
      placeholder="Agents"
      className="h-9"
      options={(data?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GenrateAvatar
              seed={agent.name}
              variant="botttsNeutral"
              className="size-4"
            />
            {agent.name}
          </div>
        ),
      }))}
      onSelect={(value) => setfilter({ agentId: value })}
      onSearch={setAgentSearch}
      value={filter.agentId ?? ""}
    />
  );
};
