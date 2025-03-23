import { useCallback, useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { angle as getAngle} from "pointscape";

import type { FishSchool } from "../../../../types/oceanFlow";
import configs from "../../../../configs/oceanFlow";
import { eventKeys } from "./utils/data";
import { addPlants, checkForCollision, createRandomFishSchool, updateJellyfishDetails } from "./utils/functions";
import ScoreAlert from "../../../../globals/components/ScoreAlert/ScoreAlert";
import Loading from "../../../../globals/components/Loading/Loading";
import { getConfig } from "./utils/config";

const {
  createFishSchoolInterval,
  backgroundColor,
  jellyfishStep,
  jellyFishFramesCount,
} = { ...configs };


const Game = () => {
  const [escapedCount, setEscapedCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const scene = useRef<any>(null);
  const mouseMoving = useRef<boolean>(false);

  const updateJellyfish = useCallback((
    type: "keypress" | "mouse",
    rotation?: number,
    direction?: "x" | "y",
    stepX?: number,
    stepY?: number,
    step?: number,
    height?: number,
    width?: number,
  ) => {
    const isLarge = window.innerWidth > 900;
    updateJellyfishDetails(
      scene.current,
      type,
      isLarge,
      rotation,
      direction,
      stepX,
      stepY,
      step,
      height,
      width)
  }, [])

  useEffect(() => {
    const phaserContainer = document.querySelector("#phaser-container");
    if (phaserContainer?.innerHTML) return;
    window.addEventListener("resize", () => setLoading(true))
    const isLarge = window.innerWidth > 900;
    class Ocean extends Phaser.Scene {
      fishSchools: FishSchool[] = [];
      jellyfish: Phaser.GameObjects.Sprite = {} as Phaser.GameObjects.Sprite;

      preload = () => {
        for (let i = 1; i <= jellyFishFramesCount; i++) {
          this.load.image(`jellyfishFrame${i}`, `/oceanFlow/jellyfishFrames/jellyfishFrame${i}.gif`);
        }
        this.load.image("plantFrame", "/oceanFlow/plantFrames/plant1.png");
        this.load.image("fishFrame1", "/oceanFlow/fishFrames/frame1.gif");
        this.load.image("fishFrame2", "/oceanFlow/fishFrames/frame2.gif");
        this.load.image("fishFrame3", "/oceanFlow/fishFrames/frame3.gif");
      }
      create = () => {
        addPlants(this);
        this.cameras.main.setBackgroundColor(backgroundColor);
        this.jellyfish = this.physics.add.sprite(100, 100, "jellyfishFrame1")
          .setScale(isLarge ? 0.5 : 0.25)
          .setDepth(5);
        // animation for changing the frames of the jellyfish 
        this.jellyfish.anims.create({
          key: "jellyfishAnimation",
          frames: Array.from({ length: jellyFishFramesCount }, (_, order) => ({ key: "jellyfishFrame" + (order + 1) })),
          frameRate: 7.5,
          duration: 2,
          repeat: -1,
        })
        this.jellyfish.anims.play("jellyfishAnimation")
        this.time.addEvent({
          delay: createFishSchoolInterval * 1000,
          callback: () => createRandomFishSchool(this, isLarge),
          loop: true,
        })
        const { width, height } = this.sys.game.canvas;
        // checking for collisions for schools and jellyfish 
        this.time.addEvent({
          delay: 30,
          callback: () => checkForCollision(
            this,
            width,
            height,
            (count: number) => setEscapedCount(curr => curr + count)),
          loop: true,
        })
      }
    }
    const gameScene = new Ocean()
    scene.current = gameScene;
    new Phaser.Game(getConfig(gameScene));
    setLoading(false);
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (mouseMoving.current) return;
      if (eventKeys.top.includes(e.key)) {
        updateJellyfish("keypress", 0, "y", undefined, undefined, -jellyfishStep, undefined, undefined);
      }
      if (eventKeys.bottom.includes(e.key)) {
        const { height } = scene.current?.sys?.game?.canvas;
        updateJellyfish("keypress", 3, "y", undefined, undefined, jellyfishStep, height, undefined);
      }
      if (eventKeys.left.includes(e.key)) {
        updateJellyfish("keypress", 4.5, "x", undefined, undefined, -jellyfishStep, undefined, undefined);
      }
      if (eventKeys.right.includes(e.key)) {
        const { width } = scene.current?.sys?.game?.canvas;
        updateJellyfish("keypress", 1.5, "x", undefined, undefined, jellyfishStep, undefined, width);
      }
    })
    let oldX = 0, oldY = 0, oldAngle = 0;
    // making jellyfish to follow the mouse 
    window.addEventListener("mousemove", (event: MouseEvent) => {
      if (!mouseMoving.current) {
        mouseMoving.current = true;
        setTimeout(() => mouseMoving.current = false, 1000)
      }
      if (scene.current.sys.game) {
        const { clientX, clientY } = event;
        let angle = getAngle({x: oldX, y: oldY}, {x: clientX, y: clientY});
        const { height, width } = scene.current?.sys?.game?.canvas;
        updateJellyfish(
          "mouse",
          Math.abs(oldAngle - angle) > 0.25 ? angle : undefined,
          undefined,
          clientX,
          clientY,
          undefined,
          height,
          width,
        )
        oldAngle = angle;
        oldX = clientX;
        oldY = clientY;
      }
    })
  }, [setLoading, updateJellyfish]);

  return (
    <>
      <ScoreAlert
        score={escapedCount}
        mode="custom"
      />
      {loading && <Loading />}
      <div id="phaser-container" />
    </>
  );
};

export default Game;