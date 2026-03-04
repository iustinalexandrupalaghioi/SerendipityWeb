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
import CheckoutButton from "../partials/CheckoutButton";

interface Props {
  course: Course;
  className?: string;
}

function calculateAge(dob: string) {
  const today = new Date();
  const birth = new Date(dob);

  let age = today.getFullYear() - birth.getFullYear();
  const month = today.getMonth() - birth.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

export function CourseEnrollmentDialog({ course, className }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const hundredYearsAgo = useMemo(() => {
    return new Date(new Date().getFullYear() - 100, 0, 1);
  }, []);

  // Prefill user data safely
  useEffect(() => {
    if (!open) return;

    if (user) {
      const first = user.user_metadata?.first_name ?? "";
      const last = user.user_metadata?.last_name ?? "";

      setFullName(`${first} ${last}`.trim());
      setEmail(user.email ?? "");
      setDob(user.user_metadata?.date_of_birth ?? "");
    }

    setSubmitted(false);
    setErrors({});
  }, [open, user]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!dob) newErrors.dob = "Date of birth is required.";
    else if (calculateAge(dob) < 18)
      newErrors.dob = "You must be at least 18 years old.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createEnrollment = async () => {
    const { error, data } = await supabase
      .from("course_enrollment")
      .insert({
        course_id: course.id,
        user_id: user!.id,
        course_date: course.start_date,
        price: Number(course.price),
        advance_price: Number(course.advance_price),
      })
      .select()
      .single();

    if (!error && data) {
      setEnrollmentId(data.id);
    }

    return error;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const error = await createEnrollment();

      if (error) {
        if (error.code === "23505") {
          setAlreadyEnrolled(true);
          return;
        }

        throw error;
      }

      setSubmitted(true);
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong while enrolling.");
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
          Enroll Now
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
        ) : submitted ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
              <GraduationCap className="h-8 w-8 text-accent" />
            </div>

            <h3 className="mt-4 font-serif text-xl font-bold text-primary">
              Enrollment submitted
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              You've enrolled in{" "}
              <span className="font-medium text-primary">{course.title}</span>.
            </p>

            <p className="mt-3 text-sm text-muted-foreground">
              To reserve your spot, please complete the advance payment of{" "}
              <span className="font-semibold text-primary">
                € {course.advance_price}
              </span>
              .
            </p>

            <div className="mt-6 w-full">
              {enrollmentId && (
                <CheckoutButton
                  id={enrollmentId}
                  type="enrollment"
                  text={`Confirm enrollment - € ${course.advance_price}`}
                />
              )}
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              If you have any questions, feel free to contact me on email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
            <DialogHeader>
              <DialogTitle className="font-serif text-lg text-primary">
                Enroll in {course.title}
              </DialogTitle>

              <DialogDescription>
                {course.level} · {course.duration_days} days · € {course.price}
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

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              {loading ? "Submitting..." : "Submit enrollment"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
