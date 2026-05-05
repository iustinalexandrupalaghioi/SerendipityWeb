import type { Course } from "@/types/Course";
import { ArrowRight, BarChart3, Clock, Users } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";

interface CourseSmallCardProps {
  course: Course;
}

const CourseSmallCard = ({ course }: CourseSmallCardProps) => {
  return (
    <div className="group h-full flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:border-gold/50 hover:shadow-xl hover:shadow-gold/5">
      {/* Image */}

      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={course.image_url}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="mt-2 text-xl font-bold text-foreground line-clamp-2 min-h-14">
          {course.title}
        </h3>
        <p className="mt-3 text md:text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {course.description}
        </p>

        <div className="my-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{course.duration_days} day(s)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BarChart3 className="h-4 w-4" />
            <span className="capitalize"> {course.level}</span>
          </div>
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

        {/* mt-auto pushes footer to bottom */}
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-lg font-bold text-gold">
              € {course.price}
            </span>
            {course.advance_price && (
              <span className="text-xs text-muted-foreground">
                Deposit:{" "}
                <span className="font-semibold text-gold/70">
                  € {course.advance_price}
                </span>
              </span>
            )}
          </div>
          <Link to={`/courses/${course.id}`}>
            <Button>
              View details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseSmallCard;
