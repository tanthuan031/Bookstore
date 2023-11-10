import * as Type from "../types/mainTypes.js";

export const setTopTenOnSaleBooks = (data) => {
    return {
        type: Type.home_SET_TOP_TEN_ON_SALE_BOOKS,
        payload: data,
    };
};

export const setTagFeaturedBooks = (data) => {
    return {
        type: Type.home_SET_TAG_FEATURED_BOOKS,
        payload: data,
    };
};

export const setIsRecommended = (data) => {
    return {
        type: Type.home_SET_IS_RECOMMENDED,
        payload: data,
    };
};

export const setFirstLoading = (data) => {
    return {
        type: Type.home_SET_FIRST_LOADING,
        payload: data,
    };
};

export const setReset = () => {
    return {
        type: Type.home_RESET,
    };
};
