import { supabase } from "@/lib/supabaseClient";
import type { Appointment } from "@/types/Appointment";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 5;

const fetchAppointmentsForUser = async (
  userId: string,
  pageParam = 0,
): Promise<Appointment[]> => {
  const from = pageParam * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("appointment")
    .select("*, profile:user_id (*), service:service_id (*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  return data ?? [];
};

export const useAppointments = (userId: string) => {
  return useInfiniteQuery({
    queryKey: ["appointments", userId],

    queryFn: ({ pageParam }) => fetchAppointmentsForUser(userId, pageParam),

    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },

    enabled: !!userId,
  });
};
