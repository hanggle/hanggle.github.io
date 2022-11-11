---
title: Redis windows设置开启自启动
# cover为文章的首图和缩略图
# cover: http://img.blog.csdn.net/20150309140927553
# 作者信息，多作者则设置为数组
author: 
  nick: hanggle
  link: https://www.github.com/hanggle
# 如果文章为转载文章，需要多加文章出处项
#editor:
#  name: Minfive
#  link: https://www.github.com/Mrminfive
# 首页每篇文章的子标题
subtitle: Redis 是一个开源（BSD许可）的，内存中的数据结构存储系统，它可以用作数据库、缓存和消息中间件。 它支持多种类型的数据结构，如 字符串（strings）， 散列（hashes）， 列表（lists）， 集合（sets）， 有序集合（sorted sets） 与范围查询， bitmaps， hyperloglogs 和 地理空间（geospatial） 索引半径查询。 Redis 内置了 复制（replication），LUA脚本（Lua scripting）， LRU驱动事件（LRU eviction），事务（transactions） 和不同级别的 磁盘持久化（persistence）， 并通过 Redis哨兵（Sentinel）和自动 分区（Cluster）提供高可用性（high availability）。
tags: 
    - 基础
    - redis
categories: 数据库
date: 2022-9-22
---

启动命令

redis-server [redis](https://cloud.tencent.com/product/crs?from=10680).windows.conf，出现下图显示表示启动成功了。

![](https://ask.qcloudimg.com/http-save/6702670/5afdd434da88b814378e23d911a7d4dd.png?imageView2/2/w/1620)

![](https://ask.qcloudimg.com/http-save/6702670/4ce37ccd0dad20b6442bcb240a3ef363.png?imageView2/2/w/1620)

### **设置Redis服务使其开机自启**

1、由于上面虽然启动了redis，但是只要一关闭cmd窗口，redis就会消失。所以要把redis设置成windows下的服务。

也就是设置到这里，首先发现是没用这个Redis服务的。

![](https://ask.qcloudimg.com/http-save/6702670/92c42a53a40addf3fa4ca89df2e29a8a.png?imageView2/2/w/1620)

2、设置服务命令

```javascript
redis-server --service-install redis.windows-service.conf --loglevel verbose
```

复制

输入命令之后没有报错，表示成功了，刷新服务，会看到多了一个redis服务。

![](https://ask.qcloudimg.com/http-save/6702670/5af0e62e8a29b99ef774c44b6a46bc46.png?imageView2/2/w/1620)

3、常用的redis服务命令。

卸载服务：redis-server --service-uninstall

开启服务：redis-server --service-start

停止服务：redis-server --service-stop

原文地址： [Redis在windows下设置开机自启动 - 腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/1861485)
