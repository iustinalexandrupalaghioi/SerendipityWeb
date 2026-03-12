import { useAuth } from "@/contexts/AuthContext";
import { useAppointments } from "@/hooks/useAppointments";
import { supabase } from "@/lib/supabaseClient";
import { Calendar } from "lucide-react";
import AppointmentCard from "./AppointmentCard";

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
        data?.pages
          .flat()
          ?.map((apt) => <AppointmentCard key={apt.id} apt={apt} />)
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
