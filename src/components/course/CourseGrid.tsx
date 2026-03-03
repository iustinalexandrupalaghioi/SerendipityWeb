import { useCourses } from "@/hooks/useCourses";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock,
  EuroIcon,
  Users,
} from "lucide-react";
import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CourseEnrollmentDialog } from "./CourseEnrollmentDialog";

const levelColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-800 border-green-200",
  Intermediate: "bg-accent/20 text-accent-foreground border-accent/30",
  Advanced: "bg-primary/10 text-primary border-primary/20",
};

const CourseGrid = () => {
  const { data: courses } = useCourses();
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex flex-col gap-12">
        {courses?.map((course, index) => (
          <div
            key={course.id}
            className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-lg"
          >
            <div
              className={`grid gap-0 lg:grid-cols-5 ${
                index % 2 !== 0 ? "lg:[direction:rtl]" : ""
              }`}
            >
              {/* Image */}
              <div className="relative aspect-16/10 overflow-hidden lg:col-span-2 lg:aspect-auto lg:min-h-[360px]">
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105 h-full w-full"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-6 p-8 lg:col-span-3 lg:[direction:ltr]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge
                      variant="outline"
                      className={cn("capitalize", levelColors[course.level])}
                    >
                      {course.level}
                    </Badge>
                    {course.is_open && (
                      <Badge variant="outline">Open for enrollments</Badge>
                    )}
                  </div>
                  <h2 className="mt-3 font-serif text-2xl font-bold text-card-foreground">
                    {course.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {course.description}
                  </p>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-accent" />
                    {course.duration_days} days
                  </span>
                  <span className="flex items-center gap-1.5 capitalize">
                    <BarChart3 className="h-4 w-4 text-accent" />
                    {course.level}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-accent" />
                    Starts {format(course.start_date, "dd-MMM-yyy")}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-accent" />
                    {course.remaining_spots} spots left
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-accent">
                    <EuroIcon className="h-4 w-4" />
                    {course.price}
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

                <div className="flex flex-wrap items-center gap-3">
                  <CourseEnrollmentDialog course={course} />
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
        ))}
      </div>
    </section>
  );
};

export default CourseGrid;
