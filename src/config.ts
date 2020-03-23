export let apiHost: string;

/** TODO, 未来看情况要扩展多语言 */
export let uploadingLocales = {
  supportExpandedName: "支持扩展名",
  uploadFile: "上传文件",
  maxFileSizeHint: "已超过最大文件大小限制，限制为：{size}",
  error: "异常",
  unsupportedFileType: "不支持该文件类型，仅支持{type}",
  draggerUploadTitle: "点击或将文件拖拽到这里上传",
  draggerUploadMultipleHint: "不支持多文件上传",
  uploadFailure: "上传失败",
  downloadFailure: "下载失败",
};

/** 设置上传组件使用的参数 */
export let configureUploading = (options: { apiHost: string; locales?: typeof uploadingLocales }) => {
  apiHost = options.apiHost;
  if (options.locales != null) {
    uploadingLocales = options.locales;
  }
};
