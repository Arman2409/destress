import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import styles from "../../../../../../styles/pages/Home/components/GameTiles/Tile.module.scss";
import { getIsMobile } from "../../../../../../global/utils/dimesions";
import { backgroundImageVariants, cornerImageInitializeVariants, getCornerImageVariants, getTitleVariants } from "./utils/variants";
import type { GameTileProps } from "../../../../../../types/home";

const GameTile = ({
    image,
    cornerImage,
    cornerInitialized,
    link,
    name,
    hasMobile,
    choseGame }: GameTileProps) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const navigate = useNavigate();

    const isMedium = window.innerWidth > 650;

    const clickTile = useCallback(() => {
        if(!(isMobile && !hasMobile)) {
            navigate("/" + link)
            choseGame && choseGame();
        }
    }, [choseGame, navigate, link]);

    useEffect(() => {
        setIsMobile(getIsMobile());

        window.addEventListener("resize", () => {
            setIsMobile(getIsMobile())
        })
    }, [setIsMobile])

    return (
        <div
            className={styles.tile}
            onClick={clickTile}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {isMobile && !hasMobile && (<div
                className={styles.tile_mobile_demo}>
                Not available for modile
            </div>
            )}
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
            {hovered && !(isMobile && !hasMobile) && <motion.p
                initial="initial"
                animate="animate"
                className={styles.tile_title}
                variants={getTitleVariants(isMedium)}
            >
                {name}
            </motion.p>
            }
        </div>
    )
}

export default GameTile;