import * as Type from "../types/mainTypes.js";

const initState = {
    topTenOnSaleBooks: [],
    tagFeaturedBooks: [],
    isRecommended: true,
    firstLoading: true,
};

const home = (state = initState, action) => {
    switch (action.type) {
        case Type.home_SET_TOP_TEN_ON_SALE_BOOKS:
            return {
                ...state,
                topTenOnSaleBooks: [...action.payload],
            };
        case Type.home_SET_TAG_FEATURED_BOOKS:
            return {
                ...state,
                tagFeaturedBooks: [...action.payload],
            };
        case Type.home_SET_IS_RECOMMENDED:
            return {
                ...state,
                isRecommended: action.payload,
            };
        case Type.home_SET_FIRST_LOADING:
            return {
                ...state,
                firstLoading: action.payload,
            };
        case Type.home_RESET:
            return initState;
        default:
            return state;
    }
};

export default home;
