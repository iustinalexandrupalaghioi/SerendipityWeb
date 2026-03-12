import { useAuth } from "@/contexts/AuthContext";
import { useEnrollments } from "@/hooks/useEnrollments";
import { GraduationCap } from "lucide-react";
import EnrollmentCard from "./EnrollmentCard";

const EnrollmentsTabContent = () => {
  const { user } = useAuth();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useEnrollments(user?.id!);

  return (
    <div className="flex flex-col gap-4">
      {data?.pages.flat().length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <GraduationCap className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <p className="mt-4 text-sm text-muted-foreground">
            No enrollments yet. Explore our courses!
          </p>
        </div>
      ) : (
        data?.pages
          .flat()
          .map((enr) => <EnrollmentCard key={enr.id} enr={enr} />)
      )}
      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 rounded-md border border-border bg-card hover:bg-muted transition disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
};

export default EnrollmentsTabContent;
