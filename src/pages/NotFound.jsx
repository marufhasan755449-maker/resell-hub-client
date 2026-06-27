import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome } from "react-icons/fi";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center px-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <div className="text-[10rem] font-display font-bold text-gradient leading-none mb-4">
        404
      </div>
      <h2 className="text-2xl font-display font-bold text-base-content mb-3">Page Not Found</h2>
      <p className="text-base-content/50 max-w-sm mb-8">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary rounded-xl gap-2 text-white px-8">
        <FiHome /> Back to Home
      </Link>
    </motion.div>
  </div>
);

export default NotFound;
