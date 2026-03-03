import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ServiceCardSkeleton = () => {
  return (
    <Card className="m-1 min-w-72">
      <CardHeader>
        <Skeleton className="h-48 w-full bg-muted" />
      </CardHeader>
      <CardContent className="py-8 px-4 space-y-4">
        <Skeleton className="h-3 w-full bg-muted" />
        <Skeleton className="h-3 w-full bg-muted" />
        <Skeleton className="h-3 w-4/6 bg-muted" />
        <Skeleton className="h-3 w-5/6 bg-muted" />
      </CardContent>
    </Card>
  );
};

export default ServiceCardSkeleton;
