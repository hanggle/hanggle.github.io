---
title: openjdk:8-jre-alpine 缺少awt，font
#cover: 
author: 
  nick: hanggle
  link: https://www.github.com/hanggle
#editor:
#  name: Minfive
#  link: https://www.github.com/Mrminfive
#subtitle: docker-compose离线安装
tag:  docker
categories: docker
date: 2022-9-14
---

# openjdk:8-jre-alpine 缺少awt，font

2种解决方法：

1. 替换为oracleJDK

2. :boom:在openjdk基础镜像的基础上自己构建包含awt字体的镜像

```docker
FROM openjdk:8-jre-alpine
# Change TimeZone
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
RUN apk add --update font-adobe-100dpi ttf-dejavu fontconfig
```
