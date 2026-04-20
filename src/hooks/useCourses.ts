import { supabase } from "@/lib/supabaseClient";
import type { Course, CourseDay } from "@/types/Course";
import { useQuery } from "@tanstack/react-query";

export interface CourseFilters {
  isOpen?: boolean;
}

const fetchCourses = async (filters?: CourseFilters): Promise<Course[]> => {
  let query = supabase
    .from("course")
    .select("*, course_day(*, course_day_activity(*)), course_enrollment(*)")
    .order("day_number", { referencedTable: "course_day", ascending: true })
    .order("display_order", { ascending: true });
  if (typeof filters?.isOpen === "boolean") {
    query = query.eq("is_open", filters.isOpen);
  }
  const { data, error } = await query;
  if (error) {
    console.error("Error fetching appointments:", error);
    throw new Error(error.message);
  }

  return data || [];
};

export const useCourses = (filters?: CourseFilters) => {
  return useQuery<Course[], Error>({
    queryKey: ["courses", filters],
    queryFn: () => fetchCourses(filters),
    staleTime: 1000 * 60 * 5,
    select: (courses) =>
      courses.map((course) => {
        // Course image
        const courseImage = course.image_path
          ? supabase.storage.from("courses").getPublicUrl(course.image_path)
              .data.publicUrl
          : "";

        // Course days images
        const courseDaysWithImages = course.course_day?.map(
          (day: CourseDay) => {
            if (!day.image_path) return day;

            const { data } = supabase.storage
              .from("courses")
              .getPublicUrl(day.image_path);

            return {
              ...day,
              image_url: data.publicUrl,
            };
          },
        );

        return {
          ...course,
          image_url: courseImage,
          course_day: courseDaysWithImages,
        };
      }),
  });
};
