import { motion } from "framer-motion";

export default function AnimatedBadge({ 
  children, 
  className = "",
  variant = "default"
}) {
  const variants = {
    default: "bg-green-500 text-white",
    discount: "bg-red-500 text-white",
    new: "bg-blue-500 text-white",
    hot: "bg-orange-500 text-white",
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 15 
      }}
      whileHover={{ scale: 1.1 }}
      className={`inline-flex items-center justify-center px-2 py-1 rounded text-xs font-bold ${variants[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
}


