"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/shared/lib/utils";
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/";
import { uk } from "date-fns/locale";

interface DatePickerWithRangeProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  className?: string;
}

export function DatePickerWithRange({
  date,
  setDate,
  className,
}: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal bg-slate-900/50 border-white/10 hover:bg-white/5",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-slate-400" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd LLL", { locale: uk })} -{" "}
                  {format(date.to, "dd LLL", { locale: uk })}
                </>
              ) : (
                format(date.from, "dd LLL", { locale: uk })
              )
            ) : (
              <span>Оберіть дату</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={uk}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
