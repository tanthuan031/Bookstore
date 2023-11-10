import * as Type from "../types/mainTypes.js";

export const setReset = () => {
    return {
        type: Type.shop_RESET,
    };
};

export const setTotalPage = (data) => {
    return {
        type: Type.shop_SET_TOTAL_PAGES,
        payload: data,
    };
};

export const setCurrentPerPage = (data) => {
    return {
        type: Type.shop_SET_CURRENT_PER_PAGE,
        payload: data,
    };
};

export const setBooks = (data) => {
    return {
        type: Type.shop_SET_BOOKS,
        payload: data,
    };
};

export const setItemsTotal = (data) => {
    return {
        type: Type.shop_SET_ITEMS_TOTAL,
        payload: data,
    };
};

export const setCurrentPage = (data) => {
    return {
        type: Type.shop_SET_CURRENT_PAGE,
        payload: data,
    };
};

export const setIndexItem = (data) => {
    return {
        type: Type.shop_SET_INDEX_ITEM,
        payload: data,
    };
};

export const setCurrentFilter = (data) => {
    return {
        type: Type.shop_SET_CURRENT_FILTER,
        payload: data,
    };
};

export const editCurrentFilter = (data) => {
    return {
        type: Type.shop_EDIT_CURRENT_FILTER,
        payload: data,
    };
};

export const removeCurrentFilter = (data) => {
    return {
        type: Type.shop_REMOVE_CURRENT_FILTER,
        payload: data,
    };
};

export const setLoading = (data) => {
    return {
        type: Type.shop_SET_LOADING,
        payload: data,
    };
};

export const setFirstLoading = (data) => {
    return {
        type: Type.shop_SET_FIRST_LOADING,
        payload: data,
    };
};

export const setCurrentSort = (data) => {
    return {
        type: Type.shop_SET_CURRENT_SORT,
        payload: data,
    };
};

export const setResetFilterShop = () => {
    return {
        type: Type.shop_RESET_FILTER,
    };
};
