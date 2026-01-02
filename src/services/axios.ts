import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "X-User-Id": "becbaab2-ab4a-4e24-8961-d0d24dcbd152",
    },
});