import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "X-User-Id": "0c4dc677-c047-4e8b-b747-4f3858a7c720",
    },
});