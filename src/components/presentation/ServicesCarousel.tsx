import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useServices } from "@/hooks/useServices";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import ServiceCard from "../services/ServiceCard";
import ServicesCarouselSkeleton from "./ServicesCarouselSkeleton";

const ServicesCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { data, error, isLoading } = useServices({ is_popular: true });

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (isLoading) return <ServicesCarouselSkeleton />;

  if (error) return <Navigate to="/error" />;

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full mt-12"
    >
      <CarouselContent className="p-4">
        {data &&
          data.map((service, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <ServiceCard service={service} />
            </CarouselItem>
          ))}
      </CarouselContent>
      <div className="flex justify-center mt-4 space-x-2">
        {api &&
          api.scrollSnapList().length > 0 &&
          Array.from({ length: api?.scrollSnapList().length }).map(
            (_, index) => (
              <button
                title={`Scroll to ${index + 1} position`}
                key={index}
                className={`h-4 w-4 rounded-full hover:bg-primary duration-300 ${
                  index === current ? "bg-primary" : "bg-accent-foreground"
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ),
          )}
      </div>
      {isDesktop && <CarouselPrevious title="Previous" variant="default" />}
      {isDesktop && <CarouselNext title="Next" variant="default" />}
    </Carousel>
  );
};

export default ServicesCarousel;
