// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React from "react";

function Button({
  children,
  className = "",
  onClick,
  type = "button",
  ...rest
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 0.9,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.7 }}
      type={type}
      className={`p-2 rounded cursor-pointer ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

export default Button;
