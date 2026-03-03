import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { Certificate } from "@/types/Certificate";

export interface CertficatesFilters {
  is_featured?: boolean;
}

const fetchCertificates = async (
  filters: CertficatesFilters,
): Promise<Certificate[]> => {
  let query = supabase
    .from("certificate")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters.is_featured) query.eq("is_featured", filters.is_featured);

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export const useCertificates = (filters: CertficatesFilters) => {
  return useQuery({
    queryKey: ["certificates", filters],
    queryFn: () => fetchCertificates(filters),
    staleTime: 1000 * 60 * 5,
    select: (certificates) =>
      certificates.map((certificate) => {
        const { data } = supabase.storage
          .from("certificates")
          .getPublicUrl(certificate.image_path);

        return {
          ...certificate,
          image_public_url: data.publicUrl,
        };
      }),
  });
};
