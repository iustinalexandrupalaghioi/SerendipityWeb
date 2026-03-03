import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Service } from "@/types/Service";
import { Clock2Icon } from "lucide-react";
import BookingDialog from "./BookingDialog";

interface Props {
  service: Service;
}

const ServiceCard = ({ service }: Props) => {
  return (
    <Card
      id={service.id}
      className="group m-1 pt-0 h-full justify-between w-full"
    >
      <CardHeader className="p-0">
        <figure className="relative w-full h-48 overflow-hidden rounded-t-lg ">
          <img
            src={service.image_public_url}
            alt={`${service.title} service photo`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
          />
          {service.is_popular && (
            <Badge className="absolute top-2 right-2">Popular</Badge>
          )}
        </figure>
      </CardHeader>
      <CardContent>
        <CardTitle>{service.title}</CardTitle>
        <CardDescription className="text-sm md:text-base mt-1 text-foreground/90">
          {service.description}
        </CardDescription>
        <CardDescription className="flex justify-between items-center mt-4 ">
          <div className="flex items-center gap-1 text-foreground/90">
            <Clock2Icon className="w-4 h-4" /> {service.duration} min
          </div>
          <h3 className="text-lg font-bold text-accent">€ {service.price}</h3>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <BookingDialog service={service} />
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
