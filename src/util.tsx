export const download = (url: string, fileName?: string) => {
  const a = document.createElement("a");
  a.href = url;
  a.setAttribute("download", "true");
  if (fileName) {
    a.download = fileName;
  }

  /** 兼容chorme和firefox */
  var evt = document.createEvent("MouseEvents");
  evt.initEvent("click", true, true);
  a.dispatchEvent(evt);
};

export const getAttachmentName = (attach: string): string => {
  let strArr = attach.split("/");
  return strArr[strArr.length - 1];
};

export const downloadByBlob = (data: Blob, fileName?: string) => {
  const url = URL.createObjectURL(data);
  download(url, fileName);
};

export function interpolateLocale(template: string, data: { [k: string]: any }) {
  if (!template) {
    throw new Error("Parameter 'template' is required.");
  }

  if (!data) {
    throw new Error("Parameter 'data' is required.");
  }

  for (var key in data) {
    template = template.replace(new RegExp("{" + key + "}", "gi"), data[key]);
  }

  return template;
}
