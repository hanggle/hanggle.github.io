---
title: Jenkins
cover: https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220127202146719.png
author: 
  nick: hanggle
  link: https://www.github.com/hanggle
subtitle: 是一款流行的开源持续集成（Continuous Integration）工具，广泛用于项目开发，具有自动化构建、测试和部署等功能。Jenkins 提供了数百个插件来支持构建、部署和自动化任何项目。

tags: 
    - CI/CD
categories: jekins
date: 2022-1-27 20:22:34
---





# Jenkins安装（一）

官方文档地址：https://www.jenkins.io/zh/doc/

# 使用Docker安装

如果未安装docker，需先安装docker

从jenkins官方支持的docker镜像中拉取镜像

```
docker pull jenkins/jenkins:lts-jdk11 ？？？
```

执行下面命令启动jenkins。

* /opt/apache-maven-3.8.4:/usr/local/maven 是将宿主机maven映射到jenkins中。也可以使用jenkins自动下载的，但是速度较慢。

* /var/jenkins_home:/var/jenkins_home将宿主机的jenkins_home与镜像中的工作目录做映射。

* /var/run/docker.sock:/var/run/docker.sock `agent { docker { ... } }` 此选项是必需的

```shell
docker run --name jenkins -N -p 8088:8080 -p 50000:50000 \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /var/jenkins_home:/var/jenkins_home \
	-v /opt/apache-maven-3.8.4:/usr/local/maven \
    -d jenkins/jenkins:lts-jdk11 
```

执行成功后输入**地址：端口号**进入登录页面。

![image-20220129233259826](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220129233259826.png)

默认用户名： admin

密码：**通过/var/jenkins_home/secrets/initialAdminPassword查看**（不同版本可能会有差异）

![image-20220129234127864](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220129234127864.png)

登录成功后进入引导页，选择推荐安装插件

![image-20220129235108194](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220129235108194.png)



首页，初始时是没有项目的

![image-20220129234606146](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220129234606146.png)







# 新建项目

![image-20220129234631469](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220129234631469.png)



部分版本只有一个FreeStyle Project，这种情况需要安装插件（比如：Maven Integration plugin、Pipeline)）



## 常用的三种构建项目类型：

* 自由风格软件项目（FreeStyle Project）
* Maven项目（Maven  Project）
* 流水线项目（Pipeline Project）

### 自由风格项目构建







插件安装



权限管理插件

>  Role-based Authorization Strategy





# 
