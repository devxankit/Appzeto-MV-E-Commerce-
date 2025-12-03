import { motion } from "framer-motion";

export default function AnimatedSectionTitle({ 
  title, 
  subtitle, 
  className = "" 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      {subtitle && (
        <p className="text-xs text-gray-500">{subtitle}</p>
      )}
    </motion.div>
  );
}


