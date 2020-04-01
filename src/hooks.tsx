import { uploadSign, uploadByUrl, getDownloadUrl } from "./api";
import { useState } from "react";

export const useUploadApi = () => {
  let [isLoading, setLoading] = useState(false);

  const startUpload = async (url: string, fileName: string, file: File) => {
    try {
      if (isLoading) return;

      setLoading(true);

      const uploadUrl = await uploadSign(url, fileName);

      await uploadByUrl(uploadUrl.fileUrl, file);

      return uploadUrl.key;
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
