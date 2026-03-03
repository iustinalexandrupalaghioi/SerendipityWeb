import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { LogoutButton } from "./LogoutButton";
import { useAuth } from "@/contexts/AuthContext";

export function AuthButton() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (user) {
    return <LogoutButton />;
  }

  return (
    <Link to="/auth/login">
      <Button size="sm" variant="outline">
        Sign in
      </Button>
    </Link>
  );
}
