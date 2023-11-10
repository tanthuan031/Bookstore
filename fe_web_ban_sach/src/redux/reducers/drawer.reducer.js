import * as Type from "../types/mainTypes.js";

const initState = {
    status: false,
    filter_status: false,
};

const drawer = (state = initState, action) => {
    switch (action.type) {
        case Type.drawer_OPEN_DRAWER:
            return {
                ...state,
                status: true,
            };
        case Type.drawer_CLOSE_DRAWER:
            return {
                ...state,
                status: false,
            };
        case Type.drawer_OPEN_FILTER_DRAWER:
            return {
                ...state,
                filter_status: true,
            };
        case Type.drawer_CLOSE_FILTER_DRAWER:
            return {
                ...state,
                filter_status: false,
            };
        default:
            return state;
    }
};

export default drawer;
