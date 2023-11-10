import authApi from "../../api/authApi";

export const register = (body) => {
    return authApi.register(body);
};

export const login = (body) => {
    return authApi.login(body);
};

export const logout = (token) => {
    return authApi.logout(token);
};

export const userInformation = (token) => {
    return authApi.userInformation(token);
};
