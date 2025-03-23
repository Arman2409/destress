
import type { Point } from "./shared"

export type Connection =  Array<[string, string]>

// props

export type CompletedAlertProps = {
    setStatus: Function
    status: boolean
    startNew: Function
}

// interfaces 

export interface Neuron {
    id: string
    placement: Point
    tween?: any
    sprite: Phaser.GameObjects.Sprite
}

export interface NetworkScene extends Phaser.Scene {
    clickedNeuron: any
    neurons: Neuron[],
    connectionSprites: Phaser.GameObjects.Sprite[];
    neuronConnections: Connection[]
}