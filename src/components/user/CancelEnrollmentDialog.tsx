import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

type Props = {
  id: string;
};

const CancelEnrollMentDialog = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleCancel = async () => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from("course_enrollment")
        .update({ status: "canceled" })
        .eq("id", id);

      if (error) throw error;

      toast.success("Enrollment canceled successfully.");

      // refetch enrollments
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });

      setOpen(false);
    } catch (error) {
      toast.error("Failed to cancel enrollment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-destructive text-destructive hover:bg-destructive/10"
        >
          Cancel
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Enrollment</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this enrollment? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Keep enrollment
          </Button>

          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={loading}
          >
            {loading ? "Canceling..." : "Yes, cancel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelEnrollMentDialog;
