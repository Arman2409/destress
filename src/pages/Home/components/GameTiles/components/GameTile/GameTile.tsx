import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import styles from "../../../../../../styles/pages/Home/components/GameTiles/Tile.module.scss";
import { backgroundImageVariants, cornerImageInitializeVariants, getCornerImageVariants, getTitleVariants } from "./utils/variants";
import type { TileProps } from "../../../../../../types/home";

const GameTile = ({
    image,
    cornerImage,
    cornerInitialized,
    link,
    name,
    choseGame }: TileProps) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const navigate = useNavigate();

    const isMedium = window.innerWidth > 650;

    const clickTile = useCallback(() => {
        navigate("/" + link)
        choseGame && choseGame();
    }, [choseGame, navigate, link])

    return (
        <div
            className={styles.tile}
            onClick={clickTile}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={styles.tile_content}>
                {cornerImage && <motion.img
                    src={cornerImage}
                    className={styles.tile_corner_image}
                    variants={cornerInitialized ? getCornerImageVariants() : cornerImageInitializeVariants}
                    initial="initial"
                    animate="animate"
                />}
                <motion.img
                    src={image}
                    alt={name}
                    className="absolute_background"
                    variants={backgroundImageVariants}
                    initial="initial"
                    animate={hovered ? "animate" : ""}
                />
                {hovered && <motion.p
                    initial="initial"
                    animate="animate"
                    className={styles.tile_title}
                    variants={getTitleVariants(isMedium)}
                >
                    {name}
                </motion.p>
                }
            </div>

        </div>
    )
}

export default GameTile;