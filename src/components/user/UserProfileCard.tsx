import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

import userImage from "@/assets/user.webp";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import UpdateUserProfileForm from "./UpdateUserProfileForm";
import { format } from "date-fns";
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  image?: File;
}

export default function UserProfileCard() {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <section className="mx-auto max-w-5xl px-6 pt-16">
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-6 md:flex-row  md:items-start">
          {/* Avatar */}
          {!isEditing && (
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-accent/30">
              <img
                src={user?.user_metadata.avatar_url || userImage}
                alt={user?.user_metadata.first_name || "User"}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {/* Profile Info / Edit Form */}
          <div className="flex flex-1 flex-col gap-4">
            {!isEditing ? (
              <div className="flex flex-col gap-1">
                <div className="flex items-start justify-between flex-col gap-2 md:flex-row">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-card-foreground">
                      {user?.user_metadata.first_name}{" "}
                      {user?.user_metadata.last_name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                    {user?.phone && (
                      <p className="text-sm text-muted-foreground">
                        {user.phone}
                      </p>
                    )}
                    {user?.user_metadata.date_of_birth && (
                      <p className="text-sm text-muted-foreground">
                        Date of birth:{" "}
                        {format(
                          user.user_metadata.date_of_birth,
                          "d MMMM yyyy",
                        )}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEditToggle}
                    className="border-border text-muted-foreground hover:text-foreground"
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            ) : (
              <UpdateUserProfileForm handleEditToggle={handleEditToggle} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
