import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://10.0.0.67:8080/api",
    headers: {
        "X-User-Id": "af9bad2c-5787-4bec-be56-62cf9337dc89",
    },
});