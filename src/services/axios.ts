import axios from "axios";
import { PATHS } from "@/paths";
import envConfig from "../../env.json";

export const axiosInstance = axios.create({
    baseURL: envConfig.BE_API_BASE_URL,
});

// Add request interceptor to attach JWT token
axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = sessionStorage.getItem("accessToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (typeof window === "undefined") {
            return Promise.reject(error);
        }

        if (error.response?.status === 401) {
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("tokenExpiresAt");

            // Clear legacy persistence (in case an older build stored tokens in localStorage)
            localStorage.removeItem("accessToken");
            localStorage.removeItem("tokenExpiresAt");

            if (window.location.pathname !== PATHS.LOGIN) {
                window.location.href = PATHS.LOGIN;
            }
        }

        return Promise.reject(error);
    }
);