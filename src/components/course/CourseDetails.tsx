import { Badge } from "@/components/ui/badge";
import { useCourses } from "@/hooks/useCourses";
import { format } from "date-fns";
import {
  AlertCircle,
  ArrowLeft,
  BarChart3,
  CalendarDays,
  CheckCircleIcon,
  Clock,
  EuroIcon,
  Users,
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router";
import { Card, CardContent } from "../ui/card";
import Loader from "../ui/loader";
import { CourseEnrollmentDialog } from "./CourseEnrollmentDialog";

export default function CourseDetails() {
  const { id } = useParams();
  const { data, error, isLoading } = useCourses();
  const course = data?.find((c) => c.id === id);

  if (isLoading) return <Loader />;

  if ((error && !isLoading) || (!course && !isLoading)) {
    return <Navigate to="/error" />;
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-primary">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          {/* LEFT CONTENT */}
          <div>
            <Link
              to="/courses"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Courses
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="default" className="bg-accent/80">
                {course?.level}
              </Badge>

              {course?.is_open && course?.remaining_spots <= 3 && (
                <Badge
                  variant="outline"
                  className="border-destructive/30 bg-destructive/10 text-destructive"
                >
                  <AlertCircle className="mr-1 h-3 w-3" />
                  Only {course?.remaining_spots} spots left
                </Badge>
              )}
            </div>

            <h1 className="mt-4 font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl text-balance">
              {course?.title}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-primary-foreground/70 md:text-lg text-pretty">
              {course?.description}
            </p>
            {/* Meta Row */}
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                {course?.duration_days} days
              </span>
              <span className="flex items-center gap-2 capitalize">
                <BarChart3 className="h-4 w-4 text-accent" />
                {course?.level}
              </span>
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-accent" />
                Starts{" "}
                {course?.start_date && format(course.start_date, "dd-MMM-yyyy")}
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-accent" />
                {course?.remaining_spots} of {course?.available_spots} spots
                left
              </span>
              <span className="flex items-center gap-2 font-semibold text-accent">
                <EuroIcon className="h-4 w-4" />
                {course?.price}
              </span>
            </div>

            <div className="mt-8 max-w-xs">
              {course && <CourseEnrollmentDialog course={course} />}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <img
              src={course?.image_url}
              alt={course?.title}
              className="w-full rounded-2xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                About This Course
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
                {course?.description}
              </p>
            </div>

            <div className="mt-6">
              <h2 className="font-serif text-2xl font-bold text-foreground ">
                What you'll learn
              </h2>

              <div className="mt-6 flex flex-col gap-4">
                {course?.course_day?.map((day, index) => (
                  <Card key={index} className="overflow-hidden ">
                    <CardContent className="flex flex-col md:flex-row">
                      <div className="md:w-40 h-40 shrink-0 mb-4 md:mb-0">
                        <img
                          src={day.image_url}
                          alt={day.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1 md:pl-6">
                        <div className="flex flex-col items-start gap-3 mb-3">
                          <Badge
                            variant="outline"
                            className="bg-primary/10 text-primary border-primary/20"
                          >
                            Day {day.day_number}
                          </Badge>
                          <h3 className="text font-semibold">{day.title}</h3>
                        </div>
                        <ul className="space-y-2">
                          {!error &&
                            !isLoading &&
                            day.course_day_activity?.map((activity) => (
                              <li
                                key={activity.id}
                                className="flex items-center gap-3 text-foreground/80"
                              >
                                <CheckCircleIcon className="w-4 h-4 shrink-0 text-primary self-start mt-0.5" />
                                <span className="text-sm whitespace-pre-line">
                                  {activity.activity}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Course Investment
                </p>

                {/* Full Price */}
                <p className="mt-3 font-serif text-4xl font-bold text-card-foreground flex items-center">
                  <EuroIcon />
                  {course?.price}
                </p>

                {/* Advance Required */}
                {course?.advance_price && (
                  <div className="mt-4 rounded-lg bg-accent/10 p-4">
                    <p className="text-sm font-medium text-accent">
                      Secure your seat with
                    </p>
                    <p className="text-xl font-semibold text-accent flex items-center">
                      <EuroIcon />
                      {course?.advance_price} deposit
                    </p>
                  </div>
                )}

                {/* Remaining */}
                {course?.advance_price && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    Remaining balance:{" "}
                    <span className="flex items-center">
                      <EuroIcon className="h-4 w-4" />
                      {course?.price - course?.advance_price}
                    </span>
                  </p>
                )}

                <div className="mt-6">
                  <CourseEnrollmentDialog
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    course={course!}
                  />
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 text-accent" />
                  <span>
                    {course?.remaining_spots} of {course?.available_spots} spots
                    remaining
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
