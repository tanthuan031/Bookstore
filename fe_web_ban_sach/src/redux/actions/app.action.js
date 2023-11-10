import * as Type from "../types/mainTypes.js";

export const setWidth = (data) => {
    return {
        type: Type.app_SET_WIDTH,
        payload: data,
    };
};

export const setLogin = () => {
    return {
        type: Type.app_SET_LOGIN,
    };
};

export const setUser = (data) => {
    return {
        type: Type.app_SET_USER,
        payload: data,
    };
};

export const setSumCartQuantity = (data) => {
    return {
        type: Type.app_SET_SUM_CART_QUANTITY,
        payload: data,
    };
};
