import { useCategories } from "@/hooks/useCategories";
import { useServices } from "@/hooks/useServices";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Navigate } from "react-router";
import ServiceCard from "./ServiceCard";
import ServicesSkeleton from "./ServicesGridSkeleton";

const ServicesGrid = () => {
  const [activeCategory, setActiveCategory] = useState<string>("");

  const {
    data: services,
    error: servicesError,
    isLoading: servicesLoading,
  } = useServices({
    category_id: activeCategory,
  });

  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useCategories();

  const isLoading = servicesLoading || categoriesLoading;

  const error = servicesError || categoriesError;

  if (error) return <Navigate to="/error" />;

  if (isLoading) return <ServicesSkeleton />;

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveCategory("")}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-medium transition-all",
              activeCategory === ""
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
          >
            All Services
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium transition-all",
                activeCategory === cat.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Active Category Description */}
        {activeCategory !== "all" && (
          <p className="mt-4 text-sm text-muted-foreground">
            {categories?.find((c) => c.id === activeCategory)?.description}
          </p>
        )}
      </section>

      {/* Services Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services?.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ServicesGrid;
