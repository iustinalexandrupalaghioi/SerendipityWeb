"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { format, parseISO, isValid } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SimpleCalendarInputProps {
  label: string;
  value?: string; // ISO: yyyy-MM-dd
  onChange: (value: string) => void;
  disabled?: boolean;
  startMonth?: Date;
  error?: string;
}

export const SimpleCalendarInput: React.FC<SimpleCalendarInputProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  startMonth,
  error,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const MAX_YEARS_AHEAD = 5;
  const toDate = new Date(today);
  toDate.setFullYear(today.getFullYear() + MAX_YEARS_AHEAD);

  const effectiveStartMonth = startMonth ?? today;
  const [open, setOpen] = React.useState(false);

  const selectedDate = value ? parseISO(value) : undefined;

  const handleSelect = (date?: Date) => {
    if (!date || !isValid(date)) return;
    onChange(format(date, "yyyy-MM-dd"));
    setOpen(false);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-card-foreground">
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className="justify-between w-full font-normal"
          >
            {selectedDate && isValid(selectedDate)
              ? format(selectedDate, "dd-MM-yyyy")
              : "Select date"}
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start">
          <Calendar
            className="bg-transparent w-full p-0 [--cell-size:--spacing(8)]"
            mode="single"
            selected={selectedDate}
            startMonth={effectiveStartMonth}
            endMonth={toDate}
            disabled={{ before: effectiveStartMonth }}
            captionLayout="dropdown"
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
