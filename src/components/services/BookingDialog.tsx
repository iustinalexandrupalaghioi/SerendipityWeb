import { useAuth } from "@/contexts/AuthContext";
import { useAvailableHours } from "@/hooks/useAvailableHours";
import { useFullyBookedDates } from "@/hooks/useBookedDates";
import { supabase } from "@/lib/supabaseClient";
import type { Service } from "@/types/Service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ArrowLeft,
  ArrowRight,
  CalendarIcon,
  CheckIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { BookingCalendar } from "./BookingCalendar";
import BookingForm from "./BookingForm";

interface BookingDialogProps {
  service: Service;
}

const BookingDialog = ({ service }: BookingDialogProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  /* -------------------- STATE -------------------- */
  const [submitted, setSubmitted] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string | undefined>("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState<{
    date?: string;
    name?: string;
    email?: string;
  }>({});

  /* -------------------- MUTATION -------------------- */

  const { data: bookedDates } = useFullyBookedDates({
    serviceDuration: service.duration,
    enabled: true,
  });

  useEffect(() => {
    if (!bookedDates || bookedDates.length === 0) return;

    const today = new Date();
    const isTodayBooked = bookedDates.some(
      (d) => format(new Date(d), "yyyy-MM-dd") === format(today, "yyyy-MM-dd"),
    );

    if (isTodayBooked && (!date || date === today)) {
      // find the next available date
      let nextDate = new Date(today);
      while (
        bookedDates.some(
          (d) =>
            format(new Date(d), "yyyy-MM-dd") ===
            format(nextDate, "yyyy-MM-dd"),
        )
      ) {
        nextDate.setDate(nextDate.getDate() + 1);
      }
      setDate(nextDate);
    }
  }, [bookedDates, date]);

  const {
    data: timeSlots,
    isLoading,
    error,
  } = useAvailableHours({
    date: format(date ? date : new Date(), "yyyy-MM-dd"),
    duration: service.duration,
    enabled: true,
  });

  const addAppointmentMutation = useMutation({
    mutationFn: async (values: {
      service_id: string;
      user_id: string | null;
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
          "You already have an active appointment. Please wait for it to be confirmed or cancel it before booking a new one.",
        );
        return;
      }

      if (error.code === "42501") {
        setBookingError(
          "You are not allowed to book an appointment. Please contact me on email for assistance.",
        );
        return;
      }

      setBookingError("Something went wrong while booking your appointment.");
    },
  });

  /* -------------------- DERIVED -------------------- */

  const isFirstStep = step === 1;
  const isSecondStep = step === 2;
  const isLoggedIn = !!user;

  const isNextDisabled =
    addAppointmentMutation.isPending || (isFirstStep && (!date || !time));

  /* -------------------- VALIDATION -------------------- */

  const validateStep = () => {
    const newErrors: typeof errors = {};

    if (!date) newErrors.date = "Please select a date.";
    if (!time) newErrors.date = "Please select a time.";

    if (isSecondStep && !isLoggedIn) {
      if (!name.trim()) newErrors.name = "Full name is required.";

      if (!email.trim()) {
        newErrors.email = "Email is required.";
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        newErrors.email = "Invalid email format.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* -------------------- BOOKING -------------------- */

  const bookAppointment = () => {
    if (!date || !time) return;

    const formattedDate = format(date, "yyyy-MM-dd");

    const fullName = user
      ? `${user.user_metadata?.first_name ?? ""} ${
          user.user_metadata?.last_name ?? ""
        }`.trim()
      : name;

    addAppointmentMutation.mutate({
      service_id: service.id,
      user_id: user?.id ?? null,
      name: fullName,
      email: user?.email ?? email,
      date: formattedDate,
      start_time: time,
      duration: service.duration,
      price: service.price,
    });
  };

  /* -------------------- PRIMARY ACTION -------------------- */

  const handlePrimaryAction = () => {
    if (!validateStep()) return;

    // Logged in → book immediately
    if (isLoggedIn && isFirstStep) {
      bookAppointment();
      return;
    }

    // Guest → go to step 2
    if (!isLoggedIn && isFirstStep) {
      setStep(2);
      return;
    }

    // Guest step 2 → book
    if (!isLoggedIn && isSecondStep) {
      bookAppointment();
    }
  };

  const handleBack = () => setStep((prev) => prev - 1);

  /* -------------------- RESET ON OPEN -------------------- */

  useEffect(() => {
    if (!open) return;

    setStep(1);
    setDate(undefined);
    setTime("");
    setName("");
    setEmail("");
    setErrors({});
    setSubmitted(false);
    setBookingError("");
  }, [open]);

  /* -------------------- LABEL -------------------- */

  const primaryLabel =
    isFirstStep && !isLoggedIn ? (
      <>
        Next <ArrowRight className="ml-1 h-4 w-4" />
      </>
    ) : (
      <>
        <CheckIcon className="mr-1 h-4 w-4" />
        Confirm
      </>
    );

  /* -------------------- UI -------------------- */

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Book now
        </Button>
      </DialogTrigger>

      <DialogContent className="md:min-w-2xl max-w-full mt-4 top-4 translate-y-0 px-2 md:px-4 max-h-[80vh] overflow-y-auto">
        {bookingError ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/20">
              <XIcon className="h-8 w-8 text-destructive" />
            </div>

            <h3 className="mt-4 font-serif text-xl font-bold text-card-foreground">
              Booking Failed
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">{bookingError}</p>

            <div className="mt-6 flex w-full gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setBookingError(null)}
              >
                Try Again
              </Button>

              <Button className="flex-1" onClick={() => setOpen(false)}>
                Close
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

            <Button
              variant="outline"
              className="mt-6 w-full"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="text-start">
              <DialogTitle className="text-primary">
                Schedule your appointment
              </DialogTitle>
              <DialogDescription className="hidden">
                Select a date and time for your appointment.
              </DialogDescription>
            </DialogHeader>

            {isFirstStep && (
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
            )}

            {errors.date && (
              <p className="text-sm text-destructive mt-2">{errors.date}</p>
            )}

            {isSecondStep && !isLoggedIn && (
              <BookingForm
                name={name}
                email={email}
                onNameChange={setName}
                onEmailChange={setEmail}
                errors={errors}
              />
            )}

            <DialogFooter className="flex w-full flex-col gap-2 md:flex-row-reverse md:justify-start">
              <Button
                disabled={isNextDisabled}
                onClick={handlePrimaryAction}
                className="w-full md:w-auto"
              >
                {addAppointmentMutation.isPending ? "Booking..." : primaryLabel}
              </Button>

              {!isLoggedIn && isSecondStep && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="w-full md:w-auto"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back
                </Button>
              )}

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
