import { useAuth } from "@/contexts/AuthContext";
import { useAvailableHours } from "@/hooks/useAvailableHours";
import { useFullyBookedDates } from "@/hooks/useBookedDates";
import { supabase } from "@/lib/supabaseClient";
import type { Service } from "@/types/Service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, CheckIcon, LogInIcon } from "lucide-react";
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
    enabled: true,
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

      const { error } = await supabase
        .from("appointment")
        .insert([
          {
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
          },
        ])
        .single();

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setSubmitted(true);
    },

    onError: (error: any) => {
      if (error.code === "23505") {
        setBookingError(
          "You already have an active appointment. Please wait until it is confirmed or cancel it.",
        );
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

    const fullName = user.user_metadata.full_name.trim();

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

      <DialogContent className="md:min-w-2xl max-w-full mt-4 top-4 translate-y-0 px-2 md:px-4 max-h-[80vh] overflow-y-auto">
        {bookingError ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/20">
              <CalendarIcon className="h-8 w-8 text-destructive" />
            </div>

            <p className="mt-2 text-sm text-muted-foreground">{bookingError}</p>

            <div className="mt-6 flex gap-4 w-full">
              <Button
                variant="secondary"
                onClick={() => navigate("/services")}
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
              <CalendarIcon className="h-8 w-8 text-accent" />
            </div>

            <h3 className="mt-4 font-serif text-xl font-bold text-primary">
              Booking request sent!
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {`Your ${service.title} appointment request has been submitted.`}
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              I will review your request and send you a confirmation email once
              approved.
            </p>

            <p className="mt-1 text-xs text-muted-foreground/70">
              Payment will be requested only after approval.
            </p>

            <div className="mt-6 flex gap-4 w-full">
              <Button
                variant="secondary"
                onClick={() => navigate("/services")}
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
            <DialogHeader>
              <DialogTitle>Schedule your appointment</DialogTitle>
            </DialogHeader>

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

            <DialogFooter className="flex flex-col md:flex-row-reverse w-full md:justify-start gap-2">
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
