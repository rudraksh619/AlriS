import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon, Command } from "lucide-react";
import { ReactNode, useState } from "react";

import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  ResponsiveCommandDialog,
} from "@/components/ui/command";

interface Props {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;

  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;

  value: string;
  placeholder?: string;
  isSearchable?: string;
  className?: string;
}

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = "Select an option",
  className,
}: Props) => {
  const selectedOptions = options.find((option) => option.value === value);
  const [open, Setopen] = useState(false);

  const handleonOpenChange = (open: boolean) => {
    onSearch?.("");
    Setopen(open);
  };

  return (
    <>
      <Button
        onClick={() => {
          Setopen(true);
        }}
        variant="outline"
        type="button"
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOptions && "text-muted-foreground",
          className
        )}
      >
        <div>{selectedOptions?.children ?? placeholder}</div>
        <ChevronsUpDownIcon />
      </Button>

      <ResponsiveCommandDialog
        open={open}
        shouldFilter={!onSearch}
        onOpenChange={handleonOpenChange}
      >
        <CommandInput placeholder="Search..." onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No Option found
            </span>
          </CommandEmpty>

          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value);
                Setopen(false);
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </ResponsiveCommandDialog>
    </>
  );
};
