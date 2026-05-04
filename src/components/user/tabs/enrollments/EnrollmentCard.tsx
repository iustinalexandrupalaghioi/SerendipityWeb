import { cn } from "@/lib/utils";
import type { Enrollment, EnrollmentStatus } from "@/types/Course";
import { format } from "date-fns/format";
import {
  CheckCircle2,
  Clock,
  GraduationCap,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import CheckoutButton from "../../../partials/CheckoutButton";
import { Badge } from "../../../ui/badge";
import CancelEnrollmentDialog from "./CancelEnrollmentDialog";

const statusConfig: Record<
  EnrollmentStatus,
  { className: string; icon: LucideIcon; label: string }
> = {
  submitted: {
    className: "bg-yellow-100 text-yellow-800 border-yellow-300",
    icon: Clock,
    label: "Submitted",
  },
  confirmed: {
    className: "bg-primary/10 text-primary border-primary/30",
    icon: CheckCircle2,
    label: "Confirmed",
  },
  completed: {
    className: "bg-accent/10 text-accent border-accent/30",
    icon: CheckCircle2,
    label: "Completed",
  },
  cancelled: {
    className: "bg-muted text-muted-foreground border-border",
    icon: XCircle,
    label: "Cancelled",
  },
};

const EnrollmentCard = ({ enr }: { enr: Enrollment }) => {
  const { icon: StatusIcon, label, className } = statusConfig[enr.status];
  const isCancelled = enr.status === "cancelled";
  const depositUnpaid = !enr.advance_payment_paid && enr.status === "submitted";

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-sm">
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        {/* Badge on top for mobile */}
        <Badge
          variant="outline"
          className={cn(
            "self-start rounded-full text-xs sm:order-last sm:shrink-0",
            className,
          )}
        >
          <StatusIcon className="mr-1 h-3 w-3" />
          {label}
        </Badge>

        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10">
            <GraduationCap className="h-4 w-4 text-accent" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-medium text-card-foreground">
              {enr.course_session?.course?.title}
            </p>

            {/* Course meta */}
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-muted-foreground">
              <span>
                {enr.course_session?.start_date &&
                  format(
                    new Date(enr.course_session?.start_date),
                    "d MMM yyyy",
                  )}
              </span>
              <>
                <span className="text-border">·</span>
                <span>{enr.course_session?.course?.duration_days} day(s) </span>
              </>

              <>
                <span className="text-border">·</span>
                <span className="capitalize">
                  {enr.course_session?.course?.level}
                </span>
              </>
            </div>

            {/* Price row */}
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="font-semibold">€ {enr.price}</span>

              {enr.advance_price && enr.advance_price > 0 && !isCancelled && (
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span
                    className={cn(
                      "inline-block h-1.5 w-1.5 rounded-full",
                      enr.advance_payment_paid ? "bg-primary" : "bg-yellow-500",
                    )}
                  />
                  Deposit € {enr.advance_price} ·{" "}
                  <span
                    className={
                      enr.advance_payment_paid
                        ? "text-primary"
                        : "text-yellow-600"
                    }
                  >
                    {enr.advance_payment_paid ? "paid" : "not paid"}
                  </span>
                </span>
              )}
            </div>

            {/* Actions */}
            {enr.status === "submitted" && (
              <div className="mt-3 flex flex-wrap gap-2">
                {depositUnpaid && (
                  <CheckoutButton
                    id={enr.id}
                    size="sm"
                    type="enrollment"
                    text={`Confirm enrollment · € ${
                      enr.payment_type === "deposit"
                        ? enr.advance_price
                        : enr.price
                    }`}
                    className="bg-accent text-accent-foreground hover:bg-accent/90 w-full md:max-w-fit truncate"
                  />
                )}
                <CancelEnrollmentDialog id={enr.id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentCard;
