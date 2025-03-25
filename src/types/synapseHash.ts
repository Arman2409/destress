
import { Tweens } from "phaser";

import type { Point } from "./shared";

export type Connection = Array<[string, string]>

// Props

export interface CompletedAlertProps {
    setStatus: Function
    status: boolean
    startNew: Function
}

// Interfaces 

export interface Neuron {
    id: string
    placement: Point
    sprite: Phaser.GameObjects.Sprite
    tween?: Tweens.Tween
}

export interface NetworkScene extends Phaser.Scene {
    clickedNeuron: Neuron & {
        tween?: Tweens.Tween,
    } | string | null,
    neurons: Neuron[],
    connectionSprites: Phaser.GameObjects.Sprite[];
    neuronConnections: Connection
}