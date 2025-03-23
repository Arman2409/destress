import { useContext, useEffect, useMemo, useState } from "react";

import styles from "../../../../styles/pages/Roshambo/components/Animation/Animation.module.scss";
import configs from "../../../../configs/games/roshambo";
import ShakingHand from "./components/ShakingHand/ShakingHand";
import { RoshamboContext } from "../../Roshambo";
import { getRandomBackground, getRandomJest, getBackgroundsArr } from "./utils/functions";
import type { Jest, WindowSize } from "../../../../types/roshambo";

const {
  animationDuration,
  windowMediumSize,
  windowSmallSize,
  backgrounds,
  backgroundsPath } = { ...configs }

const imageBackgrounds = getBackgroundsArr(backgrounds, backgroundsPath);

const Animation = () => {
  const [imageLoaded, setImageLoaded] = useState<boolean>();
  const [windowSize, setWindowSize] = useState<WindowSize>(window.innerWidth > 680 ? "large" : window.innerWidth > 480 ? "medium" : "small");
  const { chosenJest, dispatchOpponentJest, opponentJest } = useContext(RoshamboContext);
  const opponentJestMemo = useMemo<Jest>(() => opponentJest || getRandomJest(), [opponentJest]);
  const backgroundMemo = useMemo<string>(() => getRandomBackground(imageBackgrounds), []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > windowMediumSize) {
        setWindowSize("large");
      } else if (window.innerWidth > windowSmallSize) {
        setWindowSize("medium");
      } else {
        setWindowSize("small");
      }
    })
  }, [setWindowSize])

  useEffect(() => {
    if (!opponentJest) {
      setTimeout(() => {
        dispatchOpponentJest(opponentJestMemo);
      }, animationDuration * 1000 + 500)
    }
  }, [opponentJest, opponentJestMemo, dispatchOpponentJest])

  return (
    <div
      className={styles.animation_main}
     >
      <img 
        alt=""
        className="absolute_background"
        src={backgroundMemo}
        onLoad={() => setImageLoaded(true)} />
      {imageLoaded && <div className={styles.animations_cont}>
        <div className={styles.animation_cont}>
          <ShakingHand
            side="left"
            duration={animationDuration}
            initialJest="rock"
            jest={chosenJest}
            windowSize={windowSize}
            showingMode={Boolean(opponentJest)}
          />
        </div>
        <div className={styles.animation_cont}>
          <ShakingHand
            side="right"
            duration={animationDuration}
            initialJest="rock"
            jest={opponentJestMemo}
            windowSize={windowSize}
            showingMode={Boolean(opponentJest)}
          />
        </div>
      </div>}
    </div>
  )
}

export default Animation;