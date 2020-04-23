import { get, put, post, IJimuApiOption } from "@jimengio/api-base";
import { IUpload, IDownload } from "./model";

import { apiHost } from "./config";

import mime from "mime-types";

export const uploadSign = async (url: string, fileName: string) => {
  return post<IUpload>({
    baseURL: apiHost,
    url,
    data: { fileName },
  });
};

export const uploadByUrl = async (fileUrl: string, file: File, options?: IJimuApiOption) => {
  return put<void>({
    url: fileUrl,
    data: file,
    headers: {
      "Content-Type": mime.contentType(file.type),
    },
    ...options,
  });
};

export const getDownloadUrl = async (url: string, key: string) => {
  return get<IDownload>({
    baseURL: apiHost,
    url,
    query: { key },
  });
};
