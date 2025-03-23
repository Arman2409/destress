import { useEffect, useRef, useState } from "react";

import styles from "../../../../styles/pages/BounceFall/components/BounceFallGame.module.scss";
import type { BounceGameProps } from "../../../../types/bounceFall";
import ScoreAlert from "../../../../global/components/ScoreAlert/ScoreAlert";
import Loading from "../../../../global/components/Loading/Loading";
import { getVh, getVw } from "../../../../global/utils/getSize";
import { Ball } from "./components/Ball";

const BounceFallGame = ({
    canvasHeight,
    canvasWidth,
    mouseExtraX = 0,
    mouseExtraY = 0,
    ballRadius }: BounceGameProps) => {

    const [ballsCount, setBallsCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const mainCanvas = useRef<HTMLCanvasElement>(null);
    const gameInitialized = useRef<boolean>(false);

    const height = getVh(canvasHeight);
    const width = getVw(canvasWidth);
    const extraX = -getVw(mouseExtraX);
    const extraY = -getVh(mouseExtraY) - ballRadius;

    useEffect(() => {
        if (gameInitialized.current) return;
        gameInitialized.current = true;
        const canvas: HTMLCanvasElement = mainCanvas.current as HTMLCanvasElement;
        const context = canvas.getContext("2d");

        canvas.addEventListener("click", (event: MouseEvent) => {
            const { clientX, clientY } = event;
            const newBall = new Ball(clientX + extraX, clientY + extraY, context as CanvasRenderingContext2D);
            newBall.animate();
            setBallsCount(curr => curr += 1);
        })

        setLoading(false);

        function clear() {
            context?.clearRect(0, 0, window.innerWidth, window.innerHeight);
            requestAnimationFrame(clear);
        }

        clear();
    }, [setBallsCount, setLoading, extraX, extraY])

    return (
        <>
            <ScoreAlert
                score={ballsCount}
                mode="custom"
            />
            {loading && <Loading />}
            <canvas
                height={height}
                width={width}
                ref={mainCanvas}
                className={styles.bounce_fall_canvas}
            />
        </>
    )
}

export default BounceFallGame;