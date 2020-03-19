## Files Picker

> UI component of selecting files

### 用法

```bash
yarn add @jimengio/files-picker
```

API host 需要业务当中配置,

```ts
configureUploading({ apiHost: "https://api.a4yun.cn", locales: {} });
```

提供了几个简单的 API 请求用来简化请求的书写:

```js
uploadByUrl;
getDownloadUrl;
getUploadUrl;
```

当前模块提供了四个组件:

- `UploadWrapper` 可以包裹一个 ReactNode, 点击该区域得到 `files` 变量.
- `BaseUpload` 封装了一个上传组件.
- `BaseDisplay` 封装了一个用于下载的组件.
- `DraggerUpload` 封装了一个可以拖拽文件上传的组件。

### 图片缩放

图片对称 url 后增加参数来控制图片操作:

```
?x-process=100
```

```js
processImageUrl(imageUrl, "100");
```

完整文档 https://conf.jimu.io/pages/viewpage.action?pageId=22708556

```
//  100         - 100 pixels square, cropping as needed
//  200x        - 200 pixels wide, proportional height
//  x0.15       - 15% original height, proportional width
//  0x0         - no resizing
//  100x150     - 100 by 150 pixels, cropping as needed
//  150,fit     - scale to fit 150 pixels square, no cropping
//  100,r90     - 100 pixels square, rotated 90 degrees
//  100,fv,fh   - 100 pixels square, flipped horizontal and vertical
//  200x,q60    - 200 pixels wide, proportional height, 60% quality
//  200x,png    - 200 pixels wide, converted to PNG format
//  cw100,ch100 - crop image to 100px square, starting at (0,0)
//  cx10,cy20,cw100,ch200 - crop image starting at (10,20) is 100px wide and 200px tall
```

### Workflow

https://github.com/jimengio/ts-workflow

### License

MIT
