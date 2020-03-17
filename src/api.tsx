import { get, put, post } from "@jimengio/api-base";
import { IUpload, IDownload } from "./model";

import { apiHost } from "./config";

import mime from "mime-types";

export const getUploadUrl = async (url: string, fileName: string, category: string) => {
  return get<IUpload>({
    baseURL: apiHost,
    url,
    query: { fileName, category },
  });
};

export const uploadByUrl = async (fileUrl: string, file: File, fileName: string) => {
  return put<void>({
    url: fileUrl,
    data: file,
    headers: {
      "Content-Type": mime.contentType(file.type),
    },
  });
};

export const getDownloadUrl = async (url: string, filePath: string) => {
  return get<IDownload>({
    baseURL: apiHost,
    url,
    query: { filePath },
  });
};
