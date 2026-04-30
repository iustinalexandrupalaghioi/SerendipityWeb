import { useAuth } from "@/contexts/AuthContext";
import { useAvailableHours } from "@/hooks/useAvailableHours";
import { useFullyBookedDates } from "@/hooks/useBookedDates";
import { supabase } from "@/lib/supabaseClient";
import type { Service } from "@/types/Service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  AlertCircleIcon,
  CalendarIcon,
  CheckIcon,
  LogInIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { BookingCalendar } from "./BookingCalendar";
import { DialogDescription } from "@radix-ui/react-dialog";

interface BookingDialogProps {
  service: Service;
}

const BookingDialog = ({ service }: BookingDialogProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  /* ---------------- STATE ---------------- */

  const [submitted, setSubmitted] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string | undefined>("");

  const [errors, setErrors] = useState<{ date?: string }>({});

  /* ---------------- RESTORE SLOT AFTER LOGIN ---------------- */

  useEffect(() => {
    const savedService = params.get("service");
    const savedDate = params.get("date");
    const savedTime = params.get("time");

    if (savedService === service.id && savedDate && savedTime) {
      setDate(new Date(savedDate));
      setTime(savedTime);
      setOpen(true);
    }
  }, [location.search]);

  /* ---------------- FETCH BOOKED DATES ---------------- */

  const { data: bookedDates } = useFullyBookedDates({
    serviceDuration: service.duration,
    enabled: true,
  });

  /* ---------------- AVAILABLE HOURS ---------------- */

  const {
    data: timeSlots,
    isLoading,
    error,
  } = useAvailableHours({
    date: format(date ? date : new Date(), "yyyy-MM-dd"),
    duration: service.duration,
    enabled: date !== undefined,
  });

  /* ---------------- MUTATION ---------------- */

  const addAppointmentMutation = useMutation({
    mutationFn: async (values: {
      service_id: string;
      user_id: string;
      name: string;
      email: string;
      date: string;
      start_time: string;
      duration: number;
      price: number;
    }) => {
      const [hours, minutes] = values.start_time.split(":").map(Number);
      const [year, month, day] = values.date.split("-").map(Number);

      const endDate = new Date(
        year,
        month - 1,
        day,
        hours,
        minutes + values.duration,
      );

      const endTime = endDate.toTimeString().slice(0, 5);

      const { error } = await supabase.functions.invoke("create-appointment", {
        body: {
          service_id: values.service_id,
          user_id: values.user_id,
          name: values.name,
          email: values.email,
          date: values.date,
          start_time: values.start_time,
          duration: values.duration,
          price: values.price,
          advance_payment: service.advance_price,
          end_time: endTime,
          action_type: "create_appointment",
        },
      });

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setSubmitted(true);
    },

    onError: async (error: any) => {
      const status = error?.context?.status;
      const body = await error?.context?.json().catch(() => null);
      const message = body?.error;

      if (status === 409) {
        setBookingError(message ?? "You already have an active appointment.");
        return;
      }

      if (status === 400) {
        setBookingError(message ?? "Invalid booking details.");
        return;
      }

      setBookingError("Something went wrong while booking.");
    },
  });

  /* ---------------- VALIDATION ---------------- */

  const validateStep = () => {
    const newErrors: typeof errors = {};

    if (!date || !time) {
      newErrors.date = "Please select a date and time.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- BOOKING ---------------- */

  const bookAppointment = () => {
    if (!date || !time || !user) return;

    const formattedDate = format(date, "yyyy-MM-dd");

    const fullName =
      user.user_metadata.full_name ??
      user.user_metadata.first_name + " " + user.user_metadata.last_name; // Fallback if full_name is not available

    addAppointmentMutation.mutate({
      service_id: service.id,
      user_id: user.id,
      name: fullName,
      email: user.email!,
      date: formattedDate,
      start_time: time,
      duration: service.duration,
      price: service.price,
    });
  };

  /* ---------------- CONFIRM BUTTON ---------------- */

  const handleConfirm = () => {
    if (!validateStep()) return;

    if (!user) {
      toast.info("Please log in to confirm your booking.");
      navigate(`/auth/login`);
      return;
    }

    bookAppointment();
  };

  /* ---------------- RESET ---------------- */

  useEffect(() => {
    if (!open) return;

    setSubmitted(false);
    setBookingError(null);
  }, [open]);

  /* ---------------- UI ---------------- */

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <CalendarIcon className="h-4 w-4" />
          <span>Book now</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="md:min-w-2xl max-w-full mt-4 top-4 translate-y-0 px-2 md:px-4 max-h-[80vh] md:max-h-[90vh] flex flex-col overflow-hidden">
        {bookingError ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircleIcon className="h-6 w-6 text-destructive" />
            </div>

            <h3 className="mt-4 text-base font-serif font-semibold text-foreground">
              Booking failed
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground max-w-xs">
              {bookingError}
            </p>

            <div className="mt-6 flex gap-3 w-full">
              <Button
                variant="secondary"
                onClick={() => setOpen(false)}
                className="flex-1"
              >
                Browse services
              </Button>
              <Button
                onClick={() => navigate("/profile/appointments")}
                className="flex-1"
              >
                My appointments
              </Button>
            </div>
          </div>
        ) : submitted ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
              <CheckIcon className="h-8 w-8 text-accent" />
            </div>

            <h3 className="mt-4 font-serif text-xl font-bold text-primary">
              Booking request sent!
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-xs">
              You'll receive a confirmation email once approved.
            </p>

            {/* Summary card */}
            <div className="mt-5 w-full rounded-xl bg-muted/50 border border-border divide-y divide-border text-sm">
              <div className="flex justify-between gap-4 items-start px-4 py-2.5">
                <span className="text-muted-foreground shrink-0">Service</span>
                <span className="font-medium text-foreground text-end wrap-break-word min-w-0">
                  {service.title}
                </span>
              </div>
              <div className="flex justify-between items-center px-4 py-2.5">
                <span className="text-muted-foreground">Date & time</span>
                <span className="font-medium text-foreground">
                  {date && format(date, "d MMMM")} · {time}
                </span>
              </div>
              <div className="flex justify-between items-center px-4 py-2.5">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium text-foreground">
                  {service.duration} min
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs text-muted-foreground/60">
              Payment will be requested only after approval.
            </p>

            <div className="mt-6 flex gap-3 w-full">
              <Button
                variant="secondary"
                onClick={() => setOpen(false)}
                className="flex-1"
              >
                Browse services
              </Button>
              <Button
                onClick={() => navigate("/profile/appointments")}
                className="flex-1"
              >
                My appointments
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="text-start mt-2 shrink-0">
              <DialogTitle className="font-serif">{service.title}</DialogTitle>
              <DialogDescription className="text-sm font-sans">
                Schedule your appointment
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 min-h-0 overflow-y-auto px-1">
              <BookingCalendar
                bookedDates={bookedDates}
                errors={error}
                isLoading={isLoading}
                slots={timeSlots}
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
              />

              {errors.date && (
                <p className="text-sm text-destructive">{errors.date}</p>
              )}
            </div>

            <DialogFooter className="flex flex-col md:flex-row-reverse w-full md:justify-start gap-2 shrink-0 border-t pt-4 mt-2">
              <Button
                disabled={addAppointmentMutation.isPending}
                onClick={handleConfirm}
                className="w-full md:w-auto"
              >
                {addAppointmentMutation.isPending ? (
                  "Booking..."
                ) : user ? (
                  <>
                    <CheckIcon className="h-4 w-4" />
                    Confirm booking
                  </>
                ) : (
                  <>
                    <LogInIcon className="h-4 w-4" />
                    Login to confirm
                  </>
                )}
              </Button>

              <DialogClose asChild>
                <Button variant="secondary" className="w-full md:w-auto">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
