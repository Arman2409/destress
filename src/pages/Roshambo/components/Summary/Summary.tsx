import { useContext, useEffect, useState } from "react";

import styles from "../../../../styles/pages/Roshambo/components/Summary/Summary.module.scss";
import configs from "../../../../configs/games/roshambo";
import useDebounce from "../../../../utils/hooks/useDebounce";
import { RoshamboContext } from "../../Roshambo";
import { defineGameStatus } from "../../utils/functions";
import { statusesData } from "./utils/data";
import { gameStatusIcons } from "./utils/helpers";
import type { GameStatus, Jest } from "../../../../types/roshambo";

const { summaryWaitTime } = { ...configs };
const { texts, colors } = { ...statusesData };

const Summary = () => {
  const { chosenJest, opponentJest, dispatchJest, dispatchOpponentJest } = useContext(RoshamboContext);
  const [gameStatus, setGameStatus] = useState<GameStatus>("draw");

  const debouncedOpponentJest = useDebounce(opponentJest, summaryWaitTime * 1000)

  useEffect(() => {
    if (debouncedOpponentJest && chosenJest) {
      const gameStatus = defineGameStatus(chosenJest || "rock", debouncedOpponentJest as Jest || "rock");
      setGameStatus(gameStatus || "draw");

      setTimeout(() => {
        dispatchOpponentJest(null);
        dispatchJest(null);
      }, 1000)
    }

  }, [chosenJest, debouncedOpponentJest, dispatchOpponentJest, dispatchJest, gameStatus, setGameStatus]);

  const Icon = gameStatusIcons.get(gameStatus);
  
  return (
    <div
      className="absolute_background centered"
      style={{
        visibility: debouncedOpponentJest && opponentJest ? "visible" : "hidden",
      }}>
      <div className="absolute_background demo" />
      <div className={styles.summary_content}>
        <h2 className={styles.summary_title}>
          {texts[gameStatus as keyof typeof texts]}
        </h2>
        <p style={{
          color: colors[gameStatus as keyof typeof texts]
        }}>
          {Icon}
        </p>
      </div>
    </div>
  )
}

export default Summary;