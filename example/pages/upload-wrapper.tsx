import React, { FC } from "react";
import { css } from "emotion";
import { DocDemo, DocSnippet, DocBlock } from "@jimengio/doc-frame";
import { UploadWrapper } from "../../src";

let PageUploadWrapper: FC<{}> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div>
      <DocDemo title="Upload wrapper">
        <DocBlock content={content} />
        <DocSnippet code={code} />
        <UploadWrapper
          onChange={async (files) => {
            console.log("files", files);
          }}
        >
          <div>点击选取一个文件, 在 Console 查看</div>
        </UploadWrapper>
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
