"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client"; //import the auth client
export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {data :session} = authClient.useSession();



  const onSubmit = ()=>{

    authClient.signUp.email({
      email,
      password,
      name
    },{
      onError :()=>{
        window.alert("Something  Went wrong");
      },
      onSuccess : ()=>{
        window.alert("success")
      }
    })

  }


  const onlogin = ()=>{

    authClient.signIn.email({
      email,
      password
    },{
      onError :()=>{
        window.alert("Something  Went wrong");
      },
      onSuccess : ()=>{
        window.alert("success")
      }
    })

  }

 
 if(session)
 {
  return(
    <div>
    <p>Logined as user {session.user.name}</p>

   <Button onClick={()=>authClient.signOut()}>
    Sign_Out
   </Button>
    </div>
  )
 }

  return (
    <div className="flex mt-3 flex-col w-full justify-between">

      <div className="flex flex-col gap-5 ">
        <Input
        value={name}
        placeholder="Enter Your name"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        value={email}
        type="email"
        placeholder="Enter Your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        value={password}
        type="password"
        placeholder="Enter Your password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button  onClick={onSubmit}>Submit</Button>
      </div>

         <div className="flex flex-col gap-5 ">
      
      <Input
        value={email}
        type="email"
        placeholder="Enter Your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        value={password}
        type="password"
        placeholder="Enter Your password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button  onClick={onlogin}>Submit</Button>
      </div>

       
    </div>
  );
}
