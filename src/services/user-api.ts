import { ProfileData } from "@/features/profile/ProfilePage";
import { axiosInstance } from "./axios";

const USER_URL = "/users";
export const getUserById = async (userId: string): Promise<ProfileData> => {
    const response = await axiosInstance.get(`${USER_URL}/${userId}`);
    return response.data;
}

export const updateProfileById = async (userId: string, profileData: ProfileData): Promise<ProfileData> => {
    const response = await axiosInstance.put(`${USER_URL}/${userId}`, profileData);
    return response.data;
}