import {
    setFirstLoading,
    setIsRecommended,
    setReset,
    setTagFeaturedBooks,
    setTopTenOnSaleBooks,
} from "../../redux/actions/home.action";

import bookApi from "../../api/bookApi";

export const mapDispatchToProps = (dispatch) => {
    return {
        setTopTenOnSaleBooks: (data) => dispatch(setTopTenOnSaleBooks(data)),
        setTagFeaturedBooks: (data) => dispatch(setTagFeaturedBooks(data)),
        setIsRecommended: (data) => dispatch(setIsRecommended(data)),
        setFirstLoading: (data) => dispatch(setFirstLoading(data)),
        setReset: () => dispatch(setReset()),
    };
};

export const getTopTenOnSaleBooks = () => {
    return bookApi.getBooks({
        sortKey: "on_sale",
        sortValue: "desc",
        limit: 10,
    });
};

export const getRecommendedBooks = () => {
    return bookApi.getBooks({
        sortKey: "on_recommended",
        sortValue: "desc",
        limit: 8,
    });
};

export const getPopularBooks = () => {
    return bookApi.getBooks({
        sortKey: "on_popularity",
        sortValue: "desc",
        limit: 8,
    });
};
