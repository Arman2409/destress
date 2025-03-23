import { gamesData } from "../../data/pages"

export const getHasMobile = (name: string) => {
    const gameConfig = gamesData.find(gameData => gameData.name === name);

    if (!gameConfig) {
      console.error(`Couldn't find games config, name: ${name}`)
    }

    return gameConfig?.hasMobile;
}