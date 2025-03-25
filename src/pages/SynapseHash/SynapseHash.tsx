import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/pages/SynapseHash/SynapseHash.module.scss";
import Game from "./components/SynapseHashGame/SynapseHashGame";
import updateAndGetVisitedStatus from "../../utils/helpers/updateAndGetVisitedStatus";
import CornerButton from "../../components/CornerButton/CornerButton";
import InfoWindow from "../../components/InfoWindow/InfoWindow";
import configs from "../../configs/games/synapseHash";
import { getIsMobile } from "../../utils/helpers/dimesions";
import { getHasMobile } from "../../utils/helpers/getHasMobile";

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
    }, [setShowInfo, navigate])

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