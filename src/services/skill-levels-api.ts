import { axiosInstance } from "./axios";
import { CodebookItem } from "./types";

export interface SortableCodebookItem extends CodebookItem {
    levelOrder: number;
}

const SKILL_LEVELS_URL = "/skill-levels";
export const getSkillLevels = async (): Promise<SortableCodebookItem[]> => {
    const response = await axiosInstance.get(SKILL_LEVELS_URL);
    return response.data;
}     