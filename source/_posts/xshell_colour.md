---
# title为文章的标题
title: xshell 主题及命令行配色(centos 7)
# cover为文章的首图和缩略图
cover: https://hanggle.github.io/img/image-20211107230248331.png
# 作者信息，多作者则设置为数组
author: 
  nick: hanggleW
  link: https://www.github.com/hanggle
# 如果文章为转载文章，需要多加文章出处项
#editor:
#  name: Minfive
#  link: https://www.github.com/Mrminfive
# 首页每篇文章的子标题
subtitle: 舒适的配色方案更有利于我们敲命令，当然逼格更高:)
tags: 
    - 工具
    - shell
categories: linux
date: 2020-01-05 22:14:31
---

## 主题导入
主题下载地址

https://files.cnblogs.com/files/oskyhg/skycolor.zip



![image-20211107230248331](https://hanggle.github.io/img/image-20211107230248331.png)

导入主题

![997786-20200105131513995-1519160410](https://hanggle.github.io/img/997786-20200105131513995-1519160410.png)

## Linux 的 PS1设置
（1）临时方案：
命令行直接运行： 

```shell
PS1='[\[\e[37;40m\]\u@\h \w]$ \[\e[0m\]'
```

（2）永久方案（需要修改主机配置，生产环境或容器中不建议修改）

编辑.bashrc文件
```shell
vi /root/.bashrc
```

然后运行命令
```shell
PS1='[\[\e[37;40m\]\u@\h \w]$ \[\e[0m\]'
```

效果如下

![1547310588473](https://hanggle.github.io/img/997786-20200105125838067-673369601.png)


 备注：配色PS1相关参数配置及含义请自行google



