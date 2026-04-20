import { Badge } from "@/components/ui/badge";
import type { Service } from "@/types/Service";
import { Clock2Icon } from "lucide-react";
import BookingDialog from "./BookingDialog";

interface Props {
  service: Service;
}

const ServiceCard = ({ service }: Props) => {
  return (
    <div className="group h-full flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5">
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={service.image_public_url}
          alt={`${service.title} service photo`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {service.is_popular && (
          <Badge className="absolute top-2 right-2">Popular</Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="mt-2 text-xl font-bold text-foreground line-clamp-2 min-h-14">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {service.description}
        </p>

        <div className="my-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock2Icon className="h-4 w-4" />
            <span>{service.duration} min</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-lg font-bold text-accent">
              € {service.price}
            </span>
            {service.advance_price && (
              <span className="text-xs text-muted-foreground">
                Deposit:{" "}
                <span className="font-semibold text-accent/70">
                  € {service.advance_price}
                </span>
              </span>
            )}
          </div>
          <BookingDialog service={service} />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
