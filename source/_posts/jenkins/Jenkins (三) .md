---
title: Jenkins使用（三）-部署war包到tomcat
cover: https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220127202146719.png
author: 
  nick: hanggle
  link: https://www.github.com/hanggle
subtitle: 是一款流行的开源持续集成（Continuous Integration）工具，广泛用于项目开发，具有自动化构建、测试和部署等功能。Jenkins 提供了数百个插件来支持构建、部署和自动化任何项目。

tags: 
    - jekins
categories: CI/CD
date: 2022-1-31
---

官方文档地址：https://www.jenkins.io/zh/doc/



#### 前置条件：

1. jenkins安装好maven
2. tomcat环境已配置好
3. 一个可以访问的git的springboot项目



#### 1. tomcat配置好用户名密码及角色

配置tomcat远程部署账号，在tomcat目录下conf文件内tomcat-users.xml 文件增加以下配置

```shell
<role rolename="manager-gui"/>
<role rolename="manager-script"/>
<user username="你定义的用户名" password="你定义的密码" roles="manager-gui,manager-script"/>
```

配置完后验证是否生效，启动tomcat后点击Manager App（webapps中应包含tomcat解压出来的manager项目）

地址/manager

![image-20220204184942041](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220204184942041.png)

输入配置的帐密，登录成功则表示设置成功。

![image-20220204185104982](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220204185104982.png)



#### 2. 新建任务

![image-20220204190256886](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220204190256886.png)

#### 3. 配置代码

![image-20220204190401086](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220204190401086.png)

![image-20220204190550468](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220204190550468.png)

#### 4. 配置代码发布位置

添加tomcat远程访问凭据（tomcat中配置的帐户密码）

![image-20220204190730855](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220204190730855.png)

![image-20220204190706350](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220204190706350.png)

![image-20220204190653473](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220204190653473.png)

#### 5.执行构建发布

![image-20220204190909109](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220204190909109.png)

#### 6. 验证发布是否成功

新发布的程序会发不到服务器的ROOT项目中。访问发布的位置

![image-20220204191102135](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220204191102135.png)

![image-20220204191001818](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220204191001818.png)
