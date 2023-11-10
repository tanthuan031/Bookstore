import * as Type from "../types/mainTypes.js";

const initState = {
    status: false,
};

const modal = (state = initState, action) => {
    switch (action.type) {
        case Type.modal_OPEN_MODAL:
            return {
                ...state,
                status: true,
            };
        case Type.modal_CLOSE_MODAL:
            return {
                ...state,
                status: false,
            };
        default:
            return state;
    }
};

export default modal;
