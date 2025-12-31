import { axiosInstance } from "./axios";
import { CodebookItem } from "./types";

const DANCE_STYLES_URL = "/dance-styles";
export const getDanceStyles = async (): Promise<CodebookItem[]> => {
    const response = await axiosInstance.get(DANCE_STYLES_URL);
    return response.data;
}                  