import { useEffect, useState } from "react";

import styles from "../../../../styles/pages/Home/components/GameTiles/GameTiles.module.scss";
import configs from "../../../../configs/home";
import getChunks from "../../../../utils/helpers/grtChunks";
import { gamesData } from "../../../../data/pages";
import GameTile from "./components/GameTile/GameTile";
import type { GameTilesProps, Game } from "../../../../types/home";

const { cornerImageInitialingDuration } = { ...configs };

const GameTiles = ({ choseGame }: GameTilesProps) => {
    const [initializedCorners, setInitializedCorners] = useState<boolean>(false);

    const games = gamesData.sort(
        (
            { order },
            { order: currOrder }
        ) => {
            return order - currOrder;
        }
    )

    const gameGroups = getChunks(games, 2) as Game[][];

    useEffect(() => {
        setTimeout(() => {
            setInitializedCorners(true);
        }, cornerImageInitialingDuration * 1000)
    }, [setInitializedCorners])

    return (
        <div className={styles.game_tiles_main}>
            <div className={styles.games_groups}>
                {gameGroups.map((games: Game[], index) => (
                    <div
                        key={index}
                        className={styles.games_group}
                    >
                        {games.map((game: Game) => (
                            <GameTile
                                key={game.order}
                                choseGame={choseGame}
                                cornerInitialized={initializedCorners}
                                {...game}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GameTiles;