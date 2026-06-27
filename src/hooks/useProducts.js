import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../utils/axiosPublic";

const useProducts = ({ search = "", category = "", sort = "", page = 1, limit = 9 } = {}) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", search, category, sort, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        search,
        category,
        sort,
        page,
        limit,
      });
      const res = await axiosPublic.get(`/api/products?${params}`);
      return res.data;
    },
  });

  return {
    products: data?.products || [],
    totalPages: data?.totalPages || 1,
    totalCount: data?.totalCount || 0,
    isLoading,
    refetch,
  };
};

export default useProducts;
