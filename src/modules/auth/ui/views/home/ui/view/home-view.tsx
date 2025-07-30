"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client"; //import the auth client
export  function Home_view() {
  const {data :session} = authClient.useSession();
  const router = useRouter();

  if(!session)
  {
    return (
        <p>Loading...</p>
    )
  }
 
  return (
    <div>
    <p>Logined as user {session?.user.name}</p>
    <Button onClick={()=>authClient.signOut()}>
    Sign_Out
   </Button>
    </div>
  )
}

