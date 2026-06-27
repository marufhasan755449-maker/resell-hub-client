import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiMapPin, FiTag, FiStar } from "react-icons/fi";
import { useState } from "react";
import axiosSecure from "../../utils/axiosSecure";
import { useAuth } from "../../context/AuthProvider";
import toast from "react-hot-toast";

const conditionColor = {
  "Like New": "badge-success",
  Good: "badge-info",
  Refurbished: "badge-warning",
  Used: "badge-ghost",
};

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const [wishlisted, setWishlisted] = useState(false);

  const handleWishlist = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login first!");
    try {
      await axiosSecure.post("/api/wishlist", { productId: product._id });
      setWishlisted(true);
      toast.success("Added to wishlist!");
    } catch {
      toast.error("Already in wishlist");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="card-custom overflow-hidden group flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.images?.[0] || "https://placehold.co/400x300?text=No+Image"}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Wishlist btn */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center shadow-md transition-all ${
            wishlisted
              ? "bg-red-500 text-white"
              : "bg-base-100/90 text-base-content/70 hover:bg-red-500 hover:text-white"
          }`}
        >
          <FiHeart size={16} fill={wishlisted ? "currentColor" : "none"} />
        </button>
        {/* Condition badge */}
        <span className={`badge badge-sm absolute top-3 left-3 ${conditionColor[product.condition] || "badge-ghost"}`}>
          {product.condition}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category */}
        <div className="flex items-center gap-1 text-primary text-xs font-medium mb-1">
          <FiTag size={11} />
          {product.category}
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-base-content text-sm leading-snug line-clamp-2 mb-2">
          {product.title}
        </h3>

        {/* Location */}
        {product.sellerInfo?.location && (
          <div className="flex items-center gap-1 text-base-content/50 text-xs mb-3">
            <FiMapPin size={11} />
            {product.sellerInfo.location}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-base-200">
          <span className="font-display font-bold text-primary text-lg">
            ৳{product.price?.toLocaleString()}
          </span>
          <Link
            to={`/products/${product._id}`}
            className="btn btn-primary btn-sm rounded-xl text-white text-xs px-4"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export const ProductCardSkeleton = () => (
  <div className="card-custom overflow-hidden">
    <div className="skeleton-custom aspect-[4/3]"></div>
    <div className="p-4 space-y-3">
      <div className="skeleton-custom h-3 w-24 rounded"></div>
      <div className="skeleton-custom h-4 w-full rounded"></div>
      <div className="skeleton-custom h-4 w-3/4 rounded"></div>
      <div className="flex justify-between items-center pt-2">
        <div className="skeleton-custom h-6 w-20 rounded"></div>
        <div className="skeleton-custom h-8 w-24 rounded-xl"></div>
      </div>
    </div>
  </div>
);

export default ProductCard;
