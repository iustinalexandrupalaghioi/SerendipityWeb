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
    className: "bg-gold-light text-gold-dark border-gold",
    icon: Clock,
    label: "Pending",
  },
  accepted: {
    className: "bg-gold-light text-gold-dark border-gold",
    icon: BadgeCheck,
    label: "Accepted",
  },
  confirmed: {
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
    className: "bg-primary/10 text-primary border-primary/30",
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
  const isCancelled = apt.status === "cancelled";
  const hasNote =
    !!apt.notes && ["accepted", "confirmed", "completed"].includes(apt.status);
  const depositUnpaid =
    apt.service.advance_price > 0 &&
    !apt.advance_payment_paid &&
    apt.status === "accepted";

  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden border border-border bg-background transition-all duration-300 hover:border-gold/50 hover:shadow-xl hover:shadow-gold/5",
        isDeclined
          ? "border-destructive/30 hover:border-destructive/50 hover:shadow-destructive/5"
          : "",
        isCancelled && "opacity-70",
      )}
    >
      {/* Left accent bar */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-[3px]",
          isDeclined ? "bg-destructive" : isCancelled ? "bg-border" : "bg-gold",
        )}
      />

      <div className="p-4 pl-6 sm:p-5 sm:flex sm:items-start sm:gap-3">
        {/* Mobile: icon + badge in one row. Desktop: icon only */}
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]",
              isDeclined
                ? "bg-destructive/10"
                : isCancelled
                  ? "bg-muted"
                  : "bg-primary",
            )}
          >
            <Calendar
              className={cn(
                "h-[17px] w-[17px]",
                isDeclined
                  ? "text-destructive"
                  : isCancelled
                    ? "text-muted-foreground"
                    : "text-gold",
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
            <p className="font-semibold text-card-foreground leading-snug">
              {apt.service.title}
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
            <span>{format(apt.date, "d MMM yyyy")}</span>
            <span className="inline-block h-1 w-1 rounded-full bg-gold-dark" />
            <span>
              {apt.start_time.slice(0, 5)} – {apt.end_time.slice(0, 5)}
            </span>
          </div>

          {/* Price + deposit */}
          <div className="mt-2.5 flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "text-[17px] font-bold tracking-tight",
                isDeclined ? "text-destructive/70" : "text-primary",
              )}
            >
              € {apt.price}
            </span>

            {apt.advance_payment > 0 && !isDeclined && (
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                  apt.advance_payment_paid
                    ? "border-primary/30 bg-primary/5 text-primary"
                    : "border-gold bg-gold-light text-gold-dark",
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    apt.advance_payment_paid ? "bg-primary" : "bg-gold-dark",
                  )}
                />
                Deposit € {apt.advance_payment} ·{" "}
                {apt.advance_payment_paid ? "paid" : "not paid"}
              </span>
            )}
          </div>

          {/* Actions */}
          {(depositUnpaid ||
            apt.status === "pending" ||
            apt.status === "accepted") && (
            <div className="mt-3 flex flex-col sm:flex-row flex-wrap gap-2">
              {depositUnpaid && (
                <CheckoutButton
                  id={apt.id}
                  size="sm"
                  type="appointment"
                  text="Pay deposit"
                  className="w-full sm:w-auto bg-gold text-accent-foreground hover:bg-gold-dark text-[12px] font-semibold"
                />
              )}
              {(apt.status === "pending" || apt.status === "accepted") && (
                <CancelAppointmentDialog id={apt.id} />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Declined reason footer */}
      {isDeclined && apt.notes && (
        <div className="flex items-start gap-2.5 border-t border-destructive/20 bg-destructive/5 px-5 py-3 pl-6">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" />
          <div>
            <p className="text-xs font-bold text-destructive">Decline reason</p>
            <p className="mt-0.5 text-sm text-destructive/80">{apt.notes}</p>
          </div>
        </div>
      )}

      {/* Note footer */}
      {hasNote && (
        <div className="flex items-start gap-2.5 border-t border-primary/15 bg-primary/5 px-5 py-3 pl-6">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/60" />
          <div>
            <p className="text-xs font-bold text-primary">Note</p>
            <p className="mt-0.5 text-sm text-primary/70">{apt.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
