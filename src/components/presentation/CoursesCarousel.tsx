import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCourses } from "@/hooks/useCourses";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import CourseSmallCard from "../course/CourseSmallCard";
import CoursesCarouselSkeleton from "./CoursesCarouselSkeleton";

const CoursesCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { data: courses, isLoading, error } = useCourses();

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  if (isLoading) return <CoursesCarouselSkeleton />;
  if (error) return <Navigate to="/error" />;

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", loop: true }}
      className="w-full mt-12"
    >
      <CarouselContent className="-ml-4 md:-ml-6">
        {courses?.map((course) => (
          <CarouselItem
            key={course.id}
            className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3"
          >
            <CourseSmallCard course={course} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-8 flex items-center justify-between">
        {/* Dots */}
        <div className="flex gap-2">
          {courses?.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === current
                  ? "w-8 bg-primary"
                  : "w-2.5 bg-primary/30 hover:bg-primary/50"
              }`}
            />
          ))}
        </div>

        {/* Arrows — always visible, not desktop-only */}
        <div className="flex gap-2">
          <CarouselPrevious className="static translate-y-0 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground" />
          <CarouselNext className="static translate-y-0 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground" />
        </div>
      </div>
    </Carousel>
  );
};

export default CoursesCarousel;
