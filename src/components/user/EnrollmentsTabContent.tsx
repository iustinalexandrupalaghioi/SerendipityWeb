import { useAuth } from "@/contexts/AuthContext";
import { useEnrollments } from "@/hooks/useEnrollments";
import type { EnrollmentStatus } from "@/types/Course";
import { format } from "date-fns/format";
import {
  Ban,
  CheckCircle2,
  Clock,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "../ui/badge";
import CheckoutButton from "../partials/CheckoutButton";

const statusStyles: Record<
  EnrollmentStatus,
  { className: string; icon: LucideIcon; label: string }
> = {
  submitted: {
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock,
    label: "Upcoming",
  },

  confirmed: {
    className: "bg-accent/20 text-accent-foreground border-accent/30",
    icon: CheckCircle2,
    label: "Confirmed",
  },

  cancelled: {
    className: "bg-destructive/20 text-destructive border-destructive/30",
    icon: Ban,
    label: "Rejected",
  },

  completed: {
    className: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle2,
    label: "Completed",
  },
};

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
        data?.pages.flat().map((enr) => {
          const status = statusStyles[enr.status];
          const StatusIcon = status.icon;
          return (
            <div
              key={enr.id}
              className="rounded-lg border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <GraduationCap className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">
                      {enr.course?.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {enr.status === "submitted" ||
                      enr.status === "confirmed" ||
                      enr.status !== "cancelled"
                        ? "Starts: "
                        : "Started: "}

                      {format(enr.course_date, "d MMM yyyy")}
                    </p>
                    <div className="mt-1 space-y-1 text-sm">
                      <p className="text-card-foreground font-medium">
                        Total: € {enr.price}
                      </p>

                      {enr.advance_price > 0 && enr.status !== "cancelled" && (
                        <p className="text-muted-foreground">
                          Advance: € {enr.advance_price}
                          {enr.advance_payment_paid ? (
                            <span className="ml-2 inline-flex items-center text-green-600">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Paid
                            </span>
                          ) : (
                            <span className="ml-2 inline-flex items-center text-yellow-600">
                              <Clock className="mr-1 h-3 w-3" />
                              Not paid
                            </span>
                          )}
                        </p>
                      )}
                      {!enr.advance_payment_paid &&
                        enr.status === "submitted" && (
                          <CheckoutButton
                            className="bg-accent text-accent-foreground hover:bg-accent/90 mt-2"
                            id={enr.id}
                            size="sm"
                            type="enrollment"
                            text={`Confirm enrollment - € ${enr.payment_type === "deposit" ? enr.advance_price : enr.price}`}
                          />
                        )}
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className={status.className}>
                  <StatusIcon className="mr-1 h-3 w-3" />
                  {enr.status.charAt(0).toUpperCase() + enr.status.slice(1)}
                </Badge>
              </div>
            </div>
          );
        })
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
