import { useCategories } from "@/hooks/useCategories";
import { useServices } from "@/hooks/useServices";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router";
import ServiceCard from "./ServiceCard";
import ServicesSkeleton from "./ServicesGridSkeleton";

const ServicesGrid = () => {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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

  useEffect(() => {
    if (categories) setActiveCategory(categories[0].id);
  }, [categories]);

  const isLoading = servicesLoading || categoriesLoading;

  const error = servicesError || categoriesError;

  if (error) return <Navigate to="/error" />;

  if (isLoading) return <ServicesSkeleton />;

  return (
    <>
      {/* Sticky category bar — outside any constraining section */}
      <div ref={tabsRef} className="scroll-mt-16" />
      <div className="sticky top-16 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-2 pt-3">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-1">
            {categories?.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={cn(
                  "shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-all",
                  activeCategory === cat.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
                )}
              >
                {cat.name}
              </button>
            ))}
            <button
              onClick={() => handleCategoryChange("")}
              className={cn(
                "shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-all",
                activeCategory === ""
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              All Services
            </button>
          </div>
        </div>
      </div>

      {/* Category description */}
      {activeCategory !== "all" && (
        <div className="mx-auto max-w-7xl px-6 pt-6">
          <p className="text-sm text-muted-foreground">
            {categories?.find((c) => c.id === activeCategory)?.description}
          </p>
        </div>
      )}

      {/* Services Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12 pb-24">
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
