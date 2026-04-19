import { Skeleton } from "../ui/skeleton";

const ServiceCardSkeleton = () => (
  <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-background">
    <Skeleton className="aspect-4/3 w-full bg-muted" />
    <div className="p-6 flex flex-col gap-3">
      <Skeleton className="h-6 w-3/4 bg-muted" />
      <Skeleton className="h-4 w-full bg-muted" />
      <Skeleton className="h-4 w-2/3 bg-muted" />
      <Skeleton className="h-4 w-24 mt-1 bg-muted" />
      <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-6 w-16 bg-muted" />
          <Skeleton className="h-3 w-24 bg-muted" />
        </div>
        <Skeleton className="h-9 w-32 bg-muted" />
      </div>
    </div>
  </div>
);

export default ServiceCardSkeleton;
