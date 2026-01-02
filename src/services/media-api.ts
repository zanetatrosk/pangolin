import { EventMediaItem } from "@/features/newEvent/types";
import { axiosInstance } from "./axios";

const MEDIA_URL = "/media/upload";

export const postMedia = async (file: File): Promise<EventMediaItem> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(MEDIA_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
