import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { isAdmin, isLoading } = useUser();

  if (isLoading) return <LoadingSpinner />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return children;
};

export default AdminRoute;
