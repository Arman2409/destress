import { useContext, useEffect, useState } from "react";

import styles from "../../../../styles/pages/Roshambo/components/Score/Score.module.scss";
import { RoshamboContext } from "../../Roshambo";
import AnimatingScores from "./components/AnimatingScores/AnimatingScores";
import ScoreAlert from "../../../../global/components/ScoreAlert/ScoreAlert";

const Score = () => {
  const [userScores, setUserScores] = useState(0);
  const [opponentScores, setOpponentScores] = useState(0);
  const { opponentScore, userScore } = useContext(RoshamboContext);
  // define which side of the score window should be animated 

  useEffect(() => {
    setTimeout(() => {
      setUserScores(userScore);
      setOpponentScores(opponentScore);
    }, 500)
  }, [opponentScore, userScore, setUserScores, setOpponentScores])

  return (
    <ScoreAlert
      mode="extra"
      width={175}
      height={65}
      content={
        <>
          <div className={styles.score_cont_bordered}>
            {userScore !== userScores ? <AnimatingScores score={userScore} />
              : <p>{userScore}</p>}
          </div>
          <div className={styles.score_cont}>
            {opponentScore !== opponentScores ? <AnimatingScores score={opponentScore} />
              : <p>{opponentScore}</p>}
          </div>
        </>
      }
    />
  )
}

export default Score;