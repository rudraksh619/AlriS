"use client";

import { Button } from "@/components/ui/button";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { DashboardCommand } from "./dashboard-comman";
import { set } from "zod";
import { useEffect, useState } from "react";


export const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(()=>{

    const down = (e:KeyboardEvent)=>{
      if(e.key === "k" || e.metaKey){
        e.preventDefault();
        setCommandOpen((open)=>!open);
      }
    }

    document.addEventListener("keydown" , down);
    return()=>{

      document.removeEventListener("keydown",down);
    }
  },[])

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="flex items-center px-4 py-3 gap-x-2 border-b bg-background">
        <Button onClick={toggleSidebar} className="size-9" variant="outline">
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon />
          ) : (
            <PanelLeftCloseIcon />
          )}
        </Button>

        <Button
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground 
             hover:text-muted-foreground"
          variant="outline"
          size="sm"
          onClick={() => {setCommandOpen(!commandOpen)}}
        >
          <SearchIcon />
          Search
          <kbd
            className="ml-auto pointer-events-none inline-flex h-5 select-none items-center
                gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground"
          >
            <span>&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
};
