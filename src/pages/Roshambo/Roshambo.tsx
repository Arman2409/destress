import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/pages/Roshambo/Roshambo.module.scss";
import type { RoshamboContextDetails, GameStatus, Jest } from "../../types/roshambo";
import Instruction from "./components/Instruction/Instruction";
import Animation from "./components/Animation/Animation";
import Summary from "./components/Summary/Summary";
import CornerButton from "../../global/components/CornerButton/CornerButton";
import Score from "./components/Score/Score";
import { defineGameStatus } from "./utils/functions";
import updateAndGetVisitedStatus from "../../global/utils/updateAndGetVisitedStatus";
import configs from "../../configs/games/roshambo";
import InfoWindow from "../../global/components/InfoWindow/InfoWindow";
import { getIsMobile } from "../../global/utils/dimesions";
import { getHasMobile } from "../../global/utils/getHasMobile";

const { info, infoImage } = { ...configs };

export const RoshamboContext = createContext<RoshamboContextDetails>({} as RoshamboContextDetails);

const Roshambo = () => {
    const [chosenJest, setChosenJest] = useState<Jest | null>(null);
    const [opponentJest, setOpponentJest] = useState<Jest | null>(null);
    const [userScore, setUserScore] = useState<number>(0);
    const [opponentScore, setOpponentScore] = useState<number>(0);
    const [result, setResult] = useState<GameStatus>("draw");
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isMobile = getIsMobile();
        const hasMobile = getHasMobile("Ocean Flow");

        if (isMobile && !hasMobile) {
            navigate("/");
        }

        // update local storage 
        const visited = updateAndGetVisitedStatus("roshambo");
        if (!visited) {
            setShowInfo(true);
        }
    }, [setShowInfo])

    useEffect(() => {
        if (chosenJest && opponentJest) {
            const gameStatus = defineGameStatus(chosenJest, opponentJest);
            setResult(gameStatus || "draw");
            if (gameStatus === "win") {
                setUserScore(curr => curr + 1);
            }
            if (gameStatus === "lose") {
                setOpponentScore(curr => curr + 1);
            }
        }
    }, [chosenJest, opponentJest, setOpponentScore, setResult, setUserScore])

    return (
        <RoshamboContext.Provider value={{
            chosenJest,
            dispatchJest: setChosenJest,
            opponentJest,
            dispatchOpponentJest: setOpponentJest,
            opponentScore,
            userScore,
            result
        }}>
            <InfoWindow
                visible={showInfo}
                setVisible={setShowInfo}
                text={info}
                image={infoImage}
                onOk={() => setShowInfo(false)}
                onCancel={() => navigate("/")}
                cancelText={"Go Back"}
                confirmText={"Continue"}
            />
            <div className={styles.roshambo_main}>
                <CornerButton
                    type="back"
                />
                <CornerButton
                    type="info"
                    action={() => setShowInfo(true)}
                />
                <div className={styles.roshambo_cont}>
                    <Score />
                    {chosenJest ? <Animation />
                        : <Instruction />}
                    {opponentJest && <Summary />}
                </div>
            </div>
        </RoshamboContext.Provider>
    )
}

export default Roshambo;