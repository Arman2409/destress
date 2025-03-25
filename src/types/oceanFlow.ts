import type { Point } from "./shared"

// Props

export type ScoreProps = {
    score: number
}

// Interfaces

export interface FishSchool {
    id: string
    fishes: Array<Phaser.GameObjects.Sprite>
    startingPoint: Point
    fishCount: number
    direction: Point
    interval: string | number | undefined | unknown
    currentPosition: Point
    escapingFrom: null | Point
    escapeDirections: Array<Point>
}

export interface OceanScene extends Phaser.Scene {
    jellyfish: Phaser.GameObjects.Sprite
    fishSchools: FishSchool[]
}