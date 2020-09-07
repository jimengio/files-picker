import React, { FC } from "react";

import { css } from "emotion";
import { PaperClipOutlined, DownloadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Space } from "@jimengio/flex-styles";
import { useDownloadApi } from "../hooks";
import { downloadAsFile } from "../util";

interface IProps {
  url: string;
  attachmentPath: string[];
  readOnly?: boolean;
  onDel?: (path: string, name: string) => void;
  fileListWidth?: number;
}

let BaseDisplay: FC<IProps> = React.memo((props) => {
  const { attachmentPath, readOnly = false, onDel, fileListWidth } = props;

  const downloadingResource = useDownloadApi();

  return (
    <div className={style.container} style={{ marginTop: !readOnly ? 0 : "-3px", width: `${fileListWidth}px` || "auto" }}>
      {(attachmentPath || []).map((path, index) => {
        const name = path.split("/")[2];
        return (
          <div key={index} className={style.fileDiv}>
            <PaperClipOutlined />
            <Space width={12} />
            {name}
            <div style={{ float: "right", textAlign: "right" }}>
              <DownloadOutlined
                className={style.mouse}
                onClick={async () => {
                  const downloadUrl = await downloadingResource.startDownload(props.url, path);
                  downloadAsFile(downloadUrl);
                }}
              />
              {readOnly ? null : (
                <>
                  <Space width={15} />
                  <DeleteOutlined
                    className={style.mouse}
                    onClick={() => {
                      onDel(path, name);
                    }}
                  />
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default BaseDisplay;

const style = {
  container: css`
    width: 100%;
  `,
  fileDiv: css`
    line-height: 30px;
    color: rgba(0, 0, 0, 0.5);
    clear: both;
    height: 30px;
    padding: 0 10px 0 5px;
    border-radius: 2px;
    :hover {
      background: #e6f7ff;
    }
  `,
  mouse: css`
    cursor: pointer;
  `,
};
