import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button } from "../ui/button";
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from "lucide-react";
import { format } from "date-fns";

interface BookingCalendarProps {
  date: Date | undefined;
  setDate: (value: Date | undefined) => void;
  time: string | undefined;
  setTime: (value: string | undefined) => void;
  slots: string[] | undefined;
  errors: Error | null;
  isLoading: boolean;
  bookedDates: string[] | undefined;
}

export const BookingCalendar = ({
  date,
  setDate,
  time,
  setTime,
  slots,
  bookedDates,
  errors,
  isLoading,
}: BookingCalendarProps) => {
  const bookedDateObjects = (bookedDates ?? []).map((d) => new Date(d));
  const isMobile = useIsMobile();

  // On mobile, show time slots panel only after a date is selected
  const showTimeSlotsPanel = !isMobile || (isMobile && date !== undefined);
  const showCalendar = !isMobile || (isMobile && date === undefined);

  const handleDateSelect = (value: Date | undefined) => {
    setDate(value);
    setTime(undefined); // reset time when date changes
  };

  const handleBack = () => {
    setDate(undefined);
    setTime(undefined);
  };

  const calendarEl = (
    <div className="md:p-6">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
        defaultMonth={date}
        showOutsideDays={false}
        disabled={(d) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const isPastOrToday = d <= today;
          const isBooked = (bookedDateObjects ?? []).some(
            (booked) => booked.toDateString() === d.toDateString(),
          );
          return isPastOrToday || isBooked;
        }}
        modifiers={{
          bookedDateObjects,
          today: (date) => date.toDateString() === new Date().toDateString(),
        }}
        modifiersClassNames={{
          bookedDates: "[&>button]:line-through opacity-100",
          bookedDates__today: "[&>button]:line-through opacity-100",
        }}
        className="bg-transparent p-0 [--cell-size:--spacing(10)] lg:[--cell-size:--spacing(12)]"
        formatters={{
          formatWeekdayName: (date) =>
            date.toLocaleString("en-US", { weekday: "short" }),
        }}
      />
    </div>
  );

  const timeSlotsEl = (
    <div className="inset-y-0 right-0 flex max-h-40 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-6 md:absolute md:max-h-none md:w-48 md:border-t-0 md:border-l scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-primary/80 scrollbar-track-background">
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 md:h-10 w-full rounded-md" />
          ))
        ) : slots && slots.length > 0 ? (
          slots.map((slot) => {
            const isActive = slot === time;
            return (
              <Button
                type="button"
                key={slot}
                size={isMobile ? "default" : "lg"}
                variant={isActive ? "default" : "outline"}
                onClick={() => setTime(slot)}
                className="w-full shadow-none"
              >
                {slot}
              </Button>
            );
          })
        ) : date ? (
          <span className="text-sm text-muted-foreground">
            No available time slots for today. Please select another date.
          </span>
        ) : !errors ? (
          <span className="text-sm text-muted-foreground">
            Please select a date for your appointment.
          </span>
        ) : (
          <span className="text-sm text-destructive">
            Failed to load available time slots. Please try again later.
          </span>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Card className="relative p-0 flex flex-col items-center">
        {/* Mobile step indicator */}
        <div className="flex items-center w-full px-4 pt-4 pb-2 gap-3">
          <div className="flex items-center gap-1.5 flex-1">
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium transition-colors ${
                !date
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/20 text-primary"
              }`}
            >
              {date ? <CalendarIcon className="w-3 h-3" /> : "1"}
            </div>
            <span
              className={`text-xs font-medium transition-colors ${
                !date ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {date ? format(date, "d MMM") : "Date"}
            </span>
          </div>

          {/* Divider line */}
          <div
            className={`h-px flex-1 transition-colors ${
              date ? "bg-primary" : "bg-border"
            }`}
          />

          <div className="flex items-center gap-1.5 flex-1 justify-end">
            <span
              className={`text-xs font-medium transition-colors ${
                date ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {time ?? "Time"}
            </span>
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium transition-colors ${
                date
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <ClockIcon className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Step content */}
        {showCalendar && calendarEl}

        {showTimeSlotsPanel && (
          <div className="w-full">
            {/* Back button */}
            <div className="flex items-center gap-2 px-4 pt-2 pb-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="h-7 px-2 text-xs text-muted-foreground -ml-2"
              >
                <ArrowLeftIcon className="w-3 h-3 mr-1" />
                {format(date!, "EEEE, d MMMM")}
              </Button>
            </div>
            <div className="border-t p-4">
              <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-primary/80 scrollbar-track-background pb-1">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full rounded-md" />
                  ))
                ) : slots && slots.length > 0 ? (
                  slots.map((slot) => {
                    const isActive = slot === time;
                    return (
                      <Button
                        type="button"
                        key={slot}
                        variant={isActive ? "default" : "outline"}
                        onClick={() => setTime(slot)}
                        className="w-full shadow-none"
                      >
                        {slot}
                      </Button>
                    );
                  })
                ) : (
                  <span className="col-span-2 text-sm text-muted-foreground">
                    No available time slots. Please go back and select another
                    date.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </Card>
    );
  }

  // Desktop: original layout unchanged
  return (
    <Card className="relative p-0 md:pr-48 flex flex-col items-center">
      {calendarEl}
      {timeSlotsEl}
    </Card>
  );
};
