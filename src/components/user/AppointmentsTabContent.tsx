import { useAuth } from "@/contexts/AuthContext";
import { useAppointments } from "@/hooks/useAppointments";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import type { AppointmentStatus } from "@/types/Appointment";
import { format } from "date-fns";
import {
  AlertTriangle,
  BadgeCheck,
  Ban,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import CheckoutButton from "../partials/CheckoutButton";
import { Badge } from "../ui/badge";
import CancelAppointmentDialog from "./CancelAppointmentDialog";

const statusStyles: Record<
  AppointmentStatus,
  { className: string; icon: LucideIcon; label: string }
> = {
  pending: {
    // same visual meaning as upcoming
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock,
    label: "Upcoming",
  },

  approved: {
    className: "bg-blue-100 text-blue-800 border-blue-200",
    icon: BadgeCheck,
    label: "Approved",
  },

  confirmed: {
    className: "bg-accent/20 text-accent-foreground border-accent/30",
    icon: CheckCircle2,
    label: "Confirmed",
  },

  rejected: {
    className: "bg-destructive/20 text-destructive border-destructive/30",
    icon: Ban,
    label: "Rejected",
  },

  completed: {
    className: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle2,
    label: "Completed",
  },
  canceled: {
    className: "bg-gray-100 text-gray-800 border-gray-200",
    icon: XCircle,
    label: "Canceled",
  },
};

const AppointmentsTabContent = () => {
  const { user } = useAuth();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useAppointments(user?.id!);

  data?.pages.flat().map((appointment) => {
    if (!appointment.service?.image_path) return appointment;

    const { data } = supabase.storage
      .from("services")
      .getPublicUrl(appointment.service.image_path);

    return {
      ...appointment,
      service: {
        ...appointment.service,
        image_public_url: data.publicUrl,
      },
    };
  }) ?? [];

  return (
    <div className="flex flex-col gap-4">
      {data?.pages.flat()?.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <Calendar className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <p className="mt-4 text-sm text-muted-foreground">
            No appointments yet. Book your first appointment!
          </p>
        </div>
      ) : (
        data?.pages.flat()?.map((apt) => {
          const status = statusStyles[apt.status];
          const StatusIcon = status.icon;
          return (
            <div
              key={apt.id}
              className={`rounded-lg border bg-card shadow-sm ${
                apt.status === "rejected"
                  ? "border-destructive/30"
                  : "border-border"
              }`}
            >
              <div className="flex items-center justify-between p-5">
                <div className="flex md:items-center flex-col md:flex-row items-start gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      apt.status === "rejected"
                        ? "bg-destructive/10"
                        : "bg-primary/10"
                    }`}
                  >
                    <Calendar
                      className={`h-5 w-5 ${
                        apt.status === "rejected"
                          ? "text-destructive"
                          : "text-primary"
                      }`}
                    />
                  </div>
                  <Badge
                    variant="outline"
                    className={cn("flex md:hidden", status.className)}
                  >
                    <StatusIcon className="mr-1 h-3 w-3" />
                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                  </Badge>
                  <div>
                    <p className="font-medium text-card-foreground">
                      {apt.service.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(apt.date, "d MMM yyyy")} at{" "}
                      {apt.start_time.slice(0, 5)} - {apt.end_time.slice(0, 5)}
                    </p>
                    <div className="mt-1 space-y-1 text-sm">
                      <p className="text-card-foreground font-medium">
                        Total: € {apt.service.price}
                      </p>

                      {apt.service.advance_price > 0 &&
                        apt.status !== "rejected" && (
                          <p className="text-muted-foreground">
                            Advance: € {apt.service.advance_price}
                            {apt.advance_payment_paid ? (
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
                      <div className="flex items-center gap-2 mt-2">
                        {!apt.advance_payment_paid &&
                          (apt.status === "approved" ||
                            apt.status === "pending") && (
                            <CheckoutButton
                              className="bg-accent text-accent-foreground hover:bg-accent/90 "
                              id={apt.id}
                              size="sm"
                              text="Confirm appointment (Pay)"
                              type="appointment"
                            />
                          )}
                        {(apt.status === "pending" ||
                          apt.status === "approved") && (
                          <CancelAppointmentDialog id={apt.id} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={cn("hidden md:flex", status.className)}
                >
                  <StatusIcon className="mr-1 h-3 w-3" />
                  {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                </Badge>
              </div>
              {apt.status === "rejected" && apt.notes && (
                <div className="border-t border-destructive/20 bg-destructive/5 px-5 py-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                    <div>
                      <p className="text-xs font-semibold text-destructive">
                        Rejection Reason
                      </p>
                      <p className="mt-0.5 text-sm text-destructive/80">
                        {apt.notes}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {["approve", "confirmed", "completed"].some(
                (status) => status === apt.status,
              ) &&
                apt.notes && (
                  <div className="border-t border-blue-100 bg-blue-100/50 px-5 py-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                      <div>
                        <p className="text-xs font-semibold text-blue-500">
                          Approved Notes
                        </p>
                        <p className="mt-0.5 text-sm text-blue-500/80">
                          {apt.notes}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
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

export default AppointmentsTabContent;
