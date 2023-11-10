import { FaBook, FaStar, FaUserEdit } from "react-icons/fa";
import {
    editCurrentFilter,
    removeCurrentFilter,
    setBooks,
    setCurrentFilter,
    setCurrentPage,
    setCurrentPerPage,
    setCurrentSort,
    setFirstLoading,
    setIndexItem,
    setItemsTotal,
    setLoading,
    setReset,
    setResetFilterShop,
    setTotalPage,
} from "../../redux/actions/shop.action.js";
import {
    setDataFilter,
    setResetFilter,
} from "../../redux/actions/filter.action.js";

import bookApi from "../../api/bookApi.js";
import filterDataApi from "../../api/filterDataApi.js";
import { openFilterDrawer } from "../../redux/actions/drawer.action.js";

export const getAllCategories = () => {
    return filterDataApi.getAllCategories();
};

export const getAllAuthors = () => {
    return filterDataApi.getAllAuthors();
};

export const getAllRatingStars = () => {
    return filterDataApi.getAllRatingStars();
};

export const getBooks = ({
    page = undefined,
    perPage = undefined,
    category = undefined,
    author = undefined,
    ratingStar = undefined,
    sortValue = undefined,
    sortKey = undefined,
} = {}) => {
    return bookApi.getBooks({
        page,
        perPage,
        category,
        author,
        ratingStar,
        sortKey,
        sortValue,
        paginate: true,
    });
};

export const getShopData = async () => {
    return Promise.all([
        getAllCategories(),
        getAllAuthors(),
        getAllRatingStars(),
        getBooks(),
    ]).then((result) => {
        const data = [
            {
                title: "Category",
                data: result[0].data.map((item) => item.category_name),
                icon: <FaBook />,
            },
            {
                title: "Author",
                data: result[1].data.map((item) => item.author_name),
                icon: <FaUserEdit />,
            },
            {
                title: "Rating Review",
                data: result[2].data.map((item) =>
                    item.rating_star === 1
                        ? `${item.rating_star} Star`
                        : `${item.rating_star} Stars`
                ),
                icon: <FaStar />,
            },
        ];
        const books = result[3];
        return {
            data,
            books,
        };
    });
};

export const mapDispatchToProps = (dispatch) => {
    return {
        setDataFilter: (data) => dispatch(setDataFilter(data)),
        setTotalPage: (data) => dispatch(setTotalPage(data)),
        setItemsTotal: (data) => dispatch(setItemsTotal(data)),
        setCurrentPage: (data) => dispatch(setCurrentPage(data)),
        setIndexItem: (data) => dispatch(setIndexItem(data)),
        setBooks: (data) => dispatch(setBooks(data)),
        setCurrentPerPage: (data) => dispatch(setCurrentPerPage(data)),
        setCurrentFilter: (data) => dispatch(setCurrentFilter(data)),
        editCurrentFilter: (data) => dispatch(editCurrentFilter(data)),
        removeCurrentFilter: (data) => dispatch(removeCurrentFilter(data)),
        setLoading: (data) => dispatch(setLoading(data)),
        setFirstLoading: (data) => dispatch(setFirstLoading(data)),
        setCurrentSort: (data) => dispatch(setCurrentSort(data)),
        setReset: () => dispatch(setReset()),
        setResetFilter: () => dispatch(setResetFilter()),
        openFilterDrawer: () => dispatch(openFilterDrawer()),
        setResetFilterShop: () => dispatch(setResetFilterShop()),
    };
};
