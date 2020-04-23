/**
 * 基于 shared/common/upload/upload-file-reader.tsx
 *
 * 当前组件主要用于对组件进行包裹, 然后选择文件用于上传.
 * 提供一个 <input/> 用于触发文件选取. 内部的 UI 通过 props.children 传入.
 */
import React, { CSSProperties, FC, useState, useRef } from "react";
import { css, cx } from "emotion";

import { message } from "antd";
import { interpolateLocale } from "../util";
import { uploadingLocales } from "../config";

export enum EUploadError {
  unsupportedFileType = "unsupportedFileType",
}

interface IProps {
  /** array of extnames without dots, for example `["png", "pdf"]` */
  acceptedFileTypes?: string[];
  /**
   * input accept https://stackoverflow.com/a/10503561
   * if not set, it will be generated from `acceptedFileTypes`
   */
  accept?: string;
  multiple?: boolean;
  className?: string;
  onChange: (fileList: File[]) => Promise<void>;
  onError?: (error: EUploadError) => void;
}

let UploadWrapper: FC<IProps> = React.memo((props) => {
  let inputElement = useRef(null);

  let inputAccepts = props.accept;

  if (props.accept == null) {
    if (props.acceptedFileTypes != null) {
      inputAccepts = props.acceptedFileTypes.map((x) => `.${x}`).join(",");
    }
  }

  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div
      className={cx(styleWrapper, props.className)}
      onClick={() => {
        if (inputElement.current != null) {
          inputElement.current.click();
        } else {
          console.error("Input element is missing in upload wrapper");
        }
      }}
    >
      {props.children}

      <input
        title=""
        className={styleInput}
        ref={inputElement}
        type="file"
        accept={inputAccepts}
        multiple={props.multiple}
        onChange={async (e) => {
          if (props.onChange) {
            const fileList = Array.from(e.target.files); // copy to array before resetting

            e.target.files = null; // without resetting, not able to trigger a change after failed

            if (fileList.length > 0) {
              const files: File[] = [];

              fileList.forEach((file) => {
                const fileExtension = file.name.split(".").pop();
                if (props.acceptedFileTypes && !props.acceptedFileTypes.includes(fileExtension)) {
                  if (props.onError) {
                    props.onError(EUploadError.unsupportedFileType);
                  }
                  message.error(interpolateLocale(uploadingLocales.unsupportedFileType, { type: props.acceptedFileTypes.join(", ") }));
                  return;
                }
                files.push(file);
              });

              props.onChange(files);
            }
          }
        }}
      />
    </div>
  );
});

export default UploadWrapper;

const styleWrapper = css`
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

const styleInput = css`
  position: absolute;
  top: 0;
  /* input组件带了一个按钮，那个按钮的pointer不可设置。
  所以right设为0，并且font-size很大，父元素overflow: hidden，把按钮溢出隐藏，确保用户点在label上 */
  right: 0;
  font-size: 100px;
  cursor: pointer;
  opacity: 0;
  z-index: -1;
  display: none;
`;
