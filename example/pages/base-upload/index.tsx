import React, { FC } from "react";
import { css } from "emotion";

import { BaseUpload } from "../../../src";
import { DocDemo, DocSnippet, DocBlock } from "@jimengio/doc-frame";
import { configureUploading } from "../../../src/config";

let BaseUploadDemo: FC<{}> = React.memo((props) => {
  configureUploading({ apiHost: "https://api.a4yun.cn" });
  return (
    <div>
      <DocDemo title="基础上传">
        <div style={{ padding: "10px" }}>
          <BaseUpload url="/api/document/uploadURL" downloadUrl="/api/document/downloadURL" />
        </div>
        <DocBlock content={baseContent} />
        <DocSnippet code={baseCode} />
      </DocDemo>
    </div>
  );
});

export default BaseUploadDemo;

const baseContent = `基础上传组件`;
const baseCode = ``;
