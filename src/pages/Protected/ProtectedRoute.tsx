import { Navigate, Outlet } from "react-router-dom";
import Loader from "@/components/ui/loader";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center my-10 p-5">
        <Loader />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
