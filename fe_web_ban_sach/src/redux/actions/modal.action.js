import * as Type from "../types/mainTypes.js";

export const showModal = () => {
    return {
        type: Type.modal_OPEN_MODAL,
    };
};
export const hideModal = () => {
    return {
        type: Type.modal_CLOSE_MODAL,
    };
};
