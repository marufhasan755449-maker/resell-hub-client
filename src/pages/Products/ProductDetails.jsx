import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FiMapPin, FiPhone, FiMail, FiHeart, FiShoppingCart,
  FiStar, FiChevronLeft, FiShare2, FiAlertCircle,
} from "react-icons/fi";
import axiosPublic from "../../utils/axiosPublic";
import axiosSecure from "../../utils/axiosSecure";
import { useAuth } from "../../context/AuthProvider";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import toast from "react-hot-toast";

const conditionColor = {
  "Like New": "badge-success",
  Good: "badge-info",
  Refurbished: "badge-warning",
  Used: "badge-ghost",
};

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/products/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p className="text-4xl mb-3">😕</p>
      <p className="text-xl font-display font-semibold text-base-content">Product not found</p>
      <Link to="/products" className="btn btn-primary rounded-xl mt-4 text-white">Back to Products</Link>
    </div>
  );

  const handleBuyNow = () => {
    if (!user) { toast.error("Please login to buy!"); return navigate("/login"); }
    navigate(`/checkout/${product._id}`);
  };

  const handleWishlist = async () => {
    if (!user) return toast.error("Please login first!");
    try {
      await axiosSecure.post("/api/wishlist", { productId: product._id });
      setWishlisted(true);
      toast.success("Added to wishlist!");
    } catch { toast.error("Already in wishlist"); }
  };

  const handleReport = async () => {
    if (!user) return toast.error("Please login first!");
    toast.success("Product reported. We'll review it shortly.");
  };

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="container-custom px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-base-content/50 mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary">Products</Link>
          <span>/</span>
          <span className="text-base-content truncate max-w-[200px]">{product.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-custom overflow-hidden aspect-[4/3] mb-3"
            >
              <img
                src={product.images?.[activeImg] || "https://placehold.co/600x400?text=No+Image"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? "border-primary" : "border-base-300"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="card-custom p-6">
              {/* Category + condition */}
              <div className="flex items-center gap-2 mb-3">
                <span className="badge badge-outline badge-sm text-primary border-primary">{product.category}</span>
                <span className={`badge badge-sm ${conditionColor[product.condition] || "badge-ghost"}`}>
                  {product.condition}
                </span>
              </div>

              <h1 className="text-2xl font-display font-bold text-base-content mb-3">{product.title}</h1>

              {/* Price */}
              <div className="text-3xl font-display font-bold text-primary mb-4">
                ৳{product.price?.toLocaleString()}
              </div>

              {/* Description */}
              <p className="text-base-content/60 text-sm leading-relaxed mb-6">{product.description}</p>

              {/* Seller info */}
              <div className="bg-base-200 rounded-2xl p-4 mb-6">
                <h3 className="font-semibold text-sm text-base-content mb-3">Seller Information</h3>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {product.sellerInfo?.name?.[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{product.sellerInfo?.name}</p>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(s => <FiStar key={s} size={10} className="text-amber-400 fill-amber-400" />)}
                    </div>
                  </div>
                </div>
                {product.sellerInfo?.phone && (
                  <div className="flex items-center gap-2 text-sm text-base-content/60">
                    <FiPhone size={13} /> {product.sellerInfo.phone}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleBuyNow}
                  disabled={product.status !== "available"}
                  className="btn btn-primary flex-1 rounded-xl text-white gap-2 font-semibold"
                >
                  <FiShoppingCart /> Buy Now
                </button>
                <button
                  onClick={handleWishlist}
                  className={`btn btn-outline rounded-xl gap-2 ${wishlisted ? "btn-error text-white" : "btn-ghost"}`}
                >
                  <FiHeart fill={wishlisted ? "currentColor" : "none"} />
                </button>
                <button onClick={handleReport} className="btn btn-ghost rounded-xl">
                  <FiAlertCircle />
                </button>
              </div>

              {product.status !== "available" && (
                <p className="text-error text-sm mt-3 text-center font-medium">This product is no longer available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
