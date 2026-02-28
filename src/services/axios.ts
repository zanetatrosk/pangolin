import axios from "axios";
import { PATHS } from "@/paths";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
});

// Add request interceptor to attach JWT token
axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("accessToken");
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
        
        const originalRequest = error.config;

        // If error is 401 and we haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    // No refresh token, redirect to login
                    window.location.href = PATHS.LOGIN;
                    return Promise.reject(error);
                }

                // Try to refresh the token
                const response = await axios.post(
                    "http://localhost:8080/api/auth/token",
                    { 
                        grantType: "refresh_token",
                        refreshToken 
                    }
                );

                const { accessToken, refreshToken: newRefreshToken, expiresIn } = response.data;

                // Store new tokens
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", newRefreshToken);
                const expiresAt = Date.now() + expiresIn * 1000;
                localStorage.setItem("tokenExpiresAt", expiresAt.toString());

                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Refresh failed, clear tokens and redirect to login
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("tokenExpiresAt");
                window.location.href = PATHS.LOGIN;
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);