import { lettersSpacingsAndWidths } from "./data";
import type { SubtitleDetails } from "../../../../../../../types/home";

export const getSpacingAndWidth = (windowWidth: number): SubtitleDetails => {
    let details: {
        width: number,
        spacing: number
    } | null = null;
    const breakpoints: string[] = Object.keys(lettersSpacingsAndWidths).reverse();
    breakpoints.forEach((breakpoint: string) => {
        if (details) return false;
        if (windowWidth > Number(breakpoint)) {
            const spacingBreakpoints: typeof lettersSpacingsAndWidths = lettersSpacingsAndWidths;
            details = spacingBreakpoints[Number(breakpoint) as keyof typeof spacingBreakpoints];
        }
    })

    if (!details) {
        return {} as SubtitleDetails;
    }

    return details;
}