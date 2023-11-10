import * as Type from "../types/mainTypes.js";

const initState = {
    filters: [],
    currentCategory: "",
    currentAuthor: "",
    currentRatingStar: "",
};

const filter = (state = initState, action) => {
    switch (action.type) {
        case Type.filter_SET_DATA_FILTER:
            return {
                ...state,
                filters: [...action.payload],
            };
        case Type.filter_SET_RESET:
            return initState;
        default:
            return state;
    }
};

export default filter;
