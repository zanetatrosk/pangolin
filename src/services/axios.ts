import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "X-User-Id": "043b8cc9-43b9-42a3-97c8-cf41214de87d",
    },
});