import { supabase } from "@/lib/supabaseClient";
import type { Enrollment } from "@/types/Course";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 5;

const fetchEnrollmentsForUser = async (
  userId: string,
  pageParam = 0,
): Promise<Enrollment[]> => {
  const from = pageParam * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("course_enrollment")
    .select("*, course_session!inner(*, course!inner(*)), profile(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  return data ?? [];
};

export const useEnrollments = (userId: string) => {
  return useInfiniteQuery({
    queryKey: ["enrollments", userId],

    queryFn: ({ pageParam }) => fetchEnrollmentsForUser(userId, pageParam),

    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },

    enabled: !!userId,
  });
};
