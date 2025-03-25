import type { Variants } from "framer-motion"

export const scoreContVariants:Variants = {
    initial: {
        top: "-50px"
    },
    animate: {
        top: "15px",
        transition: {
            duration: 1
        }
    }
}