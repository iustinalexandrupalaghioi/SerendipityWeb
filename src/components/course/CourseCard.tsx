import { cn } from "@/lib/utils";
import type { Course } from "@/types/Course";
import { format } from "date-fns/format";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock,
  Users,
} from "lucide-react";
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
    <div className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-lg">
      <div
        className={`grid gap-0 md:grid-cols-5 ${
          index % 2 !== 0 ? "md:[direction:rtl]" : ""
        }`}
      >
        {/* Image */}
        <div className="relative overflow-hidden md:col-span-2 flex items-center justify-center bg-muted aspect-4/3 md:aspect-auto md:min-h-[280px] md:max-h-[500px]">
          <img
            src={course.image_url}
            alt={course.title}
            className="h-full w-full object-cover object-top lg:w-auto lg:object-contain max-h-[280px] lg:max-h-[500px] transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 p-4 md:p-8 md:col-span-3 md:[direction:ltr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className={cn("capitalize", levelColors[course.level])}
              >
                Level: {course.level}
              </Badge>
              {course.is_open && (
                <Badge variant="default">Open for enrollments</Badge>
              )}
              {!course.is_open && (
                <Badge variant="destructive">Not available</Badge>
              )}
            </div>
            <h2 className="mt-3 font-serif text-xl md:text-2xl font-bold text-card-foreground">
              {course.title}
            </h2>
            tsx
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
              <Clock className="h-4 w-4 text-accent" />
              {course.duration_days} days
            </span>
            <span className="flex items-center gap-1.5 capitalize">
              <BarChart3 className="h-4 w-4 text-accent" />
              {course.level}
            </span>
            {course.is_open && (
              <>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-accent" />
                  Starts {format(course.start_date, "dd-MMM-yyy")}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-accent" />
                  {course.remaining_spots} spots left
                </span>
              </>
            )}
            <span className="flex items-center gap-1.5 font-semibold text-accent">
              € {course.price}
            </span>
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
                  className="flex items-start gap-2 text-sm text-card-foreground"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {item.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {course.is_open && <CourseEnrollmentDialog course={course} />}
            <Link to={`/courses/${course.id}`}>
              <Button
                variant="outline"
                className="border-border text-muted-foreground hover:text-foreground"
              >
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
