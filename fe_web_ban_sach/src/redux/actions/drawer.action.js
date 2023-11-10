import * as Type from "../types/mainTypes.js";

export const openDrawer = () => {
    const htmlTag = document.getElementsByTagName("html");
    htmlTag[0].style.overflow = "hidden";

    return {
        type: Type.drawer_OPEN_DRAWER,
    };
};

export const closeDrawer = () => {
    const htmlTag = document.getElementsByTagName("html");
    htmlTag[0].style.overflow = "";

    return {
        type: Type.drawer_CLOSE_DRAWER,
    };
};

export const openFilterDrawer = () => {
    const htmlTag = document.getElementsByTagName("html");
    htmlTag[0].style.overflow = "hidden";

    return {
        type: Type.drawer_OPEN_FILTER_DRAWER,
    };
};

export const closeFilterDrawer = () => {
    const htmlTag = document.getElementsByTagName("html");
    htmlTag[0].style.overflow = "";

    return {
        type: Type.drawer_CLOSE_FILTER_DRAWER,
    };
};
