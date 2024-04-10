# tiny-image-viewer

一个简单的图片放大器

## 安装

```bash
npm i @liusc/tiny-image-viewer
```

## 使用

### 在浏览器中使用

在 HTML 页面中引入文件：

```html
<img src="1.jpg" class="img" />
<script src="tinyImageViewer.js"></script>
```

```js
const img = document.querySelector(".img");
img.onclick = (e) => {
  tinyImageViewer(e.target);
};
// 或
img.onclick = (e) => {
  tinyImageViewer({
    el: e.target,
    src: e.target.src,
  });
};
```

### 在 ES Modules 中使用

在 JavaScript 中导入 tinyImageViewer

```js
import tinyImageViewer from "@liusc/tiny-image-viewer";
tinyImageViewer(imageElement);
```

## 参数

- config（Object | HTMLImageElement）: 对象或图片元素，对象时包含以下属性的配置对象：
  - el（HTMLImageElement）: 要显示的图片元素。
  - src（String，可选）: 图片的 URL。当 el 是图片元素时，可以不提供此属性。
  - zIndex（Number，可选）: 图片层级，默认为 99999。
  - space（Number，可选）: 图片与浏览器窗口边缘的间距，默认为 0。
  - close（Function，可选）: 关闭图片时的回调函数，默认为空函数。

## 注意事项

- 本函数接受两种类型的 config 参数：包含 el 和 src 属性的图片元素对象，或者包含 src 属性的普通对象。
- 如果 `config 参数为图片元素对象`，则函数会将该元素作为要显示的图片，并使用其 src 属性作为图片 URL。如直接调用`tinyImageViewer(imageElement)`
- 默认情况下，图片将居中显示在浏览器窗口中。
- 可以通过配置参数来自定义图片的样式和行为。

## 效果图

![效果图](./demo.gif "效果图")
