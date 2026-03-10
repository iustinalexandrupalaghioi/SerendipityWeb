import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { BanknoteIcon } from "lucide-react";

interface CheckoutButtonProps {
  id: string;
  type: "appointment" | "enrollment";
  pay_full_amount?: boolean; // Optional, in case you want to specify if it's a full payment or not
  text?: string;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const CheckoutButton = ({
  id,
  type,
  text = "Pay",
  size = "default",
  className,
}: CheckoutButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "create-checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, type }),
        },
      );

      if (error) throw new Error(error.message);

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.message || "Failed to create checkout session. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <Button
      title={text}
      className={className}
      size={size}
      onClick={handlePay}
      disabled={loading}
    >
      {loading ? (
        <span className="flex items-center space-x-2">
          <BanknoteIcon className="h-3 w-3 animate-spin" />
          <span>Processing...</span>
        </span>
      ) : (
        <span className="flex items-center space-x-2">
          <BanknoteIcon className="h-3 w-3" />
          <span>{text}</span>
        </span>
      )}
    </Button>
  );
};

export default CheckoutButton;
