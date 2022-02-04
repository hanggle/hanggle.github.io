---
# title为文章的标题
title: HTTPS证书配置-3
# cover为文章的首图和缩略图
cover: https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20211108091304669.png
# 作者信息，多作者则设置为数组
author: 
  nick: hanggle
  link: https://www.github.com/hanggle
# 如果文章为转载文章，需要多加文章出处项
#editor:
#  name: Minfive
#  link: https://www.github.com/Mrminfive
# 首页每篇文章的子标题
subtitle: HTTPS （全称：Hyper Text Transfer Protocol over SecureSocket Layer），是以安全为目标的 HTTP 通道，在HTTP的基础上通过传输加密和[身份认证](https://baike.baidu.com/item/身份认证/5294713)保证了传输过程的安全性。
tags: 
    - https
    - tomcat
categories: server
date: 2021-07-05 21:34:31
---

# HTTPS 证书配置

HTTPS （全称：Hyper Text Transfer Protocol over SecureSocket Layer），是以安全为目标的 HTTP 通道，在HTTP的基础上通过传输加密和[身份认证](https://baike.baidu.com/item/身份认证/5294713)保证了传输过程的安全性  。HTTPS 在HTTP 的基础下加入[SSL](https://baike.baidu.com/item/SSL/320778)，HTTPS 的安全基础是 SSL，因此加密的详细内容就需要 SSL。 HTTPS 存在不同于 HTTP 的默认端口及一个加密/身份验证层（在 HTTP与 [TCP](https://baike.baidu.com/item/TCP/33012) 之间）。这个系统提供了身份验证与加密通讯方法。它被广泛用于[万维网](https://baike.baidu.com/item/万维网/215515)上安全敏感的通讯，例如交易支付等方面。





### 1、利用JDK自带的keytools生成一个p12类型的证书

```shell
keytool -genkey -storetype PKCS12 -alias tomcat -keyalg RSA -keysize 2048 -keysto
```

也可以参考 https证书配置-1 https证书配置-2 生成证书

### 2、修改conf/server.xml文件，打开如下配置

![1031555-20191205155038434-1506707704](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/1031555-20191205155038434-1506707704.png)

 certificateKeystoreFile：证书位置；certificateKeystorePassword：密码

![img](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/1031555-20191210150849466-503596145.png)

### 3、现在我们就可以使用https进行访问了

![13](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/13.png)
