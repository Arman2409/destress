import { FaEquals, FaHeartBroken } from "react-icons/fa";
import { PiWineBold } from "react-icons/pi";

export const gameStatusIcons = new Map<string, JSX.Element>([
    ["win", <><PiWineBold /></>],
    ["draw", <><FaHeartBroken /></>],
    ["lost", <><FaEquals /></>]
])