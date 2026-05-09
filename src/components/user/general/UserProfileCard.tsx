import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import userImage from "@/assets/user.webp";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit3, Mail, Lock, MoreVertical } from "lucide-react";
import { format } from "date-fns";
import UpdateUserProfileForm from "./UpdateUserProfileForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

type EditMode = "profile" | "email" | "password" | null;

export default function UserProfileCard() {
  const { user, provider } = useAuth();
  const isEmailProvider = provider === "email";
  const [editMode, setEditMode] = useState<EditMode>(null);

  const close = () => setEditMode(null);

  return (
    <section className="mx-auto max-w-5xl px-6 pt-16">
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          {/* Avatar */}
          {!editMode && (
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-accent/30">
              <img
                src={user?.avatar_url || userImage}
                alt={user?.full_name || "User"}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = userImage;
                }}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <div className="flex flex-1 flex-col gap-4">
            {!editMode ? (
              <div className="flex items-start justify-between flex-col gap-2 md:flex-row">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-card-foreground">
                    {user?.full_name}
                  </h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  {user?.date_of_birth && (
                    <p className="text-sm text-muted-foreground">
                      Date of birth:{" "}
                      {format(new Date(user.date_of_birth), "d MMMM yyyy")}
                    </p>
                  )}
                </div>

                {isEmailProvider ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditMode("profile")}>
                        <Edit3 className="mr-2 h-4 w-4" />
                        Edit Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditMode("email")}>
                        <Mail className="mr-2 h-4 w-4" />
                        Change Email
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditMode("password")}>
                        <Lock className="mr-2 h-4 w-4" />
                        Change Password
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditMode("profile")}
                    className="border-border text-muted-foreground hover:text-foreground"
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </div>
            ) : editMode === "profile" ? (
              <UpdateUserProfileForm handleEditToggle={close} />
            ) : editMode === "email" ? (
              <ChangeEmailForm onCancel={close} />
            ) : (
              <ChangePasswordForm onCancel={close} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
