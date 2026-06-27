import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

const categories = [
  { name: "Electronics", emoji: "💻", count: "240+", color: "from-blue-500 to-cyan-500" },
  { name: "Furniture", emoji: "🛋️", count: "180+", color: "from-amber-500 to-orange-500" },
  { name: "Vehicles", emoji: "🚗", count: "95+", color: "from-red-500 to-rose-500" },
  { name: "Fashion", emoji: "👗", count: "320+", color: "from-pink-500 to-fuchsia-500" },
  { name: "Mobile Phones", emoji: "📱", count: "210+", color: "from-violet-500 to-purple-500" },
  { name: "Books", emoji: "📚", count: "150+", color: "from-green-500 to-emerald-500" },
  { name: "Sports", emoji: "⚽", count: "80+", color: "from-teal-500 to-cyan-600" },
  { name: "Home Appliances", emoji: "🏠", count: "130+", color: "from-indigo-500 to-blue-600" },
];

const PopularCategories = () => (
  <section className="section-padding bg-base-200">
    <div className="container-custom">
      <SectionTitle
        title="Popular Categories"
        subtitle="Browse products by category"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.04 }}
          >
            <Link
              to={`/products?category=${cat.name}`}
              className="block card-custom overflow-hidden group"
            >
              <div className={`bg-gradient-to-br ${cat.color} p-6 flex flex-col items-center text-center`}>
                <span className="text-4xl mb-2">{cat.emoji}</span>
                <h3 className="font-display font-bold text-white text-sm">{cat.name}</h3>
                <span className="text-white/70 text-xs mt-1">{cat.count} items</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PopularCategories;
