import type { Variants } from "framer-motion";

export const arrowIconVariants:Variants = {
    initial: {
       transform: "rotate(0deg)"
    },
    animate: {
        transform: ["rotate(-20deg)", "rotate(20deg)", "rotate(0deg)"],
        marginLeft: ["0px", "15px", "0px"],
        transition: {
            duration: 1,
            delay: 0.2,
            ease: "easeInOut",
            repeat: Infinity
        }
    }
} 