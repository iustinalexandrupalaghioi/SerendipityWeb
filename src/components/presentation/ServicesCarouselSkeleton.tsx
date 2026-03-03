import { useMediaQuery } from "@/hooks/useMediaQuery";
import ServiceCardSkeleton from "@/components/services/ServiceCardSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ServicesCarouselSkeleton = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full mt-12"
    >
      <CarouselContent>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
          <ServiceCardSkeleton />
        </CarouselItem>
      </CarouselContent>
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full hover:bg-primary duration-300`}
          />
        ))}
      </div>
      {isDesktop && <CarouselPrevious variant="default" />}
      {isDesktop && <CarouselNext variant="default" />}
    </Carousel>
  );
};

export default ServicesCarouselSkeleton;
