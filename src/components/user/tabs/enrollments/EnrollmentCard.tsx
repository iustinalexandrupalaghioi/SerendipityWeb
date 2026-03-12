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

  canceled: {
    className: "bg-gray-100 text-gray-800 border-gray-200",
    icon: XCircle,
    label: "Canceled",
  },

  completed: {
    className: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle2,
    label: "Completed",
  },
};

interface EnrollmentCardProps {
  enr: Enrollment;
}
const EnrollmentCard = ({ enr }: EnrollmentCardProps) => {
  const status = statusStyles[enr.status];
  const StatusIcon = status.icon;
  return (
    <div
      key={enr.id}
      className="rounded-lg border border-border bg-card shadow-sm"
    >
      <div className="flex items-center justify-between p-5">
        <div className="flex md:items-center flex-col md:flex-row items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
            <GraduationCap className="h-5 w-5 text-accent" />
          </div>

          {/* Mobile badge */}
          <Badge
            variant="outline"
            className={`flex md:hidden ${status.className}`}
          >
            <StatusIcon className="mr-1 h-3 w-3" />
            {enr.status.charAt(0).toUpperCase() + enr.status.slice(1)}
          </Badge>

          <div>
            <p className="font-medium text-card-foreground">
              {enr.course?.title}
            </p>

            <p className="text-sm text-muted-foreground">
              {enr.status === "submitted" ||
              enr.status === "confirmed" ||
              enr.status !== "canceled"
                ? "Starts: "
                : "Started: "}
              {format(enr.course_date, "d MMM yyyy")}
            </p>

            <div className="mt-1 space-y-1 text-sm">
              <p className="text-card-foreground font-medium">
                Total: € {enr.price}
              </p>

              {enr.advance_price > 0 && enr.status !== "canceled" && (
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
              <div className="flex flex-col md:flex-row items-center gap-2 mt-2">
                {!enr.advance_payment_paid && enr.status === "submitted" && (
                  <CheckoutButton
                    className="bg-accent text-accent-foreground hover:bg-accent/90 w-full md:max-w-fit"
                    id={enr.id}
                    size="sm"
                    type="enrollment"
                    text={`Confirm enrollment - € ${
                      enr.payment_type === "deposit"
                        ? enr.advance_price
                        : enr.price
                    }`}
                  />
                )}
                {enr.status === "submitted" && (
                  <CancelEnrollmentDialog id={enr.id} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop badge */}
        <Badge
          variant="outline"
          className={`hidden md:flex ${status.className}`}
        >
          <StatusIcon className="mr-1 h-3 w-3" />
          {enr.status.charAt(0).toUpperCase() + enr.status.slice(1)}
        </Badge>
      </div>
    </div>
  );
};

export default EnrollmentCard;
