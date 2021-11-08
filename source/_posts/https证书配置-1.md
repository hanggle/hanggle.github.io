---
# title为文章的标题
title: HTTPS证书配置-1
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
categories: java
date: 2021-07-05 21:14:31
---

# HTTPS 证书生成

HTTPS （全称：Hyper Text Transfer Protocol over SecureSocket Layer），是以安全为目标的 HTTP 通道，在HTTP的基础上通过传输加密和[身份认证](https://baike.baidu.com/item/身份认证/5294713)保证了传输过程的安全性  。HTTPS 在HTTP 的基础下加入[SSL](https://baike.baidu.com/item/SSL/320778)，HTTPS 的安全基础是 SSL，因此加密的详细内容就需要 SSL。 HTTPS 存在不同于 HTTP 的默认端口及一个加密/身份验证层（在 HTTP与 [TCP](https://baike.baidu.com/item/TCP/33012) 之间）。这个系统提供了身份验证与加密通讯方法。它被广泛用于[万维网](https://baike.baidu.com/item/万维网/215515)上安全敏感的通讯，例如交易支付等方面。

### Openssl生成自签名证书

通过openssl生成私钥

```shell
openssl genrsa -out server.key 1024
```

根据私钥生成证书申请文件csr

```shell
openssl req -new -key server.key -out server.csr
```

这里根据命令行向导来进行信息输入：

![1](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/1.png)



ps.Common Name可以输入：*.yourdomain.com，这种方式生成通配符域名证书 使用私钥对证书申请进行签名从而生成证书 

```shell
openssl x509 -req -in server.csr -out server.crt -signkey server
```

这样就生成了有效期为：10年的证书文件，对于自己内网服务使用足够







