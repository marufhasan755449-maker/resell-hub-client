import { motion } from "framer-motion";
import { FiPackage, FiUsers, FiShoppingCart, FiTrendingUp } from "react-icons/fi";
import SectionTitle from "../ui/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../utils/axiosPublic";

const MarketplaceStats = () => {
  const { data: stats } = useQuery({
    queryKey: ["platformStats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/stats");
      return res.data;
    },
  });

  const items = [
    { icon: <FiPackage size={32} />, label: "Total Products", value: stats?.totalProducts || 1200, color: "text-primary", bg: "bg-primary/10" },
    { icon: <FiUsers size={32} />, label: "Total Sellers", value: stats?.totalSellers || 340, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { icon: <FiShoppingCart size={32} />, label: "Total Buyers", value: stats?.totalBuyers || 2800, color: "text-violet-500", bg: "bg-violet-500/10" },
    { icon: <FiTrendingUp size={32} />, label: "Completed Orders", value: stats?.totalOrders || 980, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  return (
    <section className="section-padding bg-base-200">
      <div className="container-custom">
        <SectionTitle
          title="Marketplace at a Glance"
          subtitle="Numbers that speak for themselves"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-custom p-6 text-center"
            >
              <div className={`${item.bg} ${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                {item.icon}
              </div>
              <p className={`text-3xl font-display font-bold ${item.color}`}>
                {item.value.toLocaleString()}+
              </p>
              <p className="text-base-content/60 text-sm mt-1">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketplaceStats;
