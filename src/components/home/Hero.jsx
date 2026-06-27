import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiShield, FiTruck, FiRefreshCw } from "react-icons/fi";

const badges = [
  { icon: <FiShield />, text: "Secure Payments" },
  { icon: <FiTruck />, text: "Fast Delivery" },
  { icon: <FiRefreshCw />, text: "Easy Returns" },
];

const Hero = ({ stats }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center bg-hero-gradient overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Top badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-white/80 text-sm font-medium">Bangladesh's #1 Second-Hand Marketplace</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6"
            >
              Buy & Sell
              <span className="block text-gradient bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Pre-Owned Goods
              </span>
              with Confidence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/70 text-lg mb-8 leading-relaxed max-w-lg"
            >
              Join thousands of buyers and sellers. Find great deals on electronics, furniture, vehicles, and more — all in one place.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link
                to="/products"
                className="btn bg-primary hover:bg-primary-600 text-white border-none rounded-xl px-8 gap-2 font-semibold shadow-lg shadow-primary/30"
              >
                Browse Products <FiArrowRight />
              </Link>
              <Link
                to="/register"
                className="btn btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-xl px-8 font-semibold"
              >
                Start Selling
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              {badges.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-white/60 text-sm">
                  <span className="text-accent">{b.icon}</span>
                  {b.text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Stats cards */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              { label: "Total Products", value: stats?.totalProducts || 1200, color: "from-sky-500 to-blue-600" },
              { label: "Active Sellers", value: stats?.totalSellers || 340, color: "from-emerald-500 to-teal-600" },
              { label: "Happy Buyers", value: stats?.totalBuyers || 2800, color: "from-violet-500 to-purple-600" },
              { label: "Orders Completed", value: stats?.totalOrders || 980, color: "from-orange-500 to-amber-600" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`bg-gradient-to-br ${s.color} rounded-2xl p-6 text-white shadow-xl`}
              >
                <p className="text-white/70 text-sm font-medium mb-1">{s.label}</p>
                <p className="text-3xl font-display font-bold">{s.value.toLocaleString()}+</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 20C1200 60 900 0 720 20C540 40 240 0 0 20L0 60Z" className="fill-base-100" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
