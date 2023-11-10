import axiosClient from "./axiosClient.js";

const prefix = "/books";

const bookApi = {
    getBooks: ({
        page = undefined,
        perPage = undefined,
        category = undefined,
        author = undefined,
        ratingStar = undefined,
        sortKey = "on_sale",
        sortValue = "desc",
        limit = undefined,
        paginate = false,
    } = {}) => {
        let url = prefix;
        const queryStringArray = [];

        if (page) {
            queryStringArray.push(`page=${page}`);
        }

        if (perPage) {
            queryStringArray.push(`per_page=${perPage}`);
        }

        if (category) {
            queryStringArray.push(`filter[category]=${category}`);
        }

        if (author) {
            queryStringArray.push(`filter[author]=${author}`);
        }

        if (ratingStar) {
            queryStringArray.push(`filter[rating_star]=${ratingStar}`);
        }

        if (sortKey && sortValue) {
            queryStringArray.push(`sort[${sortKey}]=${sortValue}`);
        }

        if (limit) {
            queryStringArray.push(`limit=${limit}`);
        }

        if (paginate) {
            queryStringArray.push("mode[paginate]=on");
        }

        if (queryStringArray.length > 0) {
            for (const index in queryStringArray) {
                url +=
                    index === "0"
                        ? `?${queryStringArray[index]}`
                        : `&${queryStringArray[index]}`;
            }
        }

        return axiosClient.get(url);
    },
    getBookById: (id) => {
        const url = `${prefix}/${id}`;
        return axiosClient.get(url);
    },
};

export default bookApi;
