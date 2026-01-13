import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://10.0.0.67:8080/api",
    headers: {
        "X-User-Id": "32c9f9a7-f4c6-4ad2-a8b9-6099e696fb66",
    },
});