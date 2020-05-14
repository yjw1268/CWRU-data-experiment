# 轴承故障预测 第十组



![](https://ftp.bmp.ovh/imgs/2020/05/a047b6eaf09fc0fe.jpg)





## 项目结构

```
10:.
├─cloudfunctions
│  └─sendEmail
│      └─node_modules
│          └─nodemailer
│              └─lib
│                  ├─...
└─miniprogram
    ├─components
    ├─dist
    │  ├─...
    ├─ec-canvas
    ├─pages
    │  ├─index
    │  ├─info
    │  └─stars
    └─style
```



项目中主要包括miniprogram以及放置云函数的cloudfunctions两个部分。



### miniprogram

#### dist

存放了本项目使用的组件库：Vant Weapp
> Vant Weapp 是移动端 Vue 组件库 [Vant](https://github.com/youzan/vant) 的小程序版本，两者基于相同的视觉规范，提供一致的 API 接口，助力开发者快速搭建小程序应用。

#### ec-canvas

存放了本项目使用的图表组件库：[ECharts](https://github.com/ecomfe/echarts-for-weixin)

#### pages

存放了本项目的界面文件
    
+ index：小程序主页相关代码
	
	import.js (主要代码)
	
	  ```js
	  Page({
	    data: {
	      email: '',    // 获取目的邮件地址
	      ec: {
	        onInit: initChart    // 控制echarts慢启动
	      }
	    },
	    onLoad(){...},    // 页面加载时触发函数，实现收藏的触发更新
	    pie_click(){...},    // 实现饼图的点击切页操作
	    next(){...},    // 实现前往info页的跳转
	    collect(){...},    // 增加或取消收藏
	    sendEmail(){...},    // 传递邮件地址判定后发送邮件
	    stars(){...},    // 实现前往stars页的跳转
	  })
	  ```
	
+ info：小程序数据页相关代码
	
	   info.js (主要代码)
	
	   ```js
	    Page({
	      data: {...},
	      onReady() {
	          this.data.interval = setInterval(() => {
	            this.getData()
	          }, 1000);
	          this.getFeature();
	      },    // 利用Interval定时器实现数据的实时更新以及折线图的动态更新
	      onLoad(){...},    // 页面加载时触发函数，实现收藏的触发更新
	      getData(){
	          ...
	          wx.request({
	             url: '...', // 开发者服务器接口地址
	             herder:{
	               "content-type":"json"
	             }, // 设置请求的 header，header 中不能设置 Referer。content-type 默认为 application/json
	             success: res=>{ }, // 接口调用成功的回调函数
	             fail: res=>{ }, // 接口调用失败的回调函数
	             complete: res=>{ }, // 接口调用结束的回调函数（调用成功、失败都会执行）
	           });
	          ...
	      },    // 发起 HTTPS 网络请求
	    })
	   ```
	
+ stars：小程序收藏夹相关代码

#### app.json

```json
{
  "pages": [],
  "window": {
    "navigationBarTextStyle": "black",
    "navigationStyle": "custom"
  },
  "sitemapLocation": "sitemap.json",
  "style": "v2"
}
```
实现标题栏隐藏



### cloudfunctions

  #### sendEmail

使用node.js的nodemailer类库实现工单邮件的发送
```js
const cloud = require('wx-server-sdk')
cloud.init()
//引入发送邮件的类库
var nodemailer = require('nodemailer')
// 创建一个SMTP客户端配置
var config = {
  host: 'smtp.qq.com', //网易163邮箱 smtp.163.com
  port: 465, //网易邮箱端口 25
  auth: {
    user: 'weyounglc@qq.com', //邮箱账号
    pass: '...' //邮箱的授权码
  }
};
// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);
// 云函数入口函数
exports.main = async(event, context) => {
  let { userInfo, email} = event
  // 创建一个邮件对象
  var mail = {
    from: '来自Lies <weyounglc@qq.com>',
    subject: '来自Lies的邮件',
    to: String(email),
    text: '分类数据', 
    attachments: [
      {
        filename: 'classifiction.json',
        content: "...",
    ]
  };
  let res = await transporter.sendMail(mail);
  return res;
}
```





## CSS样式设置



#### 全局`box-sizing`

  ```css
  {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    /* 
    为元素设定的宽度和高度决定了元素的边框盒。
    就是说，为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。
    通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。
    */
  }
  ```



#### vw、vh的使用

  + vw : 1vw 等于视口宽度的1%
  
  + vh : 1vh 等于视口高度的1%
  
  + vmin : 选取 vw 和 vh 中最小的那个
  
  + vmax : 选取 vw 和 vh 中最大的那个

  > 建议以fpx为主，vw、vh为辅
  > 也可以使用vant等组件库中的Layout布局插件



#### 实现页面居中

  ```css
  {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ```



#### 边框阴影

  `box-shadow` 属性用于在元素的框架上添加阴影效果，该属性可设置的值包括X轴偏移、Y轴偏移、阴影模糊半径、阴影扩散半径，和阴影颜色，并以多个逗号分隔。

  ```css
  {
      /* x偏移量 | y偏移量 | 阴影颜色 */
      box-shadow: 60px -16px teal;
      /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色 */
      box-shadow: 10px 5px 5px black;
      /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
      box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
      /* 插页(阴影向内) | x偏移量 | y偏移量 | 阴影颜色 */
      box-shadow: inset 5em 1em gold;
      /* 任意数量的阴影，以逗号分隔 */
      box-shadow: 3px 3px red, -1em 0 0.4em olive;
      /* 全局关键字 */
      box-shadow: inherit;
      box-shadow: initial;
      box-shadow: unset;
  }
  ```






## Vant 的引用

#### 步骤一 通过 npm 安装

需要注意的是 **package.json** 和 **node_modules** 必须在 **miniprogram** 目录下

```bash
# 通过 npm 安装
npm i @vant/weapp -S --production

# 通过 yarn 安装
yarn add @vant/weapp --production

# 安装 0.x 版本
npm i vant-weapp -S --production
```

#### 步骤二 构建 npm 包

打开微信开发者工具，点击 **工具 -> 构建 npm**，并勾选 **使用 npm 模块** 选项，构建完成后，即可引入组件

![img](https://ftp.bmp.ovh/imgs/2020/05/ce6239e05a7d5fd8.png)

#### 步骤三 修改 tsconfig.json

​	如果你使用 typescript 开发小程序，需要在 tsconfig.json 中增加如下配置，防止 npm 构建后 tsc 编译报错

​	请将`path/to/node_modules/@vant/weapp`修改为项目中 @vant/weapp 所在的目录

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@vant/weapp/*": ["path/to/node_modules/@vant/weapp/dist/*"]
    }
  }
}
```

#### 步骤四 修改 app.json

​	将 app.json 中的 `"style": "v2"` 去除，小程序的[新版基础组件](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#style)强行加上了许多样式，难以去除，不关闭将造成部分组件样式混乱。





## Echarts的引用

#### 下载

为了兼容小程序 Canvas，我们提供了一个小程序的组件，用这种方式可以方便地使用 ECharts。

首先，下载本项目。

其中，`ec-canvas` 是我们提供的组件，其他文件是如何使用该组件的示例。

`ec-canvas` 目录下有一个 `echarts.js`，默认我们会在每次 `echarts-for-weixin` 项目发版的时候替换成最新版的 ECharts。如有必要，可以自行从 ECharts 项目中下载[最新发布版](https://github.com/ecomfe/echarts/releases)，或者从[官网自定义构建](http://echarts.baidu.com/builder.html)以减小文件大小。

#### 引入组件

微信小程序的项目创建可以参见[微信公众平台官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/quickstart/basic/getting-started.html)。

在创建项目之后，可以将下载的 [ecomfe/echarts-for-weixin](https://github.com/ecomfe/echarts-for-weixin) 项目完全替换新建的项目，然后将修改代码；或者仅拷贝 `ec-canvas` 目录到新建的项目下，然后做相应的调整。

如果采用完全替换的方式，需要将 `project.config.json` 中的 `appid` 替换成在公众平台申请的项目 id。`pages` 目录下的每个文件夹是一个页面，可以根据情况删除不需要的页面，并且在 `app.json` 中删除对应页面。

如果仅拷贝 `ec-canvas` 目录，则可以参考 `pages/bar` 目录下的几个文件的写法。下面，我们具体地说明。

#### 创建图表

首先，在 `pages/bar` 目录下新建以下几个文件：`index.js`、 `index.json`、 `index.wxml`、 `index.wxss`。并且在 `app.json` 的 `pages` 中增加 `'pages/bar/index'`。

`index.json` 配置如下：

```json
{
  "usingComponents": {
    "ec-canvas": "../../ec-canvas/ec-canvas"
  }
}
```

这一配置的作用是，允许我们在 `pages/bar/index.wxml` 中使用 `` 组件。注意路径的相对位置要写对，如果目录结构和本例相同，就应该像上面这样配置。

`index.wxml` 中，我们创建了一个 `` 组件，内容如下：

```html
<view class="container">
  <ec-canvas id="mychart-dom-bar" canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>
</view>
```

> 注意此处的 `.container`，新建小程序项目后，其中 `app.wxss` 中默认自动生成的此 class 与本 demo 中的可能不一致，导致图表不能正常显示，只显示空白。请注意参考 `app.wxss` 修改样式，保证图表的初始化的时候是有宽度和高度的。

其中 `ec` 是一个我们在 `index.js` 中定义的对象，它使得图表能够在页面加载后被初始化并设置。`index.js` 的结构如下：

```js
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);

  var option = {
    ...
  };
  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  }
});
```

这对于所有 ECharts 图表都是通用的，用户只需要修改上面 `option` 的内容，即可改变图表。`option` 的使用方法参见 [ECharts 配置项文档](http://echarts.baidu.com/option.html)。对于不熟悉 ECharts 的用户，可以参见 [5 分钟上手 ECharts](http://echarts.baidu.com/tutorial.html#5 分钟上手 ECharts) 教程。

完整的例子请参见 [ecomfe/echarts-for-weixin](https://github.com/ecomfe/echarts-for-weixin) 项目。





## APP生命周期

![img](https://ftp.bmp.ovh/imgs/2020/05/a46a83056a552172.png)





## 参考文档

+ [微信小程序发送邮件，小程序云开发使用云函数发送邮件](https://cloud.tencent.com/developer/article/1481793)
+ [微信小程序+ECharts实现动态刷新](https://blog.csdn.net/qq_40760584/article/details/80512920)

