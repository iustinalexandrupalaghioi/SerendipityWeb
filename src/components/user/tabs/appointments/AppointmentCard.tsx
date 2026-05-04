import { cn } from "@/lib/utils";
import type { Appointment, AppointmentStatus } from "@/types/Appointment";
import { format } from "date-fns/format";
import {
  AlertTriangle,
  BadgeCheck,
  Ban,
  Calendar,
  CheckCircle2,
  Clock,
  Info,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import CheckoutButton from "../../../partials/CheckoutButton";
import { Badge } from "../../../ui/badge";
import CancelAppointmentDialog from "./CancelAppointmentDialog";

const statusConfig: Record<
  AppointmentStatus,
  { className: string; icon: LucideIcon; label: string }
> = {
  pending: {
    className: "bg-yellow-100 text-yellow-800 border-yellow-300",
    icon: Clock,
    label: "Pending",
  },
  accepted: {
    className: "bg-blue-100 text-blue-800 border-blue-300",
    icon: BadgeCheck,
    label: "Accepted",
  },
  confirmed: {
    // was green, now uses primary
    className: "bg-primary/10 text-primary border-primary/30",
    icon: CheckCircle2,
    label: "Confirmed",
  },
  declined: {
    className: "bg-destructive/10 text-destructive border-destructive/40",
    icon: Ban,
    label: "Declined",
  },
  completed: {
    // was emerald, now uses accent
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

const AppointmentCard = ({ apt }: { apt: Appointment }) => {
  const { icon: StatusIcon, label, className } = statusConfig[apt.status];
  const isDeclined = apt.status === "declined";
  const hasNote =
    !!apt.notes && ["accepted", "confirmed", "completed"].includes(apt.status);
  const depositUnpaid =
    apt.service.advance_price > 0 &&
    !apt.advance_payment_paid &&
    apt.status === "accepted";

  return (
    <div
      className={cn(
        "rounded-xl border bg-card overflow-hidden transition-shadow hover:shadow-sm",
        isDeclined ? "border-destructive/30" : "border-border",
      )}
    >
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
          <div
            className={cn(
              "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
              isDeclined ? "bg-destructive/10" : "bg-muted",
            )}
          >
            <Calendar
              className={cn(
                "h-4 w-4",
                isDeclined ? "text-destructive" : "text-muted-foreground",
              )}
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-medium text-card-foreground">
              {apt.service.title}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {format(apt.date, "d MMM yyyy")} · {apt.start_time.slice(0, 5)} –{" "}
              {apt.end_time.slice(0, 5)}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="font-semibold">€ {apt.service.price}</span>

              {apt.service.advance_price > 0 && !isDeclined && (
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span
                    className={cn(
                      "inline-block h-1.5 w-1.5 rounded-full",
                      apt.advance_payment_paid ? "bg-primary" : "bg-yellow-500",
                    )}
                  />
                  Deposit € {apt.service.advance_price} ·{" "}
                  <span
                    className={
                      apt.advance_payment_paid
                        ? "text-primary"
                        : "text-yellow-600"
                    }
                  >
                    {apt.advance_payment_paid ? "paid" : "not paid"}
                  </span>
                </span>
              )}
            </div>

            {(depositUnpaid ||
              apt.status === "pending" ||
              apt.status === "accepted") && (
              <div className="mt-3 flex flex-wrap gap-2">
                {depositUnpaid && (
                  <CheckoutButton
                    id={apt.id}
                    size="sm"
                    text="Pay deposit"
                    type="appointment"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 w-full md:max-w-fit"
                  />
                )}
                {(apt.status === "pending" || apt.status === "accepted") && (
                  <CancelAppointmentDialog id={apt.id} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {isDeclined && apt.notes && (
        <div className="flex items-start gap-2.5 border-t border-destructive/20 bg-destructive/5 px-5 py-3">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" />
          <div>
            <p className="text-xs font-semibold text-destructive">
              Decline reason
            </p>
            <p className="mt-0.5 text-sm text-destructive/80">{apt.notes}</p>
          </div>
        </div>
      )}

      {hasNote && (
        <div className="flex items-start gap-2.5 border-t border-blue-100 bg-blue-50 px-5 py-3">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
          <div>
            <p className="text-xs font-semibold text-blue-600">Note</p>
            <p className="mt-0.5 text-sm text-blue-500/90">{apt.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
