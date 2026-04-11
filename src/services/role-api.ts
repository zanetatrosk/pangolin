import { axiosInstance } from "./axios";
import { CodebookItem } from "./types";

const URL = "/dancer-roles";

export const getDancerRoles = async (): Promise<CodebookItem[]> => {
    const response = await axiosInstance.get<CodebookItem[]>(URL);
    return response.data.filter((role) => {
        const normalizedId = role.id.trim().toLowerCase();
        const normalizedName = role.name.trim().toLowerCase();
        return ["leader", "follower"].includes(normalizedId) || ["leader", "follower"].includes(normalizedName);
    });
}