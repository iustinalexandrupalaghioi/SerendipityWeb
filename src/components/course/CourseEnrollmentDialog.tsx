import { format } from "date-fns";
import { GraduationCap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import type { Course } from "@/types/Course";
import { SimpleCalendarInput } from "../partials/SimpleCalendarInput";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface Props {
  course: Course;
  className?: string;
}

function calculateAge(dob: string) {
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const month = today.getMonth() - birth.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export function CourseEnrollmentDialog({ course, className }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  const [enrollmentError, setEnrollmentError] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [paymentType, setPaymentType] = useState<"deposit" | "full">("deposit");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const hundredYearsAgo = useMemo(
    () => new Date(new Date().getFullYear() - 100, 0, 1),
    [],
  );

  useEffect(() => {
    if (!open) return;

    if (user) {
      setFullName(
        user.user_metadata.full_name
          ? user.user_metadata.full_name.trim()
          : `${user.user_metadata.first_name.trim()} ${user.user_metadata.last_name.trim()}`,
      );
      setEmail(user.email.trim() ?? "");
      setDob(user.user_metadata?.date_of_birth ?? "");
    }

    setSelectedSession("");
    setErrors({});
    setAlreadyEnrolled(false);
    setEnrollmentError(null);
  }, [open, user]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!dob) newErrors.dob = "Date of birth is required.";
    else if (calculateAge(dob) < 18)
      newErrors.dob = "You must be at least 18 years old.";
    if (!selectedSession) newErrors.session = "Please select a session.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const { data, error } = await supabase.functions.invoke(
        "create-enrollment",
        {
          body: {
            course_id: course.id,
            session_id: selectedSession,
            user_id: user!.id,
            payment_type: paymentType,
            dob,
            action_type: "create_enrollment",
            price: course.course_session?.find((s) => s.id === selectedSession)
              ?.price,
            advance_price: course.course_session?.find(
              (s) => s.id === selectedSession,
            )?.advance_price,
          },
        },
      );

      if (error) throw error;

      const { checkout_url } = data?.data ?? data;

      if (checkout_url) {
        window.location.href = checkout_url;
      } else {
        toast.error("Could not redirect to checkout. Please try again.");
      }
    } catch (err: any) {
      const status = err?.context?.status;
      const body = await err?.context?.json().catch(() => null);
      const message = body?.error;

      if (status === 409) {
        setAlreadyEnrolled(true);
        return;
      }

      if (status === 400) {
        setEnrollmentError(message ?? "Invalid enrollment details.");
        return;
      }

      toast.error(message ?? "Something went wrong while enrolling.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "bg-accent text-accent-foreground hover:bg-accent/90 font-semibold",
            className,
          )}
          onClick={() => {
            if (!user) {
              toast.error("You must have an account to enroll.");
              navigate("/auth/login", { state: { from: location.pathname } });
              return;
            }
            setOpen(true);
          }}
        >
          <GraduationCap className="mr-2 h-4 w-4" />
          Enroll now
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-card mt-4 top-4 translate-y-0">
        {alreadyEnrolled ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/20">
              <GraduationCap className="h-8 w-8 text-destructive" />
            </div>

            <h3 className="mt-4 font-serif text-xl font-bold text-destructive">
              Already enrolled
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              You are already enrolled in{" "}
              <span className="font-medium text-primary">{course.title}</span>.
            </p>

            <div className="mt-6 flex gap-4 w-full">
              <Button
                variant="secondary"
                onClick={() => navigate("/courses")}
                className="flex-1"
              >
                Browse courses
              </Button>
              <Button
                onClick={() => navigate("/profile/enrollments")}
                className="flex-1"
              >
                My enrollments
              </Button>
            </div>
          </div>
        ) : enrollmentError ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/20">
              <GraduationCap className="h-8 w-8 text-destructive" />
            </div>

            <h3 className="mt-4 font-serif text-xl font-bold text-destructive">
              Enrollment failed
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {enrollmentError}
            </p>

            <Button
              className="mt-6 w-full"
              variant="secondary"
              onClick={() => setEnrollmentError(null)}
            >
              Go back
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
            <DialogHeader>
              <DialogTitle className="font-serif text-lg text-primary">
                Enroll to {course.title}
              </DialogTitle>

              <DialogDescription>
                <span className="capitalize">{course.level}</span> ·{" "}
                {course.duration_days} day(s) · € {course.price}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2">
              <Label>Full name</Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <SimpleCalendarInput
                startMonth={hundredYearsAgo}
                label="Date of Birth"
                value={dob}
                onChange={setDob}
              />
              {errors.dob && (
                <p className="text-sm text-destructive">{errors.dob}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Session</Label>

              <div className="flex items-center flex-wrap gap-3 overflow-x-auto pb-1">
                {(course.course_session ?? [])
                  .filter((s) => s.is_open && s.remaining_spots > 0)
                  .map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSession(s.id)}
                      type="button"
                      className={cn(
                        "shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-all",
                        selectedSession === s.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
                      )}
                    >
                      {format(s.start_date, "dd MMM yyyy")}
                    </button>
                  ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Payment type</Label>
              <RadioGroup
                value={paymentType}
                onValueChange={(value: "deposit" | "full") =>
                  setPaymentType(value)
                }
                className="space-y-2"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="deposit" id="pay-advance" />
                  <Label htmlFor="pay-advance">
                    Deposit (€ {course.advance_price})
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroupItem value="full" id="pay-full" />
                  <Label htmlFor="pay-full">
                    Full amount (€ {course.price})
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              {loading ? "Redirecting to payment..." : "Submit enrollment"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
