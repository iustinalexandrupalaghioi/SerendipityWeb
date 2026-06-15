import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, LockIcon, User, Mail } from "lucide-react";
import Logo from "@/assets/logo/logo.png";
import DarkLogo from "@/assets/logo/logo-dark.png";
import google from "@/assets/icons/google-icon-logo.svg";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Checkbox } from "@/components/ui/checkbox";

const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.email("Please enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    legal: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms to continue",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      legal: false,
    },
  });

  const legalAccepted = form.watch("legal");

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  const onSubmit = async (values: SignUpFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
          },
          emailRedirectTo: `${window.location.origin}`,
        },
      });

      if (error) throw error;
      navigate("/auth/signup-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-full max-w-md mx-auto px-4 py-10 sm:px-0",
        className,
      )}
      {...props}
    >
      <Card>
        <CardHeader className="flex flex-col-reverse sm:flex-row items-start justify-between sm:items-center gap-2">
          <div className="flex flex-col gap-2">
            <CardTitle>Sign up with a new account</CardTitle>
            <CardDescription>
              Create your account by filling in the details below.
            </CardDescription>
          </div>
          <Link to="/">
            <img
              src={Logo}
              className="w-28 h-auto object-cover dark:hidden"
              alt="Serendipity Nail Lab & Training Center Logo"
            />
            <img
              src={DarkLogo}
              className="w-28 h-auto object-cover hidden dark:block"
              alt="Serendipity Nail Lab & Training Center Logo"
            />
          </Link>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              {/* Full name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupAddon>
                          <User className="h-4 w-4 text-gray-500" />
                        </InputGroupAddon>
                        <InputGroupInput
                          placeholder="e.g. John Doe"
                          {...field}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
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

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupAddon>
                          <LockIcon className="h-4 w-4 text-gray-500" />
                        </InputGroupAddon>
                        <InputGroupInput
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          {...field}
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            type="button"
                            variant="ghost"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupAddon>
                          <LockIcon className="h-4 w-4 text-gray-500" />
                        </InputGroupAddon>
                        <InputGroupInput
                          type={showConfirm ? "text" : "password"}
                          placeholder="••••••••••••"
                          {...field}
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            type="button"
                            variant="ghost"
                            onClick={() => setShowConfirm(!showConfirm)}
                            tabIndex={-1}
                          >
                            {showConfirm ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Legal checkbox */}
              <FormField
                control={form.control}
                name="legal"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-wrap items-start gap-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5"
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal text-muted-foreground leading-snug cursor-pointer">
                        I agree to the{" "}
                        <Link
                          to="/terms-and-conditions"
                          target="_blank"
                          className="text-foreground underline underline-offset-4 hover:text-accent transition-colors"
                        >
                          Terms & Conditions
                        </Link>{" "}
                        ,{" "}
                      </FormLabel>

                      <FormLabel className="text-sm font-normal text-muted-foreground leading-snug cursor-pointer">
                        <Link
                          to="/privacy-policy"
                          target="_blank"
                          className="text-foreground underline underline-offset-4 hover:text-accent transition-colors"
                        >
                          Privacy Policy
                        </Link>{" "}
                        , and{" "}
                      </FormLabel>
                      <FormLabel className="text-sm font-normal text-muted-foreground leading-snug cursor-pointer">
                        <Link
                          to="/cookie-policy"
                          target="_blank"
                          className="text-foreground underline underline-offset-4 hover:text-accent transition-colors"
                        >
                          Cookie Policy
                        </Link>
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Error Message */}
              {error && <p className="text-sm text-destructive">{error}</p>}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full"
                disabled={!legalAccepted || isLoading}
              >
                {isLoading ? "Creating account..." : "Sign up"}
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-2 text-sm">
                <div className="h-px flex-1 bg-border" />
                <span className="text-muted-foreground">or</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Google Login */}
              <Button
                type="button"
                variant="outline"
                className="w-full hover:bg-muted"
                disabled={!legalAccepted}
                onClick={loginWithGoogle}
              >
                <img className="h-4 w-4" src={google} />
                Continue with Google
              </Button>

              {/* Redirect */}
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/auth/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
