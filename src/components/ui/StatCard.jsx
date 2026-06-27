import { motion } from "framer-motion";
import CountUp from "react-countup";

const StatCard = ({ icon, value, label, color = "text-primary", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="card-custom p-6 text-center"
  >
    <div className={`text-4xl mb-3 ${color} flex justify-center`}>{icon}</div>
    <div className={`text-3xl font-display font-bold ${color}`}>
      <CountUp end={value} duration={2.5} separator="," />
      <span>+</span>
    </div>
    <p className="text-base-content/60 text-sm mt-1 font-medium">{label}</p>
  </motion.div>
);

export default StatCard;
