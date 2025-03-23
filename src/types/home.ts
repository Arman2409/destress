export interface SubtitleDetails {
    width: number
    spacing: number
}

// props 
export interface GameTilesProps {
    choseGame: Function
}

export type TileProps = Omit<Game, "order"> & {
    choseGame: Function
    cornerInitialized?: boolean
}

export interface CornerButtonProps {
    type: "info" | "back"
    extraStyles?: Record<string, string>
    action?: () => void
}

// interfaces 
export interface Game {
    order: number
    image: string
    link: string
    cornerImage: string
    name: string
}