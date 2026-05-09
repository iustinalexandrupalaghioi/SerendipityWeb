import z from "zod";

export const profileSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters"),
  email: z.email("Invalid email address").trim(),
  image: z.any().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
