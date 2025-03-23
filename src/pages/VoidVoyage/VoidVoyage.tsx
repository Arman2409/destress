// This game is disabled right now 
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/pages/VoidVoyage/VoidVoyage.module.scss";
import VoidVoyageGame from "./components/VoidVoyageGame/VoidVoyageGame";
import updateAndGetVisitedStatus from "../../global/utils/updateAndGetVisitedStatus";
import CornerButton from "../../global/components/CornerButton/CornerButton";
import InfoWindow from "../../global/components/InfoWindow/InfoWindow";
import configs from "../../configs/games/synapseHash";

const { info, infoImage } = { ...configs };

const VoidVoyage = () => {

    const [showInfo, setShowInfo] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Update local storage for visited status
        const visited = updateAndGetVisitedStatus("voidVoyage");
        if (!visited) {
            setShowInfo(true);
        }
    }, [setShowInfo])

    return (
        <div className={styles.voidVoyage_main}>
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
            <CornerButton
                type="back"/>
            <CornerButton
                type="info"
                action={() => setShowInfo(true)} />
            <div className={styles.voidVoyage_cont}>
                <VoidVoyageGame />
            </div>
        </div>
    )
}

export default VoidVoyage;