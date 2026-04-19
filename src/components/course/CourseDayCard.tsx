import type { CourseDay } from "@/types/Course";
import { Check } from "lucide-react";
import { Badge } from "../ui/badge";

interface CourseDayCardProps {
  day: CourseDay;
}

const CourseDayCard = ({ day }: CourseDayCardProps) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:border-gold/50 hover:shadow-xl hover:shadow-gold/5">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative overflow-hidden md:w-56 md:shrink-0 aspect-4/3 md:aspect-auto">
          <img
            src={day.image_url}
            alt={day.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent md:hidden" />
          <Badge className="absolute left-3 top-3">Day {day.day_number}</Badge>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 p-6 flex-1">
          <h3 className="text-lg font-serif font-bold text-foreground">
            {day.title}
          </h3>

          <ul className="space-y-2">
            {day.course_day_activity?.map((activity) => (
              <li
                key={activity.id}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 mt-0.5">
                  <Check className="h-3 w-3 text-gold-dark" />
                </div>
                {activity.activity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDayCard;
