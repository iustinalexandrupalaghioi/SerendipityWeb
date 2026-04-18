import type { CourseDay } from "@/types/Course";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

interface CourseDayCardProps {
  day: CourseDay;
  index: number;
}

const CourseDayCard = ({ day, index }: CourseDayCardProps) => {
  return (
    <Card key={index} className="group overflow-hidden md:py-0 pt-0">
      {/* Mobile: full-width top image (like ServiceCard) */}
      <figure className="relative w-full h-48 overflow-hidden rounded-t-lg md:hidden">
        <img
          src={day.image_url}
          alt={day.title}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Desktop: side-by-side */}
      <CardContent className="hidden md:flex flex-row p-0">
        <figure className="relative w-56 shrink-0 overflow-hidden rounded-l-lg">
          <img
            src={day.image_url}
            alt={day.title}
            className="w-full h-full object-cover"
          />
        </figure>

        <div className="flex-1 p-6">
          <div className="flex flex-col items-start gap-3 mb-3">
            <Badge variant="default">Day {day.day_number}</Badge>
            <h3 className="text-primary font-semibold">{day.title}</h3>
          </div>
          <ul className="space-y-2">
            {day.course_day_activity?.map((activity) => (
              <li
                key={activity.id}
                className="flex items-start gap-2 text-sm text-card-foreground"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {activity.activity}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      {/* Mobile: content below image */}
      <CardContent className="md:hidden">
        <div className="flex flex-col items-start gap-3 mb-3">
          <Badge variant="default">Day {day.day_number}</Badge>
          <h3 className="text-primary font-semibold">{day.title}</h3>
        </div>
        <ul className="space-y-2">
          {day.course_day_activity?.map((activity) => (
            <li
              key={activity.id}
              className="flex items-start gap-2 text-sm text-card-foreground"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {activity.activity}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CourseDayCard;
