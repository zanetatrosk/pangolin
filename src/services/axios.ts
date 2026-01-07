import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://10.0.0.67:8080/api",
    headers: {
        "X-User-Id": "73b40139-88f9-4d35-b6db-e1756bc9491e",
    },
});