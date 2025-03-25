export interface SubtitleDetails {
    width: number
    spacing: number
}

// Props
 
export interface GameTilesProps {
    choseGame: Function
}

export type GameTileProps = Omit<Game, "order"> & {
    choseGame: Function
    cornerInitialized?: boolean
}

export interface CornerButtonProps {
    type: "info" | "back"
    extraStyles?: Record<string, string>
    action?: () => void
}

// Interfaces 

export interface Game {
    order: number
    image: string
    link: string
    cornerImage: string
    name: string
    hasMobile: boolean
}