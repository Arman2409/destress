import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/pages/SynapseHash/SynapseHash.module.scss";
import Game from "./components/SynapseHashGame/SynapseHashGame";
import updateAndGetVisitedStatus from "../../global/utils/updateAndGetVisitedStatus";
import CornerButton from "../../global/components/CornerButton/CornerButton";
import InfoWindow from "../../global/components/InfoWindow/InfoWindow";
import configs from "../../configs/games/synapseHash";
import { getIsMobile } from "../../global/utils/dimesions";
import { getHasMobile } from "../../global/utils/getHasMobile";

const { info, infoImage } = { ...configs };

const SynapseHash = () => {
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isMobile = getIsMobile();
        const hasMobile = getHasMobile("Synapse Hash");

        if (isMobile && !hasMobile) {
            navigate("/");
        }

        // Update local storage for visited status
        const visited = updateAndGetVisitedStatus("synapseHash");
        if (!visited) {
            setShowInfo(true);
        }
    }, [setShowInfo])

    return (
        <div className={styles.synapseHash_main}>
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
                type="back" />
            <CornerButton
                type="info"
                action={() => setShowInfo(true)} />
            <div className={styles.synapseHash_cont}>
                <Game />
            </div>
        </div>
    )
}

export default SynapseHash;