import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/pages/OceanFlow/OceanFlow.module.scss";
import Game from "./components/OceanFlowGame/OceanFlowGame";
import CornerButton from "../../global/components/CornerButton/CornerButton";
import configs from "../../configs/games/oceanFlow";
import updateAndGetVisitedStatus from "../../global/utils/updateAndGetVisitedStatus";
import InfoWindow from "../../global/components/InfoWindow/InfoWindow";

const { info, infoImage, infoImage2 } = { ...configs };

const OceanFlow = () => {
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const navigate = useNavigate();

    const changeShowStatus = useCallback((newStatus: boolean) => {
        setShowInfo(newStatus)
    }, [setShowInfo])

    useEffect(() => {
        // Update local storage for visited status
        const visited = updateAndGetVisitedStatus("oceanFlow");

        if (!visited) {
            setShowInfo(true);
        }
    }, [setShowInfo])

    return (
        <div className={styles.ocean_flow_main}>
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
                className={styles.ocean_flow_cont}>
                <Game />
            </div>
        </div>
    )
}

export default OceanFlow;