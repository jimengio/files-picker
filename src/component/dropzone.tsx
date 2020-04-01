import React, { FC, useEffect, useState, useRef } from "react";
import { css, cx } from "emotion";
import { center, column, Space, rowParted } from "@jimengio/flex-styles";

import UploadWrapper from "./upload-wrapper";
import { Icon, message } from "antd";
import JimoIcon, { EJimoIcon } from "@jimengio/jimo-icons";

import { interpolateLocale } from "../util";
import { uploadingLocales } from "../config";
import { useUploadApi, useDownloadApi } from "../hooks";
import { download } from "../util";

interface IProps {
  className?: string;
  areaClassName?: string;
  title?: string;
  subTitle?: string;
  accept?: string;
  maxSize?: number; // 单位 M
  multiple?: boolean;
  acceptedFileTypes?: string[];
  /**
   * api param
   */
  url?: string;
  downloadUrl?: string;
  onUploaded?: (uploadRes: string[], fileList: File[]) => void;
}

enum EUploadState {
  success = "success",
  failure = "Failure",
}

interface IUploadItem {
  name: string;
  state?: EUploadState;
  filePath?: string;
}

let Dropzone: FC<IProps> = React.memo((props) => {
  const { maxSize = 10 } = props;

  let uploadElement = useRef({} as any);
  let [dragenter, setDragenter] = useState<boolean>(false);
  let [uploadList, setUploadList] = useState<IUploadItem[]>([]);
  let uploadingResource = useUploadApi();
  let downloadingResource = useDownloadApi();

  useEffect(() => {
    const dropbox = uploadElement.current;
    dropbox.addEventListener("dragenter", onDragenter);
    dropbox.addEventListener("dragleave", onDragleave);
    dropbox.addEventListener("drop", onDrop);

    document.addEventListener("dragover", onDragover);
    return () => {
      dropbox.removeEventListener("dragenter", onDragenter);
      dropbox.removeEventListener("dragleave", onDragleave);
      dropbox.removeEventListener("drop", onDrop);

      document.removeEventListener("dragover", onDragover);
    };
  }, []);

  let onDragenter = (e) => {
    setDragenter(true);
  };

  let onDragleave = (e) => {
    setDragenter(false);
  };

  let onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragenter(false);

    const fileList = Array.from(e.dataTransfer.files) as File[];

    if (fileList.length > 0) {
      if (fileList.length > 1 && !props.multiple) {
        message.warning(uploadingLocales.dropzoneWarnMultiple);
      } else {
        let files: File[] = [];
        let resArray: string[] = [];

        fileList.forEach(async (file) => {
          const fileExtension = file.name.split(".").pop();
          if (props.acceptedFileTypes && !props.acceptedFileTypes.includes(fileExtension)) {
            message.error(interpolateLocale(uploadingLocales.unsupportedFileType, { type: props.acceptedFileTypes.join(", ") }));
            return;
          }
          const isExceedMaxSize = judgeSize(file.size);
          if (isExceedMaxSize) return;

          const uploadRes = await reqUpload(file);

          resArray.push(uploadRes);
          files.push(file);
        });

        if (props.onUploaded) props.onUploaded(resArray, files);
      }
    }
  };

  let onDragover = (e) => {
    // 阻止拖入浏览器后触发下载
    e.preventDefault();
    e.stopPropagation();
  };

  let judgeSize = (fileSize) => {
    const resultSize = fileSize / 1024 / 1024;
    if (resultSize >= maxSize) {
      message.warning(interpolateLocale(uploadingLocales.maxFileSizeHint, { size: `${maxSize}m` }));
      return true;
    } else {
      return false;
    }
  };

  let reqUpload = async (file: File) => {
    try {
      const uploadResult = await uploadingResource.startUpload(props.url, file.name, file);

      setUploadList([...uploadList, { name: file.name, state: EUploadState.success, filePath: uploadResult }]);

      return uploadResult;
    } catch (error) {
      console.error(error);
      message.error(uploadingLocales.uploadFailure);
    }
  };

  let reqDownload = async (path: string) => {
    try {
      const downloadUrl = await downloadingResource.startDownload(props.downloadUrl, path);
      download(downloadUrl);
    } catch (error) {
      console.error(error);
      message.error(uploadingLocales.downloadFailure);
    }
  };

  let delFile = (path: string) => {
    setUploadList(uploadList.filter((u) => u.filePath !== path));
  };

  return (
    <div className={cx(styleContainer, props.className)}>
      <UploadWrapper
        accept={props.accept}
        acceptedFileTypes={props.acceptedFileTypes}
        onChange={async (fileList: File[]) => {
          let files: File[] = [];
          let resArray: string[] = [];

          fileList.forEach(async (file) => {
            const isExceedMaxSize = judgeSize(file.size);
            if (isExceedMaxSize) return;

            const uploadRes = await reqUpload(file);
            resArray.push(uploadRes);
            files.push(file);
          });

          if (props.onUploaded) props.onUploaded(resArray, files);
        }}
      >
        <div
          className={cx(center, styleDropArea, props.areaClassName)}
          ref={uploadElement}
          style={dragenter ? { borderColor: "#3674ff" } : { borderColor: "#e8e8e8" }}
        >
          <JimoIcon name={EJimoIcon.uploadBox} className={styleUploadIcon} />
          <Space height={8} />
          <span className={styleTitle}>{props.title || uploadingLocales.dropzoneTitle}</span>
          <Space height={8} />
          <span className={styleSubTitle}>{props.subTitle}</span>
        </div>
      </UploadWrapper>
      <div className={cx(column)}>
        {uploadList.map((item, index) => {
          return (
            <div key={index} className={cx(rowParted, styleUploadItem)}>
              <span>
                <Icon type="link" />
                <Space width={5} />
                {item.name}
              </span>
              <span>
                <span className={styleIcon} onClick={() => reqDownload(item.filePath)}>
                  <Icon type="download" />
                </span>
                <Space width={10} />
                <span className={styleIcon} onClick={() => delFile(item.filePath)}>
                  <Icon type="close" />
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Dropzone;

let styleDropArea = css`
  min-width: 360px;
  min-height: 140px;
  border: 1px dashed;
  border-radius: 4px;
  background: #f5f5f5;
  transition: 240ms;
  text-align: center;
  padding: 24px 36px;
  :hover {
    border-color: #3674ff !important;
  }
`;

let styleTitle = css`
  color: #323232;
  font-size: 16px;
  line-height: 22px;
  pointer-events: none;
`;

let styleSubTitle = css`
  font-size: 12px;
  line-height: 22px;
  color: #979797;
  text-align: left;
  pointer-events: none;
`;

let styleUploadItem = css`
  height: 25px;
  border-radius: 2px;
  transition: 240ms;
  padding: 0 2px;
  :hover {
    background: rgb(242, 245, 251);
  }
`;

let styleIcon = css`
  font-size: 12px;
  cursor: pointer;
`;

let styleUploadIcon = css`
  color: #3674ff;
  font-size: 48px;
  height: 48px;
  line-height: 48px;
  pointer-events: none;
`;

let styleContainer = css``;
