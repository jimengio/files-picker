import React, { FC } from "react";
import { css, cx } from "emotion";
import { fullscreen, row, expand } from "@jimengio/flex-styles";

import { HashRedirect, findRouteTarget } from "@jimengio/ruled-router/lib/dom";
import { genRouter, GenRouterTypeMain } from "controller/generated-router";
import { ISidebarEntry, DocSidebar } from "@jimengio/doc-frame";

import PageBaseUpload from "./base-upload";
import PageUploadWrapper from "./upload-wrapper";
import DraggerUpload from "./dragger-upload";

import "antd/dist/antd.min.css";

let items: ISidebarEntry[] = [
  { title: "Base upload", path: genRouter.baseUpload.name },
  { title: "Upload wrapper", path: genRouter.uploadWrapper.name },
  { title: "Dragger upload", path: genRouter.draggerUpload.name },
];

const renderChildPage = (routerTree: GenRouterTypeMain) => {
  switch (routerTree?.name) {
    case "base-upload":
      return <PageBaseUpload />;
    case "upload-wrapper":
      return <PageUploadWrapper />;
    case "dragger-upload":
      return <DraggerUpload />;
    default:
      return <HashRedirect to={genRouter.baseUpload.path()} noDelay />;
  }

  return <div>NOTHING</div>;
};

let onSwitchPage = (path: string) => {
  let target = findRouteTarget(genRouter, path);
  if (target != null) {
    target.go();
  }
};

let Container: FC<{ router: GenRouterTypeMain }> = React.memo((props) => {
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(fullscreen, row, styleContainer)}>
      <DocSidebar
        title="Files Picker"
        currentPath={props.router.name}
        onSwitch={(item) => {
          onSwitchPage(item.path);
        }}
        items={items}
      />
      <div className={cx(expand, styleBody)}>{renderChildPage(props.router)}</div>
    </div>
  );
});

export default Container;

const styleContainer = css``;

let styleBody = css`
  padding: 16px;
`;
