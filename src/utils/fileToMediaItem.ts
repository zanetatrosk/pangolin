export const fileToMediaItem = (file: File) => {
      const type = file.type.startsWith("video/") ? "video" : "image";
      const objectUrl = URL.createObjectURL(file);
      return {
        id: Date.now(),
        type,
        url: objectUrl,
      };
  };