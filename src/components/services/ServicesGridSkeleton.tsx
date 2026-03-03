import ServiceCardSkeleton from "./ServiceCardSkeleton";

const ServicesGridSkeleton = () => {
  return (
    <>
      {/* Categories Skeleton */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-wrap items-center gap-3">
          {/* "All Services" button skeleton */}
          <div className="h-9 w-28 animate-pulse rounded-full bg-muted" />

          {/* Category button skeletons */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-24 animate-pulse rounded-full bg-muted"
            />
          ))}
        </div>

        {/* Description skeleton */}
        <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-muted" />
      </section>

      {/* Services Grid Skeleton */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ServicesGridSkeleton;
