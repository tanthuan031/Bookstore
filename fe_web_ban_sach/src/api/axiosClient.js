import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8888/api",
  headers: {
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    console.log("response: ", response);
    if (response && response?.data) {
      return response?.data;
    }
    return response;
  },
  (error) => {
    try {
      switch (error?.response?.status) {
        case 500:
          console.log("❎ Server error");
          break;
        default:
          console.log("❎ Something went wrong ❎");
          console.log("❎ -------------------- ❎");
          // console.log("➡️ URL: " + error.response.config.url);
          // console.log("➡️ HTTP Code: " + error.response.status);
          // console.log("➡️ HTTP Message: " + error.response.statusText);
          console.log("❎ -------------------- ❎");
          return error.response;
      }
    } catch (error) {}

    return Promise.reject(error);
  }
);

export default axiosClient;
