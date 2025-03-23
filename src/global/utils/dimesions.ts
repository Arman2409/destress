import configs from "../../configs/global";

const { mobileBreakpoint } = { ...configs}

export const getIsMobile = () => window.innerWidth <= mobileBreakpoint;