const updateAndGetVisitedStatus = (gameName: string) => {
    const visitedGamesData = sessionStorage.getItem("destress_visited_games");
    const visitedGames = visitedGamesData ? JSON.parse(visitedGamesData) : "";

    if (Array.isArray(visitedGames)) {
        if (visitedGames.includes(gameName)) {
            return true;
        }
        visitedGames.push(gameName);
        sessionStorage.setItem("destress_visited_games", JSON.stringify(visitedGames));
        return false;
    }
    sessionStorage.setItem("destress_visited_games", JSON.stringify([gameName]));
    
    return false;
}

export default updateAndGetVisitedStatus;