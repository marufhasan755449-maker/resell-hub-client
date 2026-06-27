import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import axiosSecure from "../../../utils/axiosSecure";
import PageHeader from "../../../components/dashboard/PageHeader";
import EmptyState from "../../../components/dashboard/EmptyState";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import toast from "react-hot-toast";

const Wishlist = () => {
  const queryClient = useQueryClient();

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/wishlist");
      return res.data;
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/api/wishlist/${id}`);
    },
    onSuccess: () => {
      toast.success("Removed from wishlist");
      queryClient.invalidateQueries(["wishlist"]);
    },
  });

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <PageHeader title="My Wishlist" subtitle={`${wishlist.length} saved products`} />

      {wishlist.length === 0 ? (
        <EmptyState emoji="❤️" title="Your wishlist is empty" desc="Save products you love and buy them later" btnLabel="Explore Products" btnTo="/products" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wishlist.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="card-custom overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.product?.images?.[0] || "https://placehold.co/300x200?text=No+Image"}
                  alt={item.product?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => removeMutation.mutate(item._id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-base-100/90 rounded-xl flex items-center justify-center text-error hover:bg-error hover:text-white transition-all"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>

              <div className="p-4">
                <p className="text-xs text-primary font-medium mb-1">{item.product?.category}</p>
                <h3 className="font-display font-semibold text-sm text-base-content line-clamp-2 mb-2">
                  {item.product?.title}
                </h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-display font-bold text-primary">৳{item.product?.price?.toLocaleString()}</span>
                  <div className="flex gap-2">
                    <Link
                      to={`/products/${item.product?._id}`}
                      className="btn btn-ghost btn-xs rounded-lg"
                    >
                      View
                    </Link>
                    <Link
                      to={`/checkout/${item.product?._id}`}
                      className="btn btn-primary btn-xs rounded-lg text-white gap-1"
                    >
                      <FiShoppingCart size={11} /> Buy
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
