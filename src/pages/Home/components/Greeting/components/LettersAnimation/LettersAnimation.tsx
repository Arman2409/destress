import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

import styles from "../../../../../../styles/pages/Home/components/Greeting/components/LettersAnimation.module.scss";
import configs from "../../../../../../configs/home";
import { getSpacingAndWidth } from "./utils/functions";
import type { SubtitleDetails } from "../../../../../../types/home";

const { subTitle, lettersAnimationDuration } = { ...configs };

const LettersAnimation = () => {
    const details = getSpacingAndWidth(window.innerWidth);
    const { spacing = 0, width = 0 } = { ...details };

    const [letterDetails, setLetterDetails] = useState<SubtitleDetails>({ spacing, width })
    const lettersInitialized = useRef<boolean>(false);
    const lettersMain = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (lettersInitialized.current) return;

        lettersInitialized.current = true;
        const windowWidth = window.innerWidth;
        const letters = subTitle.split("");

        letters.forEach((letter: string, order: number) => {

            // Create container for each letter 
            const letterDiv = document.createElement("div");
            letterDiv.setAttribute("class", styles.subtitle_letter_cont);
            letterDiv.style.width = letterDetails.spacing + "px";
            letterDiv.style.top = Math.round(windowWidth * Math.random()) + "px";
            letterDiv.style.left = Math.round(windowWidth * Math.random()) + "px";

            // Create the letter
            const letterP = document.createElement("p");
            letterP.innerHTML = letter;
            letterP.setAttribute("class", styles.subtitle_letter);

            letterDiv.appendChild(letterP);

            lettersMain.current?.appendChild(letterDiv);
            animate(letterDiv,
                {
                    top: 0 + "px",
                    left: 0 + Number(order) * letterDetails.spacing + "px"
                },
                { duration: lettersAnimationDuration })
        });

        window.addEventListener("resize", () => {
            const details = getSpacingAndWidth(window.innerWidth);
            const { spacing: letterSpacing = 0, width: titleWidth = 0 } = { ...details };

            setLetterDetails((currentDetails: SubtitleDetails) => {
                const { spacing, width } = { ...currentDetails }
                // eslint-disable-next-line 
                if (spacing !== letterSpacing || width !== width) {
                    lettersInitialized.current = false;
                    if (lettersMain.current) {
                        lettersMain.current.innerHTML = "";
                    }
                    return {
                        spacing: letterSpacing,
                        width: titleWidth
                    }
                }
                return currentDetails;
            })
        })
    }, [spacing, width, setLetterDetails, letterDetails.spacing])

    return (
        <div
            ref={lettersMain}
            className={styles.subtitle}
            style={{ width: letterDetails.width }} />
    )
}

export default LettersAnimation;