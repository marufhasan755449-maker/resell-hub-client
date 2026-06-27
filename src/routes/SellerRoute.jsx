import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const SellerRoute = ({ children }) => {
  const { isSeller, isAdmin, isLoading } = useUser();

  if (isLoading) return <LoadingSpinner />;
  if (!isSeller && !isAdmin) return <Navigate to="/dashboard" replace />;

  return children;
};

export default SellerRoute;
