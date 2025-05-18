"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { BookingStatus } from "@/types/booking";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

interface BookingStatusCellProps {
  status: BookingStatus;
  onStatusChange: (status: BookingStatus) => void;
}

export function BookingStatusCell({
  status,
  onStatusChange,
}: BookingStatusCellProps) {
  const [open, setOpen] = useState(false);

  const statuses = [
    { value: "confirmed", label: "Confirmed" },
    { value: "canceled", label: "Cancel" },
    { value: "refunded", label: "Refunded" },
  ] as const;

  const statusStyles = {
    confirmed: "bg-green-100 text-green-800 border-green-200",
    canceled: "bg-red-100 text-red-800 border-red-200",
    refunded: "bg-orange-100 text-orange-800 border-orange-200",
  };

  const currentStatus = statuses.find((s) => s.value === status);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[130px] justify-between border px-3 py-1 h-7 font-normal",
            statusStyles[status]
          )}
        >
          {currentStatus?.label}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[130px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No status found.</CommandEmpty>
            <CommandGroup>
              {statuses.map((statusOption) => (
                <CommandItem
                  key={statusOption.value}
                  value={statusOption.value}
                  onSelect={(currentValue) => {
                    onStatusChange(currentValue as BookingStatus);
                    setOpen(false);
                  }}
                >
                  {statusOption.label}
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      status === statusOption.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
