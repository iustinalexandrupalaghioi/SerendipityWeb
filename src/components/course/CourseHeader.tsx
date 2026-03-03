const CourseHeader = () => {
  return (
    <section className="bg-primary px-6 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
        Courses
      </p>
      <h1 className="mt-3 font-serif text-4xl font-bold text-primary-foreground md:text-5xl text-balance">
        Master the art of nail design
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/70 text-pretty">
        Professional courses designed to take you from beginner to expert. Learn
        from a certified instructor with years of experience.
      </p>
    </section>
  );
};

export default CourseHeader;
