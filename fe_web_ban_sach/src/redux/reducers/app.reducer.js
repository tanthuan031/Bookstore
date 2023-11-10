import * as Type from "../types/mainTypes.js";

const initState = {
    width: 0,
    isLogin: false,
    user: {},
    totalQuantity: 0,
};

const app = (state = initState, action) => {
    switch (action.type) {
        case Type.app_SET_WIDTH:
            return {
                ...state,
                width: action.payload,
            };
        case Type.app_SET_LOGIN:
            return {
                ...state,
                isLogin: true,
            };
        case Type.app_SET_USER:
            return {
                ...state,
                user: { ...action.payload },
            };
        case Type.app_SET_SUM_CART_QUANTITY:
            return {
                ...state,
                totalQuantity: action.payload,
            };
        default:
            return state;
    }
};

export default app;
