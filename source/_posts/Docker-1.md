---
# title为文章的标题
title: Docker基础
# cover为文章的首图和缩略图
cover: https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20211107232458797.png
# 作者信息，多作者则设置为数组
author: 
  nick: hanggle
  link: https://www.github.com/hanggle
# 如果文章为转载文章，需要多加文章出处项
#editor:
#  name: Minfive
#  link: https://www.github.com/Mrminfive
# 首页每篇文章的子标题
subtitle: Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。
tag: docker
categories: CI/CD
date: 2019-05-03 22:14:31##
---

## Docker

#### Docker 是什么

Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口。

**镜像**是一种轻量级、可执行的独立软件包，它包含运行某个软件所需的所有内容，包括代码、运行时、库、环境变量和配置文件。

**容器**是镜像的运行时实例 - 实际执行时镜像会在内存中变成什么。默认情况下，它完全独立于主机环境运行，仅在配置为访问主机文件和端口的情况下才执行此操作。镜像（`Image`）和容器（`Container`）的关系，就像是面向对象程序设计中的 `类` 和 `实例` 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。容器不应该向其存储层内写入任何数据，容器存储层要保持无状态化。所有的文件写入操作，都应该使用 [数据卷（Volume）]()、或者 [绑定宿主目录]()，在这些位置的读写会跳过容器存储层，直接对宿主（或网络存储）发生读写，其性能和稳定性更高。

![image-20200129095715589](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/docker-1.png)



#### Docker和虚拟机比较

![image-20200129095942662](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/docker-3.png)

![image-20200129095959223](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/docker-4.png)



#### 架构

![image-20200129095833450](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/docker-2.png)

- Docker Damon：dockerd，用来监听 Docker API 的请求和管理 Docker 对象，比如镜像、容器、网络和 Volume。
- Docker Client：docker，docker client 是我们和 Docker 进行交互的最主要的方式方法，比如我们可以通过 docker run 命令来运行一个容器，然后我们的这个 client 会把命令发送给上面的 Dockerd，让他来做真正事情。
- Docker Registry：用来存储 Docker 镜像的仓库，Docker Hub 是 Docker 官方提供的一个公共仓库，而且 Docker 默认也是从 Docker Hub 上查找镜像的，当然你也可以很方便的运行一个私有仓库，当我们使用 docker pull 或者 docker run 命令时，就会从我们配置的 Docker 镜像仓库中去拉取镜像，使用 docker push 命令时，会将我们构建的镜像推送到对应的镜像仓库中。
- Images：镜像，镜像是一个只读模板，带有创建 Docker 容器的说明，一般来说的，镜像会基于另外的一些基础镜像并加上一些额外的自定义功能。比如，你可以构建一个基于 Centos 的镜像，然后在这个基础镜像上面安装一个 Nginx 服务器，这样就可以构成一个属于我们自己的镜像了。
- Containers：容器，容器是一个镜像的可运行的实例，可以使用 Docker REST API 或者 CLI 来操作容器，容器的实质是进程，但与直接在宿主执行的进程不同，容器进程运行于属于自己的独立的[命名空间](https://en.wikipedia.org/wiki/Linux_namespaces)。因此容器可以拥有自己的 **root 文件系统、自己的网络配置、自己的进程空间，甚至自己的用户 ID 空间**。容器内的进程是运行在一个隔离的环境里，使用起来，就好像是在一个独立于宿主的系统下操作一样。这种特性使得容器封装的应用比直接在宿主运行更加安全。
- 底层技术支持：Namespaces（做隔离）、CGroups（做资源限制）、UnionFS（镜像和容器的分层） the-underlying-technology Docker 底层架构分析



#### docker 基本命令


docker安装

```
yum install docker-ce
```

查看docker版本

```
docker version
```

查看docker信息

```
docker info
```

docker安装成功测试

```
docker run hello-world
```

启动docker服务

```shell
sudo systemctl start docker
```

docker采用C/S的模式

Docker镜像：Docker镜像运行后变成容器

Docker Registry: Registry是Docker镜像的中央仓库

#### 设置docker开机自动启动

```shell
systemctl enable docker
```



#### docker的好处

1. 高效的利用资源

   > docker不需要虚拟硬件以及运行完整的操作系统

2. 一致的运行环境

   >  镜像打包后，在其他环境运行不会出现异常

3. 更快的启动时间

   > 相比传统的虚拟机, docker启动速度跟怪,节约了开发测试部署的时间

4. 持续交付和部署

   > 

5. 更轻松的迁移

2. 
