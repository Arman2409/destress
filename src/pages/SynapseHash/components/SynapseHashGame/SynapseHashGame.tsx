import { useCallback, useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import Button from "antd/lib/button";
import { FaPlay } from "react-icons/fa";

import styles from "../../../../styles/pages/SynapseHash/components/SynapseHashGame/SynapseHashGame.module.scss";
import configs from "../../../../configs/games/synapseHash";
import ScoreAlert from "../../../../components/ScoreAlert/ScoreAlert";
import Loading from "../../../../components/Loading/Loading";
import { getConfig } from "./utils/config";
import { addRandomNeurons } from "./utils/functions";
import CompleteAlert from "./components/CompletedAlert/CompletedAlert";
import type { Neuron, Connection } from "../../../../types/synapseHash";

const {
    backgroundColor
} = { ...configs };

const Game = () => {
    const [connectionsCount, setConnectionsCount] = useState<number>(0);
    const [showSkipStatus, setShowSkipStatus] = useState<boolean>(false);
    const [initializeGame, setInitializeGame] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const scene = useRef<unknown>(null);
    const possibleConnections = useRef<number>(0);
    const windowWidth = window.innerWidth;
    const size = windowWidth > 1100 ? "veryLarge" : windowWidth > 900 ? "large" : "medium";

    class NetWork extends Phaser.Scene {
        neurons: Neuron[] = [];
        clickedNeuron: string|null = "";
        connectionSprites: Phaser.GameObjects.Sprite[] = [];
        neuronConnections: Connection = [];

        preload = () => {
            for (let i = 1; i <= 4; i++) {
                this.load.image(`connectionElectrifiedFrame${i}`, `/synapseHash/connectionElectrified${i}.png`)
            }
            this.load.image("neuronFrame", "/synapseHash/neuron.png");
            this.load.image("connectionFrame", "/synapseHash/connection.png");
            this.load.image("neuronElectrifiedFrame", "/synapseHash/neuronElectrified.png");
        }
        create = () => {
            addRandomNeurons(this, size,
                // callback function for clicking a neuron 
                (connections: number) => {
                    if (connections === possibleConnections.current) {
                        setInitializeGame(true);
                        setLoading(true);
                    }
                    setConnectionsCount((currCount: number) => currCount + 1)
                },
                // callback function to run after initializing the neurons 
                (neuronsCount: number) => possibleConnections.current = neuronsCount * (neuronsCount - 1) / 2);
            this.cameras.main.setBackgroundColor(backgroundColor);
        }
    }

    const startNewGame = useCallback(() => {
        setInitializeGame(true);
        setLoading(true);
    }, [setInitializeGame, setLoading])

    useEffect(() => {
        const phaserContainer = document.querySelector("#phaser-container");
        if (phaserContainer?.innerHTML) return;
        window.addEventListener("resize", () => setLoading(true))

        const gameScene = new NetWork()
        scene.current = gameScene;
        new Phaser.Game(getConfig(gameScene));
        setInitializeGame(false);
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showSkipStatus, size, setInitializeGame, setLoading, setConnectionsCount, setShowSkipStatus])

    useEffect(() => {
        // Creating new game whenever finished 
        if (initializeGame && (scene.current as NetWork)?.physics) {
            (scene.current as NetWork)?.neurons?.forEach(({ sprite }: Neuron) => sprite.destroy());
            (scene.current as NetWork).connectionSprites.forEach((sprite: Phaser.GameObjects.Sprite) => sprite.destroy());
            (scene.current as NetWork).connectionSprites = [];
                (scene.current as NetWork).neuronConnections = [];
            (scene.current as NetWork).neurons = [];
            (scene.current as NetWork).clickedNeuron = null;
            (scene.current as NetWork).create();
            setLoading(false);
            setInitializeGame(false);
        }
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initializeGame, setInitializeGame, setLoading, setConnectionsCount])

    return (
        <>
            {showSkipStatus && <CompleteAlert
                status={showSkipStatus}
                startNew={startNewGame}
                setStatus={setShowSkipStatus} />}
            <ScoreAlert
                width={size === "veryLarge" ? undefined : 70}
                height={size === "veryLarge" ? undefined : 20}
                score={connectionsCount}
                mode="custom" />
            <Button
                className={size === "veryLarge" ? styles.skip_button : styles.skip_button_small}
                onClick={() => setShowSkipStatus(true)}
            >
                <FaPlay />
            </Button>
            {loading && <Loading />}
            <div id="phaser-container" />
        </>
    )
}

export default Game;
