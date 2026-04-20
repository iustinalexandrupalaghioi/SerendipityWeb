import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button } from "../ui/button";

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
  return (
    <Card className="relative p-0 md:pr-48 flex flex-col items-center">
      {/* Calendar */}
      <div className="md:p-6">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
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
          className="bg-transparent p-0  [--cell-size:--spacing(10)] lg:[--cell-size:--spacing(12)]"
          formatters={{
            formatWeekdayName: (date) =>
              date.toLocaleString("en-US", { weekday: "short" }),
          }}
        />
      </div>

      {/* Time Slots */}
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
    </Card>
  );
};
