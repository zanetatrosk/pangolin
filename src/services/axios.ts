import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "X-User-Id": "ecc81ede-b7af-4a60-b707-2b466abf196b",
    },
});