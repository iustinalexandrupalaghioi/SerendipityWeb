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
    <Card key={index} className="overflow-hidden ">
      <CardContent className="flex flex-col md:flex-row ">
        <div className="md:w-40 h-40 shrink-0 mb-4 md:mb-0">
          <img
            src={day.image_url}
            alt={day.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 md:pl-6">
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
    </Card>
  );
};

export default CourseDayCard;
