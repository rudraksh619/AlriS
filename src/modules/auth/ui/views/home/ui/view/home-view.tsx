"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const Home_view = () => {
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.hello.queryOptions({ text: "Rudraksh" })
  );

  

  return (
    <div>
      {data?.greeting}
    </div>
  );
};
