import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { supabase } from "@/lib/supabaseClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.email("Invalid email address"),
});

type FormValues = z.infer<typeof schema>;

export default function ChangeEmailForm({
  onCancel,
}: {
  onCancel: () => void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: FormValues) => {
    const { error } = await supabase.auth.updateUser({ email: values.email });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(
      `Confirmation link sent to ${values.email}. Check your inbox.`,
    );
    onCancel();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-sm"
      >
        <h3 className="font-semibold text-card-foreground">Change Email</h3>
        <p className="text-sm text-muted-foreground">
          A confirmation link will be sent to your new email address. Your email
          won't change until you confirm it.
        </p>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <Mail className="h-4 w-4 text-gray-500" />
                  </InputGroupAddon>
                  <InputGroupInput
                    type="email"
                    placeholder="e.g. john.doe@example.com"
                    {...field}
                  />
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2Icon className="animate-spin mr-2 h-4 w-4" /> Sending...
              </>
            ) : (
              "Send confirmation"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
