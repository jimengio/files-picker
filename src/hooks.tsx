import { getUploadUrl, uploadByUrl, getDownloadUrl } from "./api";
import { useState } from "react";

export const useUploadApi = () => {
  let [isLoading, setLoading] = useState(false);

  const startUpload = async (url: string, fileName: string, category: string, file: File) => {
    try {
      if (isLoading) return;

      setLoading(true);

      const uploadUrl = await getUploadUrl(url, fileName, category);

      await uploadByUrl(uploadUrl.fileUrl, file, fileName);

      return uploadUrl.filePath;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    startUpload,
  };
};

export const useDownloadApi = () => {
  let [isLoading, setLoading] = useState(false);

  const startDownload = async (url: string, filePath: string) => {
    try {
      if (isLoading) return;

      setLoading(true);

      const downloadResult = await getDownloadUrl(url, filePath);

      return downloadResult.fileUrl;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, startDownload };
};
