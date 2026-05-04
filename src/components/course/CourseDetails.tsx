import { Badge } from "@/components/ui/badge";
import { useCourses } from "@/hooks/useCourses";
import { ArrowLeft, BarChart3, Clock, Users } from "lucide-react";
import { Link, Navigate, useParams } from "react-router";
import Loader from "../ui/loader";
import CourseDayCard from "./CourseDayCard";
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
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 lg:py-28">
          {/* Left content */}
          <div className="flex flex-col">
            <Link
              to="/courses"
              className="mb-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-primary-foreground/60 transition-colors hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Courses
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-accent/80 capitalize">
                Level: {course?.level}
              </Badge>
              {course?.is_open ? (
                <Badge variant="outline" className="text-primary-foreground">
                  Open for enrollments
                </Badge>
              ) : (
                <Badge variant="destructive">Not available</Badge>
              )}
            </div>

            <h1 className="mt-5 text-3xl font-serif font-bold text-primary-foreground md:text-4xl lg:text-5xl text-balance leading-tight">
              {course?.title}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-primary-foreground/70 md:text-lg text-pretty">
              {course?.description}
            </p>

            {/* Meta pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                {
                  icon: <Clock className="h-4 w-4" />,
                  label: `${course?.duration_days} days`,
                },
                {
                  icon: <BarChart3 className="h-4 w-4" />,
                  label: course?.level,
                  className: "capitalize",
                },
                {
                  icon: <Users className="h-4 w-4" />,
                  label: `${course?.remaining_spots} / ${course?.available_spots} spots left`,
                  visible: course?.is_open,
                },
              ]
                .filter((item) => item.visible !== false)
                .map((item, i) => (
                  <span
                    key={i}
                    className={`inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/10 px-3 py-1.5 text-sm text-primary-foreground/80 ${item.className ?? ""}`}
                  >
                    <span className="text-accent">{item.icon}</span>
                    {item.label}
                  </span>
                ))}
            </div>

            {/* Price + CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div>
                <p className="text-3xl font-bold text-gold">
                  € {course?.price}
                </p>
                {course?.advance_price && (
                  <p className="mt-0.5 text-sm text-primary-foreground/60">
                    Deposit from{" "}
                    <span className="font-semibold text-primary-foreground/80">
                      € {course.advance_price}
                    </span>
                  </p>
                )}
              </div>
              {course?.is_open && <CourseEnrollmentDialog course={course} />}
            </div>
          </div>

          {/* Right image */}
          <div className="relative w-fit flex items-center justify-center">
            <div className="absolute -inset-4 rounded-3xl bg-gold/10 blur-2xl" />
            <div className="relative w-fit overflow-hidden rounded-2xl border-2 border-gold/30 shadow shadow-gold/20">
              <img
                src={course?.image_url}
                alt={course?.title}
                className="w-auto max-h-80 md:max-h-[500px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            <div className="rounded-2xl border border-border bg-background p-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">
                About This Course
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
                {course?.description}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                What you'll learn
              </h2>
              <div className="flex flex-col gap-4">
                {course?.course_day?.map((day) => (
                  <CourseDayCard day={day} key={day.id} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-4">
              <div className="rounded-2xl border border-border bg-background p-8 shadow-xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Course Investment
                </p>

                <p className="mt-3 text-4xl font-bold text-gold">
                  € {course?.price}
                </p>

                {course?.advance_price && (
                  <>
                    <div className="mt-4 rounded-xl bg-accent/10 border border-accent/20 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent/70">
                        Secure your seat with
                      </p>
                      <p className="mt-1 text-2xl font-bold text-accent">
                        € {course.advance_price}
                        <span className="text-sm font-normal ml-1">
                          deposit
                        </span>
                      </p>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Remaining balance:{" "}
                      <span className="font-semibold text-foreground">
                        € {course.price - course.advance_price}
                      </span>
                    </p>
                  </>
                )}

                {course?.is_open && (
                  <>
                    <div className="my-6 border-t border-border" />
                    <CourseEnrollmentDialog
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      course={course}
                    />
                    <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4 text-accent shrink-0" />
                      <span>
                        {course.remaining_spots} of {course.available_spots}{" "}
                        spots remaining
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Quick facts card */}
              <div className="rounded-2xl border border-border bg-background p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  Quick Facts
                </p>
                <ul className="flex flex-col gap-3 text-sm">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 text-accent shrink-0" />
                    {course?.duration_days} day(s)
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground capitalize">
                    <BarChart3 className="h-4 w-4 text-accent shrink-0" />
                    {course?.level} level
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
