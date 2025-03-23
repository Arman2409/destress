import { motion } from "framer-motion";

import styles from "../../../styles/globals/components/ScoreAlert.module.scss";
import { scoreContVariants } from "./utils/variants";
import type { ScoreAlertProps } from "../../../types/shared";

const ScoreAlert = ({ content, mode = "custom", score, width, height }: ScoreAlertProps) => {
    const scoreWidth = width ? width : 125;

    return (
        <motion.div
            variants={scoreContVariants}
            initial="initial"
            animate="animate"
            className={styles.score_main}
            style={{
                width: score && score.toString().length > 5 ?  + (score.toString().length - 5) * 15 : scoreWidth + "px",
                height: height + "px"
            }} >
            {mode === "custom" ?
             score && score
                :  content}
        </motion.div>
    )
}

export default ScoreAlert;