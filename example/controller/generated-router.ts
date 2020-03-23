import queryString from "query-string";

type Id = string;

function switchPath(x: string) {
  location.hash = `#${x}`;
}

function qsStringify(queries: { [k: string]: any }) {
  return queryString.stringify(queries, { arrayFormat: "bracket" });
}

// generated

// Generated with router-code-generator@0.2.6

export let genRouter = {
  baseUpload: {
    name: "base-upload",
    raw: "base-upload",
    path: () => `/base-upload`,
    go: () => switchPath(`/base-upload`),
  },
  uploadWrapper: {
    name: "upload-wrapper",
    raw: "upload-wrapper",
    path: () => `/upload-wrapper`,
    go: () => switchPath(`/upload-wrapper`),
  },
  dropzone: {
    name: "dropzone",
    raw: "dropzone",
    path: () => `/dropzone`,
    go: () => switchPath(`/dropzone`),
  },
  $: {
    name: "home",
    raw: "",
    path: () => `/`,
    go: () => switchPath(`/`),
  },
};

export type GenRouterTypeMain = GenRouterTypeTree["baseUpload"] | GenRouterTypeTree["uploadWrapper"] | GenRouterTypeTree["dropzone"] | GenRouterTypeTree["$"];

export interface GenRouterTypeTree {
  baseUpload: {
    name: "base-upload";
    params: {};
    query: {};
    next: null;
  };
  uploadWrapper: {
    name: "upload-wrapper";
    params: {};
    query: {};
    next: null;
  };
  dropzone: {
    name: "dropzone";
    params: {};
    query: {};
    next: null;
  };
  $: {
    name: "home";
    params: {};
    query: {};
    next: null;
  };
}
