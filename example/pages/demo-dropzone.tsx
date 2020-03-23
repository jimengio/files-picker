import React, { FC } from "react";
import { css } from "emotion";
import { DocDemo, DocSnippet, DocBlock } from "@jimengio/doc-frame";

import Dropzone from "../../src/component/dropzone";

let DemoDropzone: FC<{}> = React.memo((props) => {
  return (
    <div>
      <DocDemo title="Dropzone">
        <DocBlock content={content} />
        <DocSnippet code={code} />

        <Dropzone title={title} subTitle={subTitle} />
      </DocDemo>
    </div>
  );
});

export default DemoDropzone;

let title = `点击或将文件拖拽到这里上传`;

let subTitle = `支持格式：jpeg/png/png；word：doc/docx；excel：xlsx/xlsm/xlsb/csv；pdf；ppt：ppt/pptx，大小不超过100M`;

let code = `
<Dropzone title={\${title}} subTitle={\${subTitle}} />
`;

let content = `
可以拖拽、点击的通用上传组件
`;
