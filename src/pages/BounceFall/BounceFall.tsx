import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/pages/BounceFall/BounceFall.module.scss";
import CornerButton from "../../components/CornerButton/CornerButton";
import configs from "../../configs/games/bounceFall";
import updateAndGetVisitedStatus from "../../utils/helpers/updateAndGetVisitedStatus";
import InfoWindow from "../../components/InfoWindow/InfoWindow";
import { getIsMobile } from "../../utils/helpers/dimesions";
import { getHasMobile } from "../../utils/helpers/getHasMobile";
import Game from "./components/BounceFallGame/BounceFallGame";

const { info, infoImage, infoImage2, mouseExtraX, mouseExtraY, ballRadius } = { ...configs };

const BounceFall = () => {
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const navigate = useNavigate();

    const changeShowStatus = useCallback((newStatus: boolean) => setShowInfo(newStatus), [setShowInfo])
    
    useEffect(() => {
        const isMobile = getIsMobile();

        console.log("Test getIsMobile, result:", getIsMobile());
        
        const hasMobile = getHasMobile("Bounce Fall");

        console.log("Test getHasMobile, result:", getHasMobile("bounceFall"));


        if(isMobile && !hasMobile) {
            navigate("/");
        }

        // Update local storage for visited status
        const visited = updateAndGetVisitedStatus("bounceFall");
        if (!visited) {
            setShowInfo(true);
        }
    }, [setShowInfo, navigate])

    return (
        <div
            className={styles.bounce_fall_main}
        >
            <InfoWindow
                visible={showInfo}
                setVisible={changeShowStatus}
                text={info}
                image={infoImage}
                image2={infoImage2}
                imageWidth1={"66%"}
                imageWidth2={"33%"}
                onOk={() => changeShowStatus(false)}
                onCancel={() => navigate("/")}
                cancelText={"Go Back"}
                confirmText={"Continue"}
            />
            <CornerButton type="back" />
            <CornerButton
                type="info"
                action={() => changeShowStatus(true)} />
            <div
                className={styles.bounce_fall_cont}
            >
                <Game
                    mouseExtraX={mouseExtraX}
                    mouseExtraY={mouseExtraY}
                    canvasHeight={90}
                    canvasWidth={95}
                    ballRadius={ballRadius} />
            </div>
        </div>
    )
}

export default BounceFall;