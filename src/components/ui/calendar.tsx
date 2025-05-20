"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type * as React from "react";
import { DayPicker } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  showOutsideDays?: boolean;
  className?: string;
  classNames?: {
    months?: string;
    month?: string;
    caption?: string;
    caption_label?: string;
    nav?: string;
    nav_button?: string;
    nav_button_previous?: string;
    nav_button_next?: string;
    table?: string;
    head_row?: string;
    head_cell?: string;
    row?: string;
    cell?: string;
    day?: string;
    day_selected?: string;
    day_today?: string;
    day_outside?: string;
    day_disabled?: string;
    day_range_middle?: string;
    day_hidden?: string;
  };
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-full p-3", className)}
      classNames={{
        months: cn("w-full flex flex-col space-y-4", classNames?.months),
        month: cn("w-full space-y-4", classNames?.month),
        caption: cn(
          "flex justify-center pt-1 relative items-center",
          classNames?.caption
        ),
        caption_label: cn(
          "text-sm font-medium text-orange-500",
          classNames?.caption_label
        ),
        nav: cn("space-x-1 flex items-center", classNames?.nav),
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-gray-100 rounded-full flex items-center justify-center",
          classNames?.nav_button
        ),
        nav_button_previous: cn(
          "absolute left-1",
          classNames?.nav_button_previous
        ),
        nav_button_next: cn("absolute right-1", classNames?.nav_button_next),
        table: cn("w-full border-collapse", classNames?.table),
        head_row: cn("grid grid-cols-7 w-full", classNames?.head_row),
        head_cell: cn(
          "text-gray-500 font-normal text-[0.8rem] py-2 text-center",
          classNames?.head_cell
        ),
        row: cn("grid grid-cols-7 w-full mt-1", classNames?.row),
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          classNames?.cell
        ),
        day: cn(
          "h-9 w-9 p-0 mx-auto font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-md flex items-center justify-center",
          classNames?.day
        ),
        day_selected: cn(
          "bg-orange-500 text-white hover:bg-orange-500 hover:text-white focus:bg-orange-500 focus:text-white rounded-md",
          classNames?.day_selected
        ),
        day_today: cn("bg-gray-100", classNames?.day_today),
        day_outside: cn("text-gray-400 opacity-50", classNames?.day_outside),
        day_disabled: cn("text-gray-400 opacity-50", classNames?.day_disabled),
        day_range_middle: cn(
          "aria-selected:bg-gray-100 aria-selected:text-gray-900",
          classNames?.day_range_middle
        ),
        day_hidden: cn("invisible", classNames?.day_hidden),
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
