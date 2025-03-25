import type { Variants } from "framer-motion";

export const infoWindowVariants: Variants = {
  initial: {
    height: "0%",
    boxShadow: "2px 1px 250px 250px rgba(255, 255, 255, 0.7)"
  },
  animate: {
    height: "auto",
    boxShadow: "2px 1px 5px 5px rgba(255, 255, 255, 0.7)",
    transition: {
      duration: 0.4
    }
  }
}