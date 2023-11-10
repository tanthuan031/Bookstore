import axiosClient from "./axiosClient";
import { concatQueryString } from "../utils/concatQueryString";

const prefix = "/reviews";

const reviewApi = {
    getReviewByBookId: ({
        id = undefined,
        perPage = undefined,
        page = undefined,
        sortKey = "review_date",
        sortValue = "desc",
        ratingStar = undefined,
    } = {}) => {
        const url = `${prefix}/${id}`;

        const queryStringArray = [];

        if (page) {
            queryStringArray.push(`page=${page}`);
        }

        if (perPage) {
            queryStringArray.push(`per_page=${perPage}`);
        }

        if (ratingStar) {
            queryStringArray.push(`filter[rating_star]=${ratingStar}`);
        }

        if (sortKey && sortValue) {
            queryStringArray.push(`sort[${sortKey}]=${sortValue}`);
        }

        const finalUrl = concatQueryString(queryStringArray, url);

        return axiosClient.get(finalUrl);
    },

    createNewReview: (body) => {
        const url = `${prefix}`;
        return axiosClient.post(url, body);
    },
};

export default reviewApi;
