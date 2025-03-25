import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaInfo } from "react-icons/fa";

import styles from "../../styles/globals/components/CornerButton.module.scss";
import { arrowIconVariants } from "./utils/variants";
import type { CornerButtonProps } from "../../types/home";

const BackButton = ({ extraStyles = {}, action, type = "back" }: CornerButtonProps) => {
    const [hovered, setHovered] = useState<boolean>(false)
    const navigate = useNavigate();

    const goBack = useCallback(() => navigate("/"), [navigate])

    return (
        <div
            className={styles.corner_button_main}
            style={
                type === "back" ? {
                    left: "10px",
                    ...extraStyles,
                } : 
                type === "info" ? {
                    right: "10px",
                ...extraStyles,
            } : {}}
            onClick={action || goBack}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            >
            <motion.div
                animate={hovered ? "animate" : {}}
                initial="initial"
                variants={arrowIconVariants}
            >
                {type === "back" && <FaArrowLeft />}
                {type === "info" && <FaInfo />}
            </motion.div>
        </div>
    )
}

export default BackButton;