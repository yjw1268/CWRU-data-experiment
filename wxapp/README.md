# 轴承故障预测 第十组



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

+ **miniprogram**

  + **dist**

    存放了本项目使用的组件库：Vant Weapp

    > Vant Weapp 是移动端 Vue 组件库 [Vant](https://github.com/youzan/vant) 的小程序版本，两者基于相同的视觉规范，提供一致的 API 接口，助力开发者快速搭建小程序应用。

  + **ec-canvas**

    存放了本项目使用的图表组件库：[ECharts](https://github.com/ecomfe/echarts-for-weixin)

  + **pages**

    存放了本项目的界面文件

    + **index：**小程序主页相关代码
    + **info：**小程序数据页相关代码
    + **stars：**小程序收藏夹相关代码

+ **cloudfunctions**

  + **sendEmail**

    使用node.js的nodemailer类库实现工单邮件的发送

## 参考文档

+ [微信小程序发送邮件，小程序云开发使用云函数发送邮件](https://cloud.tencent.com/developer/article/1481793)
+ [微信小程序+ECharts实现动态刷新](https://blog.csdn.net/qq_40760584/article/details/80512920)

