import React, { FC } from "react";
import { css } from "emotion";
import { DocDemo, DocSnippet, DocBlock } from "@jimengio/doc-frame";
import { UploadWrapper } from "../../src";

import DraggerUpload from "../../src/component/dragger-upload";

let DemoDraggerUpload: FC<{}> = React.memo((props) => {
  return (
    <div>
      <DocDemo title="Dragger upload">
        <DocBlock content={content} />
        <DocSnippet code={code} />

        <DraggerUpload title={title} subTitle={subTitle} />
      </DocDemo>
    </div>
  );
});

export default DemoDraggerUpload;

let title = `点击或将文件拖拽到这里上传`;

let subTitle = `支持格式：jpeg/png/png；word：doc/docx；excel：xlsx/xlsm/xlsb/csv；pdf；ppt：ppt/pptx，大小不超过100M`;

let code = `
<DraggerUpload title={${title}} subTitle={${subTitle}} />
`;

let content = `
可以拖拽、点击的通用上传组件
`;
