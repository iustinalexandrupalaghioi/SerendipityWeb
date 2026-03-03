import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { Service } from "@/types/Service";

export interface ServicesFilters {
  is_popular?: boolean;
  category_id?: string;
}
const fetchServices = async (filters?: ServicesFilters): Promise<Service[]> => {
  let query = supabase
    .from("service")
    .select("*, category:category_id (*)")
    .order("created_at", { ascending: false });

  if (filters?.is_popular !== undefined) {
    query = query.eq("is_popular", filters.is_popular);
  }

  if (filters?.category_id) {
    query = query.eq("category_id", filters.category_id);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching services:", error);
    throw new Error(error.message);
  }

  return data || [];
};

export const useServices = (filters?: ServicesFilters) => {
  return useQuery({
    queryKey: ["services", filters],
    queryFn: () => fetchServices(filters),
    staleTime: 1000 * 60 * 5,
    select: (services: Service[]) =>
      services.map((service) => {
        if (!service.image_path) {
          return { ...service, image_public_url: "" };
        }

        const { data } = supabase.storage
          .from("services")
          .getPublicUrl(service.image_path);

        return {
          ...service,
          image_public_url: data.publicUrl,
        };
      }),
  });
};
