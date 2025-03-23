import type { DirectionStatus, BallStatus, GradientCoordinates } from "../../../../../types/bounceFall";
import configs from "../../../../../configs/games/bounceFall";
import { getGradientCoordinates, getRandomColors, addBallStyles } from "./utils/ballFunctions";

const { fallSpeed, colorsPerBall, rollingSpeed, stopHeightExtra,
     bounceSpeed, bounceDeviationRange, bounceHeightRange, colors, ballRadius  } = {...configs};
export class Ball {
    x = 0;
    y = 0;
    // horizontal speed
    dx = 0;
    // vertical speed
    dy = 0;
    radius = 5;
    rotation = 0;
    // direction for bouncing or rolling 
    side: DirectionStatus = false;
    colors: string[] = [];
    bounceHeight = 0;
    surfaceHeight = 1000;
    surfaceWidth = 1000;
    private status: BallStatus = "falling";
    private rollSteps = 0;
    private rollStepsCount = 0;
    private fallHeight = 0;
    private stoppedGradient: GradientCoordinates = {} as GradientCoordinates;
    private readonly ctx;

    constructor(
        x: number,
        y: number,
        ctx: CanvasRenderingContext2D,
    ) {
        if (typeof ctx !== "object") {
            console.error("Canvas context not provided");
            return;
        }
        this.ctx = ctx;
        const canvasHeight = ctx.canvas.height;
        this.surfaceHeight = canvasHeight;
        this.surfaceWidth = ctx.canvas.width;
        this.fallHeight = canvasHeight;
        this.radius = ballRadius;
        this.x = x;
        this.y = y > canvasHeight - ballRadius ? canvasHeight - ballRadius : y;
        this.colors = getRandomColors(colorsPerBall, colors);
        // generating random side 
        this.side = Math.round(Math.random()) ? "left" : "right";
        const { fall, stop } = { ...this };
        // checking if is above the ground 
        if (canvasHeight - (y + ballRadius) > 0) fall();
        else stop();
    }

    animate = () => {
        const { stoppedGradient, status, ctx,
            draw, animate, handleFalling, handleRolling, handleBouncing } = { ...this };
        ctx?.beginPath();
        if (status === "stopped") {
            draw("circle", undefined, undefined, undefined, stoppedGradient);
            requestAnimationFrame(animate);
            return;
        };
        if (status === "rolling") handleRolling();
        if (status === "bouncing") handleBouncing();
        if (status === "falling") handleFalling();
        const { dx, dy } = { ...this }
        this.y += dy;
        this.x += dx;
        requestAnimationFrame(animate);
    }

    protected isNearBorder = (): DirectionStatus => {
        const { x, surfaceWidth, radius } = { ...this };
        if (x <= radius) return "left";
        if (x >= surfaceWidth - radius) return "right";
        return false;
    }

    private draw = (type: "circle" | "ellipse",
        ellipseX?: number,
        ellipseY?: number,
        extraY?: number,
        gradient?: GradientCoordinates) => {
        const { x, y, radius, rotation, colors, ctx } = { ...this }
        if (type === "circle") ctx?.arc(x, y, radius, 0, Math.PI * 2, false);
        if (type === "ellipse") ctx?.ellipse(x, extraY ? y + extraY : y, ellipseX as number, ellipseY as number, 0, 0, Math.PI * 2);
        addBallStyles(x, y, radius, rotation, colors, ctx as CanvasRenderingContext2D, colorsPerBall, gradient);
        ctx?.restore();
    }

    private handleRolling = () => {
        const { side, rollSteps, rollStepsCount,
            stop, draw, isNearBorder } = { ...this };
        if (rollStepsCount >= rollSteps) {
            stop();
            return;
        }
        // checking if is near the border and if is than reversing
        const borderStatus = isNearBorder();
        if (borderStatus === "left") this.side = "right";
        if (borderStatus === "right") this.side = "left";
        this.dx = side === "left" ? -rollingSpeed : rollingSpeed;
        this.rotation += side === "left" ? -8 : 8;
        this.rollStepsCount += 1;
        this.dy = 0;
        draw("circle");
    }

    private handleFalling = () => {
        const { y, radius, side, surfaceHeight,
            draw, bounce } = { ...this };
        if (y >= surfaceHeight - (radius / 2)) {
            this.y = surfaceHeight - radius;
            bounce();
        }
        else if (y >= surfaceHeight - (radius / 1.5)) {
            this.dy = 1.25;
            draw("ellipse", radius + radius / 4, radius / 2, radius / 5);
        } else if (y >= surfaceHeight - radius) {
            this.dy = 1.25;
            draw("ellipse", radius + radius / 6, radius / 1.25, radius / 5);
        } else draw("circle")
        this.rotation += side === "right" ? 1 : -1;
    }

    private handleBouncing = () => {
        const { y, side, bounceHeight, surfaceHeight,
            draw, fall, isNearBorder } = { ...this };
        if (y <= surfaceHeight - bounceHeight) fall();
        // checking if the ball is going towards the border 
        if (isNearBorder() === side) fall();
        draw("circle");
    };

    fall = () => {
        const { y, surfaceHeight } = { ...this };
        this.dy = fallSpeed;
        this.dx = 0;
        this.status = "falling";
        this.fallHeight = surfaceHeight - y;
    }

    bounce = () => {
        const { radius, fallHeight, isNearBorder, roll, draw } = { ...this }
        // checking if is near the border and if is than reversing
        const borderStatus = isNearBorder();
        if (borderStatus === "left") {
            this.side = "right";
        }
        if (borderStatus === "right") {
            this.side = "left";
        }
        if (fallHeight < stopHeightExtra + radius * 2) {
            roll();
            return;
        }
        this.dy = -bounceSpeed;
        const deviation = bounceDeviationRange[0] + Math.round(Math.random() * bounceDeviationRange[1]);
        const { side } = { ...this }
        this.dx = side === "left" ? -deviation : deviation;
        this.bounceHeight = fallHeight * bounceHeightRange[0] + Math.round(Math.random() * (fallHeight * (bounceHeightRange[1] - bounceHeightRange[0])));
        this.status = "bouncing";
        draw("circle");
    }

    roll = () => {
        const { radius, surfaceHeight, draw } = { ...this };
        this.status = "rolling";
        this.y = surfaceHeight - radius;
        this.dy = 0;
        this.rollSteps = 30 + Math.random() * 20;
        draw("circle")
    }

    stop = () => {
        const { x, y, radius, rotation, draw } = { ...this };
        this.dx = 0;
        this.dy = 0;
        this.status = "stopped";
        // generating cached gradient for stopped status 
        const currentGradient = getGradientCoordinates(x, y, rotation, radius);
        this.stoppedGradient = currentGradient;
        draw("circle", undefined, undefined, undefined, currentGradient);
    }
}


