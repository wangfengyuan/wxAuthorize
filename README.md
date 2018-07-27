微信网页授权demo
---
## 介绍
用于调用微信api获取授权用户信息的demo,用于微信网页需要授权的场景，本demo只是演示获取用户信息流程，具体使用要根据自己项目来实现，可以基于此编写一个node中间件来处理授权。其中index.js为使用ES6的async,await解决异步回调地狱问题的优化，使用ES6语法好代码清晰很多。

## 使用方法
### 1. 微信测试号申请
因为是微信授权，所以必须要在微信环境下使用，首先安装微信开发者工具，然后在[微信公众平台](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)申请接口测试号,登陆后可以查看自己的appId和appsecret信息，将JS接口安全域名修改为127.0.0.1:8800即本机地址，将体验接口权限表里的网页服务的网页授权获取用户基本信息修改为127.0.0.1:8800，最后扫码关注该测试号即可,如下图所示
![](https://github.com/wangfengyuan/wxAuthorize/raw/master/images/appId信息.PNG)

![](https://github.com/wangfengyuan/wxAuthorize/raw/master/images/修改回调页面域名.PNG)

![](https://github.com/wangfengyuan/wxAuthorize/raw/master/images/关注测试号.PNG)

### 2. 启动项目
```
npm install
node index
微信开发者工具输入： localhost:8800/login
```
### 3. 运行
<p>进入页面后点击按钮跳转到授权页面

![](https://github.com/wangfengyuan/wxAuthorize/raw/master/images/微信授权页面.PNG)<br />
点击确认登陆即可获取个人信息

![](https://github.com/wangfengyuan/wxAuthorize/raw/master/images/个人信息.PNG)</p>
