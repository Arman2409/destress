export type Jest = "scissors"|"rock"|"paper"
export type WindowSize = "small" | "medium" | "large"
export type GameStatus = "draw"|"lose"|"win"

// Context 

export interface RoshamboContextDetails {
    chosenJest: Jest | null
    opponentJest: Jest | null
    opponentScore: number
    userScore: number
    result: GameStatus
    dispatchJest: Function
    dispatchOpponentJest: Function
}

// Props

export interface JestProps {
    keyClicked?: boolean
    borderRight?: boolean
    borderLeft?: boolean
    jestImg: string
    keyboardImg: string
    name: string
    onClick: Function
}

export interface ShakingHandProps {
    jest: Jest|null
    showingMode: boolean
    initialJest: Jest|null
    windowSize: WindowSize
    side: "left"|"right"
    duration: number
}

export interface AnimatingScoresProps {
    score: number
}

// Interfaces 

export interface JestDetails {
    keyClicked?: boolean
    name: Jest
    keyboardImg: string
    jestImg: string
    keys: string[]
}