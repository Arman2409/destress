import type { Point } from "./shared"

// props

export type ScoreProps = {
    score: number
}

// interfaces 
export interface FishSchool  {
    id: string
    fishes: Array<any>
    startingPoint: any
    fishCount: number
    direction: Point
    interval: any
    currentPosition: Point
    escapingFrom: null|Point
    escapeDirections: Array<Point>
}

export interface OceanScene extends Phaser.Scene
{
    jellyfish:  Phaser.GameObjects.Sprite
    fishSchools: FishSchool[]
}