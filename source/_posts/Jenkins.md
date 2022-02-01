---

title: Jenkins安装（一）
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



官方文档地址：https://www.jenkins.io/zh/doc/

# 使用Docker安装

如果未安装docker，需先安装docker

从jenkins官方支持的docker镜像中拉取镜像(1.25.2可更新为新版本)

```
docker pull jenkinsci/blueocean:1.25.2
```



创建Jenkins映射目录，并授权

```
mkdir -p /var/jenkins_home 

chmod 777 /var/jenkins_home
```

执行下面命令启动jenkins。

* /opt/apache-maven-3.8.4:/usr/local/maven 是将宿主机maven映射到jenkins中。也可以使用jenkins自动下载的，但是速度较慢。

* /var/jenkins_home:/var/jenkins_home将宿主机的jenkins_home与镜像中的工作目录做映射。

* /var/run/docker.sock:/var/run/docker.sock `agent { docker { ... } }` 此选项是必需的

```shell
docker run --name jenkins-N4 -p 8089:8080 -p 50000:50000 \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /var/jenkins_home:/var/jenkins_home \
-v /opt/apache-maven-3.8.4:/usr/local/maven \
    -d jenkinsci/blueocean:1.25.2 
```

执行成功后输入**地址：端口号**进入登录页面。

![image-20220130201233192](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220130201233192.png)

密码：**通过/var/jenkins_home/secrets/initialAdminPassword查看**（不同版本可能会有差异）

![image-20220129234127864](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220129234127864.png)

登录成功后进入引导页，选择推荐安装插件

![image-20220129235108194](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220129235108194.png)

插件自动安装

![image-20220130203426103](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220130203426103.png)

创建用户

![image-20220130203448641](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220130203448641.png)

一步往下走

![image-20220130203535494](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220130203535494.png)

重启后进入欢迎页

![image-20220130203803457](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220130203803457.png)







# 安装测试

### 新建项目

![image-20220129234631469](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220129234631469.png)



部分版本只有一个FreeStyle Project，这种情况需要安装插件（比如：Maven Integration plugin、Pipeline)）

输入**MyPipeline**    选择**Pipeline**项目

![image-20220130091338701](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220130091338701.png)

输入脚本,保存

```
pipeline {
   agent any

   stages {
      stage('Hello') {
         steps {
            echo 'Hello World'
         }
      }
   }
}
```

点击 build now开始构建

![image-20220130205246446](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220130205246446.png)

点击 **#1**查看项目日志输出

![image-20220130204127997](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220130204127997.png)



至此，jenkins初始安装已经完成。



# 其它

## 替换插件下载地址为国内地址

```
cd /opt/jenkins_home/updates
sed -i 's/http:\/\/updates.jenkins-ci.org\/download/https:\/\/mirrors.tuna.tsinghua.edu.cn\/jenkins/g' default.json && \
sed -i 's/http:\/\/www.google.com/https:\/\/www.baidu.com/g' default.json

docker restart jenkins
```



## 时区不对可以在页面进行设置

```
System.setProperty('org.apache.commons.jelly.tags.fmt.timeZone', 'Asia/Shanghai')
```

![image-20220131150853092](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220131150853092.png)

系统管理->脚本命令行

![image-20220131151004969](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220131151004969.png)

