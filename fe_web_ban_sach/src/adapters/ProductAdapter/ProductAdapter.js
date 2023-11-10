import {
    setAverageReview,
    setCountRatingStar,
    setCurrentFilterStar,
    setCurrentPageReview,
    setDetailBook,
    setDiscountPriceBook,
    setFirstLoadingReview,
    setFromReview,
    setMainPriceBook,
    setPerPage,
    setPriceBook,
    setQuantityBook,
    setReset,
    setReviewData,
    setSecondLoadingReview,
    setSortReview,
    setToReview,
    setTotalPageReview,
    setTotalReview,
} from "../../redux/actions/product.action.js";

import bookApi from "../../api/bookApi";
import reviewApi from "../../api/reviewApi.js";
import { setSumCartQuantity } from "../../redux/actions/app.action.js";

export const getBookById = (id) => {
    return bookApi.getBookById(id);
};

export const getReviewByBookId = ({
    id = undefined,
    perPage = undefined,
    page = undefined,
    sortKey = "review_date",
    sortValue = "desc",
    ratingStar = undefined,
} = {}) => {
    return reviewApi.getReviewByBookId({
        id,
        perPage,
        page,
        sortKey,
        sortValue,
        ratingStar,
    });
};

export const createNewReview = (body) => {
    return reviewApi.createNewReview(body);
};

export const mapDispatchToProps = (dispatch) => {
    return {
        setDetailBook: (data) => dispatch(setDetailBook(data)),
        setQuantityBook: (data) => dispatch(setQuantityBook(data)),
        setMainPriceBook: (data) => dispatch(setMainPriceBook(data)),
        setDiscountPriceBook: (data) => dispatch(setDiscountPriceBook(data)),
        setFirstLoadingReview: (data) => dispatch(setFirstLoadingReview(data)),
        setSecondLoadingReview: (data) =>
            dispatch(setSecondLoadingReview(data)),
        setReviewData: (data) => dispatch(setReviewData(data)),
        setAverageReview: (data) => dispatch(setAverageReview(data)),
        setTotalReview: (data) => dispatch(setTotalReview(data)),
        setCountRatingStar: (data) => dispatch(setCountRatingStar(data)),
        setFromReview: (data) => dispatch(setFromReview(data)),
        setToReview: (data) => dispatch(setToReview(data)),
        setTotalPageReview: (data) => dispatch(setTotalPageReview(data)),
        setCurrentPageReview: (data) => dispatch(setCurrentPageReview(data)),
        setCurrentFilterStar: (data) => dispatch(setCurrentFilterStar(data)),
        setSortReview: (data) => dispatch(setSortReview(data)),
        setPerPage: (data) => dispatch(setPerPage(data)),
        setReset: () => dispatch(setReset()),
        setPriceBook: (data) => dispatch(setPriceBook(data)),
        setSumCartQuantity: (data) => dispatch(setSumCartQuantity(data)),
    };
};
