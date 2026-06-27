import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthProvider";
import axiosSecure from "../utils/axiosSecure";

const useUser = () => {
  const { user, loading: authLoading } = useAuth();

  const {
    data: dbUser,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email && !authLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users/me`);
      return res.data;
    },
  });

  const isAdmin = dbUser?.role === "admin";
  const isSeller = dbUser?.role === "seller";
  const isBuyer = dbUser?.role === "buyer";

  return { dbUser, isLoading, isAdmin, isSeller, isBuyer, refetch };
};

export default useUser;
