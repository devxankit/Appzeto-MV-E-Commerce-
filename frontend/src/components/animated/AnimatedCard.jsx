import { motion } from "framer-motion";
import { useState } from "react";

export default function AnimatedCard({ 
  children, 
  className = "",
  delay = 0,
  hoverScale = 1.02,
  ...props 
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: hoverScale, y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}


