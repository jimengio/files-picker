/**
 * 阿里云图片处理参数(当前 imageproxy 方案不适用这里的参数)
 * 主要功能: 缩放, 裁剪, 方向自适应
 * 基于已有代码 shared/apis/attachment/attachmentApi.ts
 */

import urlParse from "url-parse";

export interface IImageProcessOptions {
  resize?: {
    m?: "lfit" | "mfit" | "fill" | "pad" | "fixed";
    w?: number; //1~4096
    h?: number; //1~4096
    l?: number; //1~4096
    s?: number; //1~4096
    limit?: 0 | 1;
    color?: string; //[000000~FFFFFF]
    p?: number; //1~1000
  };
  crop?: {
    w?: number; //1~图片宽度
    h?: number; //1~图片高度
    x?: number; //1~图片边界
    y?: number; //1~图片边界
    g?: "nw" | "north" | "ne" | "west" | "center" | "east" | "sw" | "south" | "se";
  };
  "auto-orient"?: {
    value?: 0 | 1;
  };
}

/**
 * TODO, 针对真实的 API 再适配, "image" 前缀用于阿里云, 当前服务可能不需要??
 */
export function processOSSImageUrl(downloadLink: string, options: IImageProcessOptions): string {
  if (!downloadLink || !options) {
    return downloadLink;
  }

  const keys = Object.keys(options);
  if (keys.length === 0) {
    return downloadLink;
  }

  const urlObj = urlParse(downloadLink, false);
  let xProcess = "image";
  keys.forEach((key) => {
    switch (key) {
      case "resize":
        const resizeOptions = options[key];
        const resizeQuerys = Object.keys(resizeOptions)
          .map((resizeKey) => (resizeOptions[resizeKey] != null ? `${resizeKey}_${resizeOptions[resizeKey]}` : ""))
          .filter((value) => value !== "");
        if (resizeQuerys.length > 0) {
          xProcess = `${xProcess}/${key},${resizeQuerys.join(",")}`;
        }
        break;
      case "crop":
        const cropOptions = options[key];
        const cropQuerys = Object.keys(cropOptions)
          .map((cropKey) => (cropOptions[cropKey] != null ? `${cropKey}_${cropOptions[cropKey]}` : ""))
          .filter((value) => value !== "");
        if (cropQuerys.length > 0) {
          xProcess = `${xProcess}/${key},${cropQuerys.join(",")}`;
        }
        break;
      case "auto-orient":
        const autoOrientOptions = options[key];
        const autoOrientQuerys = Object.keys(autoOrientOptions)
          .map((autoOrientKey) => (autoOrientOptions[autoOrientKey] != null ? autoOrientOptions[autoOrientKey] : ""))
          .filter((value) => value !== "");
        if (autoOrientQuerys.length > 0) {
          xProcess = `${xProcess}/${key},${autoOrientQuerys.join(",")}`;
        }
        break;
    }
  });

  urlObj.query["x-process"] = xProcess;
  return urlObj.toString();
}

/**
 *
 * @param url 图片地址
 * @param xProcess 图片操作 https://demo-tasks.com/pages/viewpage.action?pageId=22708556
 */
export let processImageUrl = (url: string, xProcess: string): string => {
  let urlObj = urlParse(url, true);
  urlObj.query["x-process"] = xProcess;
  return urlObj.toString();
};
