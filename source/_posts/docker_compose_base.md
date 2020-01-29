---
title: docker-compose 安装
cover: https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/docker-compose.png
author: 
  nick: hanggle
  link: https://www.github.com/hanggle
#editor:
#  name: Minfive
#  link: https://www.github.com/Mrminfive
subtitle: docker-compose离线安装
tag:  docker
categories: docker
date: 2019-12-05 22:14:31
---

#  docker-compose 
##  docker-compose 安装

1. 下载安装包

   下载地址：[https://github.com/docker/compose/releases](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fdocker%2Fcompose%2Freleases)

2. 上传centos

3. 在上传的目录执行

   ```shell
   mv  docker-compose-Linux-x86_64  /usr/local/bin/docker-compose
   ```

4. 验证是否安装成功

   ```shell
   docker-compose --version
   ```

   正确打印版本号，则安装成功