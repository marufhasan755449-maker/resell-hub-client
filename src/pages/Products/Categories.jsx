import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { name: "Electronics", emoji: "💻", desc: "Laptops, TVs, Cameras & more", color: "from-blue-500 to-cyan-500" },
  { name: "Furniture", emoji: "🛋️", desc: "Sofas, Tables, Beds & more", color: "from-amber-500 to-orange-500" },
  { name: "Vehicles", emoji: "🚗", desc: "Cars, Bikes, Scooters & more", color: "from-red-500 to-rose-500" },
  { name: "Fashion", emoji: "👗", desc: "Clothes, Shoes, Bags & more", color: "from-pink-500 to-fuchsia-500" },
  { name: "Mobile Phones", emoji: "📱", desc: "Smartphones, Tablets & more", color: "from-violet-500 to-purple-500" },
  { name: "Books", emoji: "📚", desc: "Textbooks, Novels & more", color: "from-green-500 to-emerald-500" },
  { name: "Sports", emoji: "⚽", desc: "Equipment, Gear & more", color: "from-teal-500 to-cyan-600" },
  { name: "Home Appliances", emoji: "🏠", desc: "Fridge, AC, Oven & more", color: "from-indigo-500 to-blue-600" },
];

const Categories = () => (
  <div className="min-h-screen bg-base-200">
    <div className="bg-hero-gradient py-16 text-center">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-display font-bold text-white mb-2">
        Browse Categories
      </motion.h1>
      <p className="text-white/60">Find exactly what you're looking for</p>
    </div>

    <div className="container-custom px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ scale: 1.03 }}
          >
            <Link to={`/products?category=${cat.name}`} className="block card-custom overflow-hidden group">
              <div className={`bg-gradient-to-br ${cat.color} p-8 text-center`}>
                <span className="text-5xl">{cat.emoji}</span>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-display font-bold text-base-content mb-1">{cat.name}</h3>
                <p className="text-base-content/50 text-sm">{cat.desc}</p>
                <span className="btn btn-ghost btn-sm rounded-xl mt-3 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  Browse →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Categories;
