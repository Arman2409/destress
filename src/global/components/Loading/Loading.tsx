import { motion } from "framer-motion";

import styles from "../../../styles/globals/components/Loading.module.scss";
import { logoVariants } from "./utils/variants";

const Loading = () => (
    <div className={styles.loading_cont}>
        <motion.img
            variants={logoVariants}
            initial="initial"
            animate="animateLogo1"
            src="/logos/logo_loading.png"
            className={styles.loading_image}
        />
        <motion.img
            variants={logoVariants}
            initial="initial"
            animate="animateLogo2"
            src="/logos/logo_loading.png"
            className={styles.loading_image}
        />
    </div>
)

export default Loading;