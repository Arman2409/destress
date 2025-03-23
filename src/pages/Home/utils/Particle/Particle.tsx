export class Particle {
    canvasHeight = 200;
    canvasWidth = 200;
    speed = 10;
    size = 10;
    color = "";
    protected x = 0;
    protected y = 0;
    protected dx = 0;
    protected dy = 0;
    private readonly context: CanvasRenderingContext2D;

    constructor(
        size: number,
        color: string,
        canvasWidth: number,
        canvasHeight: number,
        context: CanvasRenderingContext2D) {
        this.size = size;
        this.color = color;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.context = context;
        const extra = size;
        this.x = Math.random() * (canvasWidth - extra);
        this.y = Math.random() * (canvasHeight - extra);
        this.dx = Math.random() + 0.1;
        this.dy = Math.random() + 0.1;
    }

    animate = () => {
        const { dx, dy, size, canvasWidth, canvasHeight, color } = { ...this };
        this.x += dx;
        this.y += dy;
        const { x, y } = { ...this };
        if (x >= canvasWidth - size) this.dx = -dx;
        if (x <= 0 + size) this.dx = -dx;
        if (y >= canvasHeight - size) this.dy = -dy;
        if (y <= 0 + size) this.dy = -dy;
        this.context?.beginPath();
        this.context.rect(x, y, size, size);
        this.context.fillStyle = color;
        this.context.fill();
    }
}