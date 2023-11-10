import * as Type from "../types/mainTypes.js";

const initState = {
    detail_book: [],
    price_book: "",
    quantity: 1,
    first_loading_review: true,
    second_loading_review: false,
    review_data: [],
    average: 0,
    total_review: 0,
    count_rating_star: [],
    from: 0,
    to: 0,
    total_page: 0,
    current_page: 1,
    per_page: 5,
    current_filter_star: 0,
    sort_key: "Sort by date: newest to oldest",
    sort_value: "desc",
};

const product = (state = initState, action) => {
    switch (action.type) {
        case Type.product_SET_RESET:
            return initState;
        case Type.product_SET_DETAIL_BOOK:
            return {
                ...state,
                detail_book: [...action.payload],
            };
        case Type.product_SET_PRICE_BOOK:
            return {
                ...state,
                price_book: action.payload,
            };
        case Type.product_SET_QUANTITY_BOOK:
            return {
                ...state,
                detail_book: [
                    ...state.detail_book.slice(0, 0),
                    {
                        ...state.detail_book[0],
                        quantity: action.payload,
                    },
                    ...state.detail_book.slice(1),
                ],
            };
        case Type.product_SET_DISCOUNT_PRICE_BOOK:
            return {
                ...state,
                detail_book: [
                    ...state.detail_book.slice(0, 0),
                    {
                        ...state.detail_book[0],
                        discount_price: action.payload,
                        final_price: action.payload,
                    },
                    ...state.detail_book.slice(1),
                ],
            };
        case Type.product_SET_MAIN_PRICE_BOOK:
            return {
                ...state,
                detail_book: [
                    ...state.detail_book.slice(0, 0),
                    {
                        ...state.detail_book[0],
                        book_price: action.payload,
                        final_price: action.payload,
                    },
                    ...state.detail_book.slice(1),
                ],
            };
        case Type.product_SET_FIRST_LOADING_REVIEW:
            return {
                ...state,
                first_loading_review: action.payload,
            };
        case Type.product_SET_SECOND_LOADING_REVIEW:
            return {
                ...state,
                second_loading_review: action.payload,
            };
        case Type.product_SET_REVIEW_DATA:
            return {
                ...state,
                review_data: [...action.payload],
            };
        case Type.product_AVERAGE_REVIEW:
            return {
                ...state,
                average: action.payload,
            };
        case Type.product_TOTAL_REVIEW:
            return {
                ...state,
                total_review: action.payload,
            };
        case Type.product_COUNT_RATING_STAR:
            return {
                ...state,
                count_rating_star: [...action.payload],
            };
        case Type.product_FROM_REVIEW:
            return {
                ...state,
                from: action.payload,
            };
        case Type.product_TO_REVIEW:
            return {
                ...state,
                to: action.payload,
            };
        case Type.product_TOTAL_PAGE_REVIEW:
            return {
                ...state,
                total_page: action.payload,
            };
        case Type.product_CURRENT_PAGE_REVIEW:
            return {
                ...state,
                current_page: action.payload,
            };
        case Type.product_CURRENT_FILTER_STAR:
            return {
                ...state,
                current_filter_star: action.payload,
            };
        case Type.product_SORT_REVIEW:
            return {
                ...state,
                sort_key: action.payload.sort_key,
                sort_value: action.payload.sort_value,
            };
        case Type.product_SET_PER_PAGE:
            return {
                ...state,
                per_page: action.payload,
            };
        default:
            return state;
    }
};

export default product;
