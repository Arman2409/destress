import type { Variants } from "framer-motion"

export const logoVariants:Variants = {
   initial: {
      transform: "rotate(0deg) scale(1) translate(0px)",
   },
   animateLogo1: {
    transform: ["rotate(180deg)  scale(1) translate(0px)", "rotate(0deg) scale(0.5) translate(50px)", "rotate(0deg) scale(1)  translate(0px)",],
    transition: {
        duration: 2,
        repeat: Infinity
    }
   },
   animateLogo2: {
      transform: ["rotate(180deg) scale(1)  translate(0px)", "rotate(0deg) scale(0.5) translate(-50px)", "rotate(0deg) scale(1)  translate(0px)"],
      transition: {
          duration: 2,
          repeat: Infinity
      }
     },
}