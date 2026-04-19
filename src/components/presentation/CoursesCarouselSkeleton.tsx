import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const CourseCardSkeleton = () => (
  <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-background">
    <Skeleton className="aspect-4/3 w-full" />
    <div className="p-6 flex flex-col gap-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-24 mt-1" />
      <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-9 w-32" />
      </div>
    </div>
  </div>
);

const CoursesCarouselSkeleton = () => {
  return (
    <Carousel opts={{ align: "start", loop: true }} className="w-full mt-12">
      <CarouselContent className="-ml-4 md:-ml-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <CarouselItem
            key={i}
            className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3"
          >
            <CourseCardSkeleton />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-2.5 w-2.5 rounded-full" />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          {/* Dots */}
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <button
                disabled
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                className="h-2.5 rounded-full transition-all duration-300"
              />
            ))}
          </div>

          {/* Arrows — always visible, not desktop-only */}
          <div className="flex gap-2">
            <CarouselPrevious className="static translate-y-0 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="static translate-y-0 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground" />
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default CoursesCarouselSkeleton;
