import { GenrateAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { authClient } from "@/lib/auth-client";
import {
    DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, CreditCardIcon, LogOut, Router } from "lucide-react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Dropdown } from "react-day-picker";
import { useRouter } from "next/navigation";


export const DashboardUserButton = () => {
    const router = useRouter();
  const { data, isPending } = authClient.useSession();
  if (isPending || !data) {
    return null;
  }

  const Logout = ()=>{
    authClient.signOut({
        fetchOptions : {
            onSuccess : ()=>{
                router.push("/sign-in")
            }
        }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="rounded-lg border border-border/10 p-3 w-full flex items-center 
             justify-between bg-white/5 hover:bg-white/10 overflow-hidden"
      >
        {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GenrateAvatar
            seed={data.user.name}
            variant="initials"
            className="size-8 mr-3 "
          />
        )}

        <div className="flex gap-0.5 flex-col text-left min-w-0 flex-1 overflow-hidden">
          <p className="text-sm truncate w-full">{data.user.name}</p>
          <p className="text-xs truncate w-full">{data.user.email}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data.user.name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate"> {data.user.email} </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex cursor-pointer items-center justify-between ">
            Billing
            <CreditCardIcon className="size-4" />
        </DropdownMenuItem>

       <DropdownMenuItem 
       onClick={Logout}
       className="flex cursor-pointer items-center justify-between ">
            Logout
            <LogOut className="size-4" />
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
};
