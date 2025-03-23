import { useContext, useEffect, useState } from "react";
import { PiWineBold } from "react-icons/pi";
import { FaHeartBroken, FaEquals } from "react-icons/fa";

import styles from "../../../../styles/pages/Roshambo/components/Summary/Summary.module.scss";
import type { GameStatus } from "../../../../types/roshambo";
import { RoshamboContext } from "../../Roshambo";
import { defineGameStatus } from "../../utils/functions";
import { statusesData } from "./utils/data";
import configs from "../../../../configs/games/roshambo";

const { summaryWaitTime } = { ...configs };
const { texts, colors } = { ...statusesData };

const Summary = () => {
  const { chosenJest, opponentJest, dispatchJest, dispatchOpponentJest } = useContext(RoshamboContext);
  const [gameStatus, setGameStatus] = useState<GameStatus>("draw");

  useEffect(() => {
    const gameStatus = defineGameStatus(chosenJest || "rock", opponentJest || "rock");
    setGameStatus(gameStatus || "draw");
  }, [chosenJest, opponentJest, gameStatus, setGameStatus])

  useEffect(() => {
    setTimeout(() => {
      dispatchOpponentJest(null);
      dispatchJest(null);
    }, summaryWaitTime * 1000)
  }, [dispatchOpponentJest, dispatchJest])

  return (
    <div className="absolute_background centered">
      <div className="absolute_background demo" />
      <div className={styles.summary_content}>
        <h2 className={styles.summary_title}>
          {texts[gameStatus as keyof typeof texts]}
        </h2>
        <p style={{
          color: colors[gameStatus as keyof typeof texts]
        }}>
          {gameStatus === "win" && <PiWineBold />}
          {gameStatus === "lose" && <FaHeartBroken />}
          {gameStatus === "draw" && <FaEquals />}
        </p>
      </div>
    </div>
  )
}

export default Summary;