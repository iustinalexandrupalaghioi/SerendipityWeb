import { useCourses } from "@/hooks/useCourses";
import CourseCard from "./CourseCard";

const CourseGrid = () => {
  const { data: courses } = useCourses();
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex flex-col gap-12">
        {courses?.map((course, index) => (
          <CourseCard key={course.id} course={course} index={index} />
        ))}
      </div>
    </section>
  );
};

export default CourseGrid;
