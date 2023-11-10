import * as Type from "../types/mainTypes.js";

export const setReset = (data) => {
    return {
        type: Type.product_SET_RESET,
    };
};

export const setDetailBook = (data) => {
    return {
        type: Type.product_SET_DETAIL_BOOK,
        payload: data,
    };
};

export const setQuantityBook = (data) => {
    return {
        type: Type.product_SET_QUANTITY_BOOK,
        payload: data,
    };
};

export const setDiscountPriceBook = (data) => {
    return {
        type: Type.product_SET_DISCOUNT_PRICE_BOOK,
        payload: data,
    };
};

export const setMainPriceBook = (data) => {
    return {
        type: Type.product_SET_MAIN_PRICE_BOOK,
        payload: data,
    };
};

export const setFirstLoadingReview = (data) => {
    return {
        type: Type.product_SET_FIRST_LOADING_REVIEW,
        payload: data,
    };
};

export const setSecondLoadingReview = (data) => {
    return {
        type: Type.product_SET_SECOND_LOADING_REVIEW,
        payload: data,
    };
};

export const setReviewData = (data) => {
    return {
        type: Type.product_SET_REVIEW_DATA,
        payload: data,
    };
};

export const setAverageReview = (data) => {
    return {
        type: Type.product_AVERAGE_REVIEW,
        payload: data,
    };
};

export const setTotalReview = (data) => {
    return {
        type: Type.product_TOTAL_REVIEW,
        payload: data,
    };
};

export const setCountRatingStar = (data) => {
    return {
        type: Type.product_COUNT_RATING_STAR,
        payload: data,
    };
};

export const setFromReview = (data) => {
    return {
        type: Type.product_FROM_REVIEW,
        payload: data,
    };
};

export const setToReview = (data) => {
    return {
        type: Type.product_TO_REVIEW,
        payload: data,
    };
};

export const setTotalPageReview = (data) => {
    return {
        type: Type.product_TOTAL_PAGE_REVIEW,
        payload: data,
    };
};

export const setCurrentPageReview = (data) => {
    return {
        type: Type.product_CURRENT_PAGE_REVIEW,
        payload: data,
    };
};

export const setCurrentFilterStar = (data) => {
    return {
        type: Type.product_CURRENT_FILTER_STAR,
        payload: data,
    };
};

export const setSortReview = (data) => {
    return {
        type: Type.product_SORT_REVIEW,
        payload: data,
    };
};

export const setPerPage = (data) => {
    return {
        type: Type.product_SET_PER_PAGE,
        payload: data,
    };
};

export const setPriceBook = (data) => {
    return {
        type: Type.product_SET_PRICE_BOOK,
        payload: data,
    };
};
