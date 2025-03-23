import type { GameStatus, Jest } from "../../../types/roshambo";
import { combinations } from "./data";

export const defineGameStatus = (
  jest1: Jest | null,
  jest2: Jest | null
): GameStatus | null => {
  if (!jest1 || !jest2) return null;
  if (jest1 === jest2) {
    return "draw";
  };

  let status: GameStatus = "draw";

  combinations.forEach((arr: string[]) => {
    if (arr[0] === jest1 && arr[1] === jest2) {
      status = "win";
    }
    if (arr[1] === jest1 && arr[0] === jest2) {
      status = "lose";
    }
  })

  return status;
}

