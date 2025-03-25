export type BallStatus = "bouncing" | "rolling" | "falling" | "stopped"

export type DirectionStatus = "left" | "right" | false

// Props 

export type BounceGameProps = {
    canvasHeight: number
    canvasWidth: number
    mouseExtraX: number
    mouseExtraY: number
    ballRadius: number
}

// Interfaces 

export interface GradientCoordinates {
    startX: number
    startY: number
    endX: number
    endY: number
}