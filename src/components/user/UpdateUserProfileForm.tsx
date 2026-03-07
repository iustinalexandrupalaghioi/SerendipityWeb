import defaultAvatar from "@/assets/user.webp";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Loader2Icon, CameraIcon } from "lucide-react";
import Loader from "../ui/loader";
import { FormCalendar } from "../partials/FormCalendar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email").optional(),
  date_of_birth: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function UpdateUserProfileForm({
  handleEditToggle,
}: {
  handleEditToggle: () => void;
}) {
  const { user, setUser } = useAuth();
  const [profileImagePreview, setProfileImagePreview] = useState<string>(
    user?.user_metadata.avatar_url || defaultAvatar,
  );
  const [uploading, setUploading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName:
        user?.user_metadata.first_name ||
        user?.user_metadata.full_name?.split(" ")[0] ||
        "",
      lastName:
        user?.user_metadata.last_name ||
        user?.user_metadata.full_name?.split(" ")[1] ||
        "",
      email: user?.email || "",
      date_of_birth: user?.user_metadata.date_of_birth || "",
    },
  });

  const hundredYearsAgo = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return new Date(currentYear - 100, 0, 1);
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const previewUrl = URL.createObjectURL(file);
    setProfileImagePreview(previewUrl);

    try {
      setUploading(true);

      // Remove previous avatar
      const previousAvatarPath = user.user_metadata.avatar_path;
      if (previousAvatarPath) {
        await supabase.storage.from("avatars").remove([previousAvatarPath]);
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { error } = await supabase.auth.updateUser({
        data: { avatar_path: filePath },
      });
      if (error) throw error;

      const { data: signedData } = await supabase.storage
        .from("avatars")
        .createSignedUrl(filePath, 60 * 60);

      if (signedData) {
        setUser({
          ...user,
          user_metadata: {
            ...user.user_metadata,
            avatar_path: filePath,
            avatar_url: signedData.signedUrl,
          },
        });
      }

      toast.success("Profile image updated successfully!");
    } catch {
      toast.error("Failed to update profile image");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: values.firstName,
          last_name: values.lastName,
          date_of_birth: values.date_of_birth,
        },
      });

      if (error) throw error;
      toast.success("Profile updated successfully!");
      handleEditToggle();
    } catch {
      toast.error("Failed to update the profile.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-6 w-full items-start"
      >
        {/* Avatar */}
        <div className=" relative flex flex-col items-center gap-2">
          <div className=" h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-accent/30">
            <img
              src={profileImagePreview}
              alt="Profile"
              className="object-cover w-full h-full"
            />
            <label className="absolute bottom-0 right-0 p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer">
              {uploading ? (
                <Loader className="h-5 w-5 -mt-1 -ms-1 me-0" />
              ) : (
                <CameraIcon className="w-5 h-5" />
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex-1 flex flex-col gap-4 w-full">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormCalendar
                startMonth={hundredYearsAgo}
                label="Date of Birth"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="flex gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleEditToggle}
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
                  <Loader2Icon className="animate-spin mr-2 h-4 w-4" />{" "}
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
