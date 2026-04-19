import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import ServiceCardSkeleton from "../services/ServiceCardSkeleton";

const ServicesCarouselSkeleton = () => {
  return (
    <Carousel opts={{ align: "start", loop: true }} className="w-full mt-12">
      <CarouselContent className="-ml-4 md:-ml-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <CarouselItem
            key={i}
            className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3"
          >
            <ServiceCardSkeleton />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-2.5 w-2.5 rounded-full bg-muted" />
          ))}
        </div>
        <div className="flex gap-2">
          <CarouselPrevious className="static translate-y-0 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground" />
          <CarouselNext className="static translate-y-0 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground" />
        </div>
      </div>
    </Carousel>
  );
};

export default ServicesCarouselSkeleton;
