---
title: Jenkins2
cover: https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220127202146719.png
author: 
  nick: hanggle
  link: https://www.github.com/hanggle
subtitle: 是一款流行的开源持续集成（Continuous Integration）工具，广泛用于项目开发，具有自动化构建、测试和部署等功能。Jenkins 提供了数百个插件来支持构建、部署和自动化任何项目。

tags: 
    - CI/CD
categories: jekins
date: 2022-1-30
---





# Jenkins使用（二）

官方文档地址：https://www.jenkins.io/zh/doc/

默认没有Maven项目，需要新增maven插件（Maven Integration plugin），截图已安装

![image-20220130205503553](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220130205503553.png)

然后配置maven目录，此处配置的是映射到宿主机上安装的maven

![image-20220130210627803](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220130210627803.png)



![image-20220130215740141](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220130215740141.png)

安装完成后

![image-20220130205437364](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220130205437364.png)

添加源码下载凭证（使用用户名密码方式，也可以使用ssh方式）

![image-20220130210442816](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220130210442816.png)

输入用户名密码

![image-20220130210355694](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220130210355694.png)

![image-20220130220739503](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220130220739503.png)

查看控制台输出

![image-20220130220926803](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220130220926803.png)



1141未dsw
