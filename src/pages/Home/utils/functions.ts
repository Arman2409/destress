import type { Particle } from "./Particle/Particle";

export const handleMouseMove = (
    event: MouseEvent,
    mouseCanvasCont: HTMLElement,
    canvasSize: number) => {
    let { clientX: left, clientY: top } = event;
    if (mouseCanvasCont) {
        mouseCanvasCont.style.top = top - canvasSize / 2 + "px";
        mouseCanvasCont.style.left = left - canvasSize / 2 + "px";
    }
}

export const startAnimation = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    particles: Particle[],) => {
    const animateCanvas = () => {
        context.clearRect(0, 0, width, height);
        particles.forEach((particle: Particle) => particle.animate());
        requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
}