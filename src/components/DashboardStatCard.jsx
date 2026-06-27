import { motion } from "framer-motion";

const DashboardStatCard = ({ icon, title, value, subtitle, color = "primary", delay = 0 }) => {
  const colorMap = {
    primary: "bg-primary/10 text-primary",
    success: "bg-emerald-500/10 text-emerald-500",
    warning: "bg-amber-500/10 text-amber-500",
    error: "bg-red-500/10 text-red-500",
    violet: "bg-violet-500/10 text-violet-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card-custom p-5 flex items-center gap-4"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${colorMap[color]}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-base-content/50 text-xs font-medium uppercase tracking-wide">{title}</p>
        <p className="text-2xl font-display font-bold text-base-content">{value}</p>
        {subtitle && <p className="text-xs text-base-content/40 mt-0.5 truncate">{subtitle}</p>}
      </div>
    </motion.div>
  );
};

export default DashboardStatCard;
