import { motion } from "framer-motion";
import { FiStar, FiPackage, FiCheckCircle } from "react-icons/fi";
import SectionTitle from "../ui/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../utils/axiosPublic";

const fallbackSellers = [
  { name: "Nusrat Jahan", totalProducts: 24, rating: 4.9, isVerified: true, avatar: "https://i.pravatar.cc/80?img=5", location: "Dhaka" },
  { name: "Karim Ahmed", totalProducts: 18, rating: 4.8, isVerified: true, avatar: "https://i.pravatar.cc/80?img=8", location: "Chittagong" },
  { name: "Sadia Islam", totalProducts: 31, rating: 4.7, isVerified: false, avatar: "https://i.pravatar.cc/80?img=9", location: "Sylhet" },
  { name: "Tanvir Alam", totalProducts: 15, rating: 4.9, isVerified: true, avatar: "https://i.pravatar.cc/80?img=12", location: "Rajshahi" },
];

const TrustedSellers = () => {
  const { data: sellers } = useQuery({
    queryKey: ["topSellers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/users/top-sellers");
      return res.data;
    },
  });

  const displaySellers = sellers?.length ? sellers : fallbackSellers;

  return (
    <section className="section-padding bg-base-200">
      <div className="container-custom">
        <SectionTitle
          title="Trusted Sellers"
          subtitle="Top-rated sellers you can rely on"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displaySellers.slice(0, 4).map((seller, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-custom p-6 text-center"
            >
              <div className="relative inline-block mb-4">
                <img
                  src={seller.avatar || seller.photo || `https://ui-avatars.com/api/?name=${seller.name}&background=0ea5e9&color=fff`}
                  alt={seller.name}
                  className="w-16 h-16 rounded-full object-cover mx-auto ring-2 ring-primary ring-offset-base-100 ring-offset-2"
                />
                {seller.isVerified && (
                  <FiCheckCircle className="absolute bottom-0 right-0 text-emerald-500 bg-base-100 rounded-full text-lg" />
                )}
              </div>

              <h3 className="font-display font-semibold text-base-content text-sm">{seller.name}</h3>
              <p className="text-base-content/50 text-xs mt-0.5">{seller.location}</p>

              <div className="flex items-center justify-center gap-1 mt-2">
                <FiStar size={12} className="text-amber-400 fill-amber-400" />
                <span className="text-sm font-semibold text-base-content">{seller.rating}</span>
              </div>

              <div className="flex items-center justify-center gap-1 mt-2 text-base-content/50 text-xs">
                <FiPackage size={11} />
                {seller.totalProducts} products
              </div>

              {seller.isVerified && (
                <span className="badge badge-success badge-sm mt-3">✓ Verified</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedSellers;
