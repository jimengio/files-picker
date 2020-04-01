import React, { FC, useRef, useEffect, useState } from "react";

import BaseDisplay from "./base-display";

import { css, cx } from "emotion";
import { Icon, Spin, message } from "antd";
import { useUploadApi } from "../hooks";

import { uploadingLocales } from "../config";
import { interpolateLocale } from "../util";

interface IProps {
  url: string;
  downloadUrl: string;
  isEdit?: boolean;
  onUploaded?: (uploadRes: string[]) => void;
  initPath?: string[];
  fileType?: string[];
  maxSize?: number; // 单位 M
  fileListWidth?: number;
  disabled?: boolean;
  text?: string;
  description?: string;
}

const defaultFileType = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".txt", ".zip", ".7z", ".tar"];
let BaseUpload: FC<IProps> = React.memo((props) => {
  const { onUploaded, isEdit = false, initPath, fileType = defaultFileType, maxSize = 10, fileListWidth, disabled, text, description } = props;

  const fileRef = useRef(null);
  const [filePath, setFilePath] = useState<string[]>(initPath);
  const [fileName, setFileName] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const uploadingResource = useUploadApi();

  useEffect(() => {
    if (initPath) {
      if (!(initPath instanceof Array)) return;
      let nameArry = [];
      initPath.forEach((path) => {
        nameArry.push(path.split("/")[2]);
      });
      setFileName(nameArry);
      setFilePath(initPath);
    }
  }, [initPath]);

  useEffect(() => {
    if (filePath) {
      onUploaded(filePath.length === 0 ? null : filePath);
    }
  }, [filePath]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Spin spinning={uploadingResource.isLoading} size="small">
          <div
            style={{ background: error ? "#ff4d4f" : "#0c4ca3" }}
            className={cx(style.container, disabled ? style.disabledColor : null)}
            onClick={() => {
              if (disabled) return;
              fileRef.current.click();
            }}
          >
            {isEdit ? null : (
              <>
                <Icon type={error ? "exclamation" : "upload"} /> {text ? text : uploadingLocales.uploadFile}
              </>
            )}
          </div>
        </Spin>
        {error ? <span className={style.errorHint}>{uploadingLocales.error}</span> : null}
        {description ? <span className={style.hint}>{description}</span> : null}
      </div>
      <BaseDisplay
        url={props.downloadUrl}
        fileListWidth={fileListWidth}
        attachmentPath={filePath}
        onDel={(path, name) => {
          setFilePath(
            filePath.filter((p) => {
              return p !== path;
            })
          );
          setFileName(
            fileName.filter((n) => {
              return n !== name;
            })
          );
          fileRef.current.value = null;
        }}
      />
      <input
        disabled={disabled}
        ref={fileRef}
        type="file"
        hidden
        accept={fileType.join(",")}
        onChange={async (event) => {
          try {
            const file = event.target.files[0];
            const fileSize = file.size / 1024 / 1024;
            if (fileSize >= maxSize) {
              message.warning(interpolateLocale(uploadingLocales.maxFileSizeHint, { size: `${maxSize}m` }));
              return;
            }
            const uploadResult = await uploadingResource.startUpload(props.url, file.name, file);

            setFilePath(Array.isArray(filePath) ? [...filePath, uploadResult] : [uploadResult]);
            setFileName([...fileName, file.name]);
          } catch (err) {
            console.error(err);
            setError(true);
          } finally {
            fileRef.current.value = null;
          }
        }}
      />
    </div>
  );
});

export default BaseUpload;

const style = {
  container: css`
    background: #0c4ca3;
    margin-right: 15px;
    padding: 0 12px;
    height: 30px;
    line-height: 30px;
    border-radius: 2px;
    text-align: center;
    font-size: 13px;
    color: #fff;
    cursor: pointer;
    :hover {
      background: #3d70b5;
    }
  `,
  disabledColor: css`
    background-color: #f2f2f2;
    cursor: not-allowed;
    :hover {
      background-color: #f2f2f2;
    }
  `,
  hint: css`
    color: #aaa;
    font-size: 11px;
    line-height: 30px;
  `,
  errorHint: css`
    color: #ff4d4f;
    font-size: 11px;
    line-height: 30px;
    margin-right: 5px;
  `,
};
