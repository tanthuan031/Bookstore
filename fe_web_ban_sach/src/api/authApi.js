import axiosClient from "./axiosClient";

const prefix = "/auth";

const authApi = {
    register: (body) => {
        const url = `${prefix}/register`;
        return axiosClient.post(url, body);
    },

    login: (body) => {
        const url = `${prefix}/login`;
        return axiosClient.post(url, body);
    },

    logout: (token) => {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const url = "user/logout";
        return axiosClient.post(url, null, header);
    },

    userInformation: (token) => {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const url = "user";
        return axiosClient.get(url, header);
    },
};

export default authApi;
