import { axiosInstance } from "./axios";

export interface AppSummary {
  totalDancers: number;
  totalRegistrations: number;
  totalEvents: number;
}

const APP_URL = "/app";

export const getAppSummary = async (): Promise<AppSummary> => {
  const response = await axiosInstance.get(`${APP_URL}/summary`);
  return response.data;
};
