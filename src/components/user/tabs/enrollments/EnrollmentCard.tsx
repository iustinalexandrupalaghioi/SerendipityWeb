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
    className: "bg-gold-light text-gold-dark border-gold",
    icon: Clock,
    label: "Submitted",
  },
  confirmed: {
    className: "bg-primary/10 text-primary border-primary/30",
    icon: CheckCircle2,
    label: "Confirmed",
  },
  completed: {
    className: "bg-primary/10 text-primary border-primary/30",
    icon: CheckCircle2,
    label: "Completed",
  },
  cancelled: {
    className: "bg-muted text-muted-foreground border-border",
    icon: XCircle,
    label: "Cancelled",
  },
  no_show: {
    className: "bg-muted text-muted-foreground border-border",
    icon: XCircle,
    label: "No show",
  },
  expired: {
    className: "bg-muted text-muted-foreground border-border",
    icon: XCircle,
    label: "Expired",
  },
};

const EnrollmentCard = ({ enr }: { enr: Enrollment }) => {
  const { icon: StatusIcon, label, className } = statusConfig[enr.status];
  const isCancelled = ["cancelled", "no_show", "expired"].some(
    (s) => s === enr.status,
  );
  const depositUnpaid = !enr.advance_payment_paid && enr.status === "submitted";

  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden border border-border bg-background transition-all duration-300 hover:border-gold/50 hover:shadow-xl hover:shadow-gold/5",
        isCancelled && "opacity-70",
      )}
    >
      {/* Left accent bar */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-[3px]",
          isCancelled ? "bg-border" : "bg-gold",
        )}
      />

      <div className="p-4 pl-6 sm:p-5 sm:flex sm:items-start sm:gap-3">
        {/* Mobile: icon + badge in one row. Desktop: icon only */}
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]",
              isCancelled ? "bg-muted" : "bg-primary",
            )}
          >
            <GraduationCap
              className={cn(
                "h-[17px] w-[17px]",
                isCancelled ? "text-muted-foreground" : "text-gold",
              )}
            />
          </div>

          {/* Badge — mobile only */}
          <Badge
            variant="outline"
            className={cn(
              "sm:hidden rounded-full text-[11px] font-semibold",
              className,
            )}
          >
            <StatusIcon className="mr-1 h-3 w-3" />
            {label}
          </Badge>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p
              className={cn(
                "font-semibold leading-snug",
                isCancelled ? "text-muted-foreground" : "text-card-foreground",
              )}
            >
              {enr.course_session?.course?.title}
            </p>

            {/* Badge — desktop only */}
            <Badge
              variant="outline"
              className={cn(
                "hidden sm:inline-flex shrink-0 rounded-full text-[11px] font-semibold",
                className,
              )}
            >
              <StatusIcon className="mr-1 h-3 w-3" />
              {label}
            </Badge>
          </div>

          {/* Meta */}
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
            {enr.course_session?.start_date && (
              <span>
                {format(new Date(enr.course_session.start_date), "d MMM yyyy")}
              </span>
            )}
            <span className="inline-block h-1 w-1 rounded-full bg-gold-dark" />
            <span>{enr.course_session?.course?.duration_days} day(s)</span>
            <span className="inline-block h-1 w-1 rounded-full bg-gold-dark" />
            <span className="capitalize">
              {enr.course_session?.course?.level}
            </span>
          </div>

          {/* Price + deposit */}
          <div className="mt-2.5 flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "text-[17px] font-bold tracking-tight",
                isCancelled
                  ? "text-muted-foreground text-base"
                  : "text-primary",
              )}
            >
              € {enr.price}
            </span>

            {enr.advance_price && enr.advance_price > 0 && !isCancelled && (
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                  enr.advance_payment_paid
                    ? "border-primary/30 bg-primary/5 text-primary"
                    : "border-gold bg-gold-light text-gold-dark",
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    enr.advance_payment_paid ? "bg-primary" : "bg-gold-dark",
                  )}
                />
                Deposit € {enr.advance_price} ·{" "}
                {enr.advance_payment_paid ? "paid" : "not paid"}
              </span>
            )}
          </div>

          {/* Actions */}
          {enr.status === "submitted" && (
            <div className="mt-3 flex flex-col sm:flex-row flex-wrap gap-2">
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
                  className="w-full sm:w-auto bg-gold text-accent-foreground hover:bg-gold-dark text-[12px] font-semibold"
                />
              )}
              <CancelEnrollmentDialog id={enr.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrollmentCard;
