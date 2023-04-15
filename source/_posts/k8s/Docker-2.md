---
# title为文章的标题
title: Docker基本操作
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
date: 2019-05-03 22:14:31
---



查看docker对象的底层基础信息

```shell
# 语法
docker inspect [OPTIONS] NAME|ID [NAME|ID...]

# 查看container容器信息(或者使用容器id)
docker inspect container

# 查看目录挂载信息
docker inspect --format="{{json .Mounts}}"  container
```



#### 查看docker所有镜像

```
docker images
```



#### 镜像镜像加速

修改 `/etc/docker/daemon.json`, 改为需要加速的仓库，建议使用阿里云镜像加速,比如：

```json
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://av57nxi9.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

然后重启doker

```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```



#### 查看容器日志

可以不加 -f  

```
docker logs -f 4871c4b47f83
```

进入容器内部

```
docker exec -it redis /bin/bash
```

退出容器

```
ctrl+D
```



#### nginx

拉取镜像

```
docker pull nginx
```

运行nginx

```
docker run --name some-nginx -d -p 8080:80 nginx
```

> docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
>
> --name: 生成的容器名字
>
> -d： 后台运行
>
> -p：映射端口（映射外部端口：容器内端口）

运行docker并修改静态文件目录

```shell
docker run -p 8081:80 --name mynginx -v /home/oskyhang/config/nginx/html:/usr/share/nginx/html:ro --privileged=true -d  nginx
```

> --privileged=true : centos7中安全模块selinux把权限禁掉了，加上此命令可以开启访问权限，不然会替换失败

```shell
docker run -p 80:80 --name mynginx -v /home/data/nginx/html:/usr/share/nginx/html:ro -v /home/data/nginx/conf/extra/:/etc/nginx/extra -v /home/data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /home/data/nginx/logs:/var/log/nginx --privileged=true -d  nginx
```



#### 删除image

先rm正在运行或停止的container，然后再remove镜像,否则会出现下面的异常

```
Error response from daemon: conflict: unable to delete fce289e99eb9 (must be forced) - image is being used by stopped container 0fcb6b830ca2
```

> [root@localhost ~]# docker images
> REPOSITORY              TAG                 IMAGE ID            CREATED             SIZE
> docker.io/hello-world   latest              fce289e99eb9        10 days ago         1.84 kB
> docker.io/nginx         latest              7042885a156a        13 days ago         109 MB
>
> [root@localhost ~]# docker ps -a
> CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                      PORTS               NAMES
> 4e83ea93731a        hello-world         "/hello"            35 seconds ago      Exited (0) 35 seconds ago                       hungry_volhard
> 0fcb6b830ca2        hello-world         "/hello"            17 minutes ago      Exited (0) 17 minutes ago                       thirsty_pasteur
>
> [root@localhost ~]# docker rm 4e83ea93731a
> 4e83ea93731a
> [root@localhost ~]# docker rm 0fcb6b830ca2
> 0fcb6b830ca2
>
> [root@localhost ~]# docker rmi fce289e99eb9
> Untagged: docker.io/hello-world:latest
> Untagged: docker.io/hello-world@sha256:2557e3c07ed1e38f26e389462d03ed943586f744621577a99efb77324b0fe535
> Deleted: sha256:fce289e99eb9bca977dae136fbe2a82b6b7d4c372474c9235adc1741675f587e
> Deleted: sha256:af0b15c8625bb1938f1d7b17081031f649fd14e6b233688eea3c5483994a66a3

#### 创建mysql镜像

```
docker create --name mymysql -v /data/mysql-data:/var/lib/mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root
mymysql:5.6
```

#### docker的好处

1. 节约资源
2. 镜像打包后，在其他环境运行不会出现异常
