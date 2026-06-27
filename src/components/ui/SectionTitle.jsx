import { motion } from "framer-motion";

const SectionTitle = ({ title, subtitle, center = true }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-10 ${center ? "text-center" : ""}`}
  >
    <h2 className="section-title">{title}</h2>
    {subtitle && <p className="section-subtitle mt-2">{subtitle}</p>}
    <div className={`mt-3 h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full ${center ? "mx-auto" : ""}`} />
  </motion.div>
);

export default SectionTitle;
