import { EventMediaItem } from "@/features/newEvent/types";
import { axiosInstance } from "./axios";

const MEDIA_URL = "/media";

export const postMedia = async (file: File): Promise<EventMediaItem> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(`${MEDIA_URL}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export const deleteMedia = async (mediaId: string, userId: string): Promise<void> => {
  await axiosInstance.delete(`${MEDIA_URL}/${mediaId}`, {
    data: { userId },
  });
};
