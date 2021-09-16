# echarts-map

## 简洁、明晰的省、市区三级下钻地图，基于 echarts。

## 打包命令：yarn build。

## [演示地址](https://anzhou99.github.io/)。

#### 常见问题

**🚩 1. Geojson 文件从哪来？**

（1）阿里 DataV 的[geojson 开放平台](http://datav.aliyun.com/tools/atlas/index.html)。(本 demo 是获取其所有静态文件后，存入了 git 仓库([点击查看](https://github.com/anzhou99/GeoJsons))，然后再利用`jsdelivr`CDN 返回)；

（2）巧妙利用高德开放平台的行政区域查询 API（这个方法我没试过，大家自己了解下）。

**🚩 2. 为什么我的地图切换时没有过渡效果？**

Echarts4.3 以上版本都没有地图切换的过渡效果，如果想用过渡效果务必使用 4.3 以下版本（当然也不要太老）。

另补一句，过渡效果有望在 5.3 版本回归，详见[issue](https://github.com/apache/echarts/issues/14069)。

**🚩 3. 有没有 Vue/React 版本？**

目前没有，不过迁移相信对大家来说不是问题。

**🚩 4. 为什么我修改了源码后页面上看不到效果？**

本 Demo 中使用了 Rollup，每次更改源码后必须重新打包才可。至于为什么不能热更新，因为 rollup 的热更新插件安装老是报错，就没有加这个功能。反正正式项目中基本都不会用 Rollup，你说对吧 😀。

**🚩 5. 想了解更多项目开发思路怎么办？**

可以参阅[掘金文章](https://juejin.cn/post/7008079181183614983)。

**🚩 6. 这代码不行，我有更好的！**

欢迎交流 🥳🥳~

#### 如果觉得有帮助，就请给个 star 吧！
