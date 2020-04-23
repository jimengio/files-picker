import React, { FC } from "react";
import { css } from "emotion";
import { DocDemo, DocSnippet, DocBlock } from "@jimengio/doc-frame";
import UploadWrapper, { useUploadTrigger } from "../../src/component/upload-wrapper";
import { Button } from "antd";
import { JimoButton } from "@jimengio/jimo-basics";

let PageUploadWrapper: FC<{}> = React.memo((props) => {
  /** Plugins */

  let uploadPlugin = useUploadTrigger({
    acceptedFileTypes: ["jpg", "png"],
  });

  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div>
      <DocDemo title="Upload wrapper">
        <DocBlock content={content} />
        <DocSnippet code={code} />
        <UploadWrapper
          acceptedFileTypes={["jpg", "png"]}
          onChange={async (files) => {
            console.log("files", files);
          }}
        >
          <JimoButton text="点击选取一个文件, 在 Console 查看" onClick={() => {}}></JimoButton>
        </UploadWrapper>
      </DocDemo>

      <DocDemo title="Upload Trigger">
        <JimoButton
          text="点击选取一个文件, 在 Console 查看"
          onClick={(event) => {
            uploadPlugin.onUpload((files) => {
              console.log("files", files);
            });
          }}
        ></JimoButton>
        <DocSnippet code={hooksCode} />
        {uploadPlugin.ui}
      </DocDemo>
    </div>
  );
});

export default PageUploadWrapper;

let code = `
<UploadWrapper
  onChange={async (files) => {
    console.log("files", files);
  }}
  >
  <div>点击选取一个文件, 在 Console 查看</div>
</UploadWrapper>
`;

let content = `
UploadWrapper 可以包裹一个区域, 用来获取 File 对象. 得到 File 对象之后, 再通过 API 手动发送.
`;

let hooksCode = `
let uploadPlugin = useUploadTrigger({
  acceptedFileTypes: ["jpg", "png"],
});

<JimoButton
  text="点击选取一个文件, 在 Console 查看"
  onClick={(event) => {
    uploadPlugin.onUpload((files) => {
      console.log("files", files);
    });
  }}
></JimoButton>
`;
