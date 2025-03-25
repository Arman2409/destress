import configs from "../../configs/global";

const { mobileBreakpoint } = { ...configs }

export const getIsMobile = ():boolean => {
   return window.innerWidth <= mobileBreakpoint
};

export const getVh = (
    percent: number
):number => {
    var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * height) / 100;
}

export const getVw = (
    percent: number
):number => {
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * width) / 100;
}
