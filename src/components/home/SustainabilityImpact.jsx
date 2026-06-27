import { motion } from "framer-motion";
import { FiDroplet, FiZap, FiTrash2, FiGlobe } from "react-icons/fi";
import SectionTitle from "../ui/SectionTitle";

const impacts = [
  { icon: <FiDroplet size={28} />, value: "2.5M", unit: "Liters", label: "Water Saved", color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: <FiZap size={28} />, value: "1.8M", unit: "kWh", label: "Energy Conserved", color: "text-amber-500", bg: "bg-amber-500/10" },
  { icon: <FiTrash2 size={28} />, value: "450K", unit: "kg", label: "Waste Reduced", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: <FiGlobe size={28} />, value: "320K", unit: "kg CO₂", label: "Emissions Avoided", color: "text-violet-500", bg: "bg-violet-500/10" },
];

const SustainabilityImpact = () => (
  <section className="section-padding bg-base-100">
    <div className="container-custom">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge badge-success badge-outline mb-4">🌿 Sustainability</span>
          <h2 className="section-title mb-4">
            Every Purchase Helps the Planet
          </h2>
          <p className="text-base-content/60 leading-relaxed mb-6">
            By choosing second-hand products on ReSellHub, you're not just saving money — you're actively reducing waste, conserving resources, and helping Bangladesh build a more sustainable future.
          </p>
          <p className="text-base-content/60 leading-relaxed">
            Each transaction on our platform extends the life of a product and reduces the environmental cost of manufacturing new goods. Together, our community has made a measurable difference.
          </p>
        </motion.div>

        {/* Right — Impact grid */}
        <div className="grid grid-cols-2 gap-4">
          {impacts.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-custom p-5 text-center"
            >
              <div className={`${item.bg} ${item.color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                {item.icon}
              </div>
              <p className={`text-2xl font-display font-bold ${item.color}`}>{item.value}</p>
              <p className="text-xs text-base-content/40 font-medium">{item.unit}</p>
              <p className="text-base-content/60 text-sm mt-1">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default SustainabilityImpact;
