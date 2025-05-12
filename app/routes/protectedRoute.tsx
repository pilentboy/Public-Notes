import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ displayWarning: true }} />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
