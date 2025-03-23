import type { Variants } from "framer-motion";

import configs from "../../../../../../../configs/games/roshambo";

const {
    animationDuration
} = {...configs};

export const shakingImageVariants: Variants = {
    initial: {
        transform: "rotate(0deg)"
    },
    animate: {
        transform: ["rotate(5deg)", "rotate(5deg)", "rotate(0deg)"],
        transition: {
            duration: animationDuration / 3,
            repeat: 3,
            repeatType: "reverse"
        }
    }
}