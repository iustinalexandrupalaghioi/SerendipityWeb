import { cn } from "@/lib/utils";
import type { Course } from "@/types/Course";
import { ArrowRight, BarChart3, Check, Clock, Users } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CourseEnrollmentDialog } from "./CourseEnrollmentDialog";

interface CourseCardProps {
  course: Course;
  index: number;
}

const levelColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-800 border-green-200",
  Intermediate: "bg-accent/20 text-accent-foreground border-accent/30",
  Advanced: "bg-primary/10 text-primary border-primary/20",
};

const CourseCard = ({ course, index }: CourseCardProps) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:border-gold/50 hover:shadow-xl hover:shadow-gold/5">
      <div
        className={cn(
          "grid md:grid-cols-5",
          index % 2 !== 0 && "md:[direction:rtl]",
        )}
      >
        {/* Image */}
        <div className="relative overflow-hidden md:col-span-2 aspect-4/3 md:aspect-auto bg-muted flex items-center justify-center">
          <img
            src={course.image_url}
            alt={course.title}
            className="h-full w-full md:max-h-[550px] object-cover object-top lg:object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 p-6 md:p-8 md:col-span-3 md:[direction:ltr]">
          {/* Badges + Title + Description */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className={cn("capitalize", levelColors[course.level])}
              >
                Level: {course.level}
              </Badge>
              {course.is_open ? (
                <Badge variant="default">Open for enrollments</Badge>
              ) : (
                <Badge variant="destructive">Not available</Badge>
              )}
            </div>

            <h2 className="mt-3 text-xl md:text-2xl font-bold text-foreground line-clamp-2">
              {course.title}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              <span className="lg:hidden">
                {course.description.length > 150
                  ? course.description.slice(0, 150) + "..."
                  : course.description}
              </span>
              <span className="hidden lg:block">{course.description}</span>
            </p>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {course.duration_days} days
            </span>
            <span className="flex items-center gap-1.5 capitalize">
              <BarChart3 className="h-4 w-4" />
              {course.level}
            </span>
            {course.is_open && (
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>
                  <span className="text-foreground font-medium">
                    {course.remaining_spots}
                  </span>
                  <span className="text-muted-foreground">
                    /{course.available_spots} spots left
                  </span>
                </span>
              </span>
            )}
          </div>

          {/* Highlights */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              What you will learn
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {course.course_day?.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20">
                    <Check className="h-3.5 w-3.5 text-gold-dark" />
                  </div>
                  {item.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold text-gold">
                € {course.price}
              </span>
              <span className="text-xs text-muted-foreground">
                Deposit:{" "}
                <span className="font-semibold text-gold/70">
                  € {course.advance_price}
                </span>
              </span>
              {course.is_open && (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>
                    <span
                      className={
                        course.remaining_spots === 0
                          ? "text-destructive font-medium"
                          : "text-foreground font-medium"
                      }
                    >
                      {course.remaining_spots}
                    </span>
                    <span className="text-muted-foreground">
                      /{course.available_spots} spots left
                    </span>
                  </span>
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {course.is_open && (
                <CourseEnrollmentDialog
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  course={course}
                />
              )}
              <Link to={`/courses/${course.id}`}>
                <Button
                  variant="outline"
                  className="border-border text-muted-foreground hover:text-foreground"
                >
                  View details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
