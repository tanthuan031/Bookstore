import axiosClient from "./axiosClient";

const filterDataApi = {
    getAllCategories: () => {
        const url = "/categories?mode[category_name]=on";
        return axiosClient.get(url);
    },

    getAllAuthors: () => {
        const url = "/authors?mode[author_name]=on";
        return axiosClient.get(url);
    },

    getAllRatingStars: () => {
        const url = "reviews?mode[rating_star]=on";
        return axiosClient.get(url);
    },
};

export default filterDataApi;
