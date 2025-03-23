import { useEffect, useRef, useState } from "react";

import styles from "../../styles/pages/Home/Home.module.scss";
import Loading from "../../global/components/Loading/Loading";
import configs from "../../configs/home";

import GameTiles from "./components/GameTiles/GameTiles";
import Greeting from "./components/Greeting/Greeting";
import Footer from "./components/Footer/Footer";
import { Particle } from "./utils/Particle/Particle";
import { handleMouseMove, startAnimation } from "./utils/functions";

const { mouseCanvasSize, particlesCount, particleSize, particleColor } = { ...configs };

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const mouseCanvasCont = useRef<HTMLDivElement>(null as any);
  const mouseMoveHandler = (event: MouseEvent) => handleMouseMove(event, mouseCanvasCont.current, mouseCanvasSize);

  useEffect(() => {
    if (mouseCanvasCont.current.innerHTML || !mouseCanvasCont.current) return;
    const mouseCanvas = document.createElement("canvas");
    mouseCanvas.width = mouseCanvasSize;
    mouseCanvas.height = mouseCanvasSize;

    const context = mouseCanvas.getContext("2d");
    document.addEventListener('mousemove', (event: MouseEvent) => mouseMoveHandler(event));
    const particles: Particle[] = [];

    for (let i = 0; i < particlesCount; i++) {
      const newParticle = new Particle(particleSize, particleColor, mouseCanvasSize, mouseCanvasSize, context);
      particles.push(newParticle);
    }

    startAnimation(context, mouseCanvas.width, mouseCanvas.height, particles);
    mouseCanvasCont.current.appendChild(mouseCanvas);

    return document.removeEventListener("mousemove", mouseMoveHandler);
  }, [])

  return (
    <main className={styles.main} >
      <div
        className={styles.main_mouse_canvas}
        ref={mouseCanvasCont}
      />
      {loading && <Loading />}
      <Greeting />
      <GameTiles
        choseGame={() => setLoading(true)}
      />
      <Footer />
    </main>
  )
}

export default Home;