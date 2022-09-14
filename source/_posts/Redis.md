---
# title为文章的标题
title: Redis
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
date: 2021-11-05 08:14:31
---

# Redis基础

## Redis 是什么

Redis 是一个开源（BSD许可）的，内存中的数据结构存储系统，它可以用作数据库、缓存和消息中间件。 它支持多种类型的数据结构，如 字符串（strings）， 散列（hashes）， 列表（lists）， 集合（sets）， 有序集合（sorted sets） 与范围查询， bitmaps， hyperloglogs 和 地理空间（geospatial） 索引半径查询。 Redis 内置了 复制（replication），LUA脚本（Lua scripting）， LRU驱动事件（LRU eviction），事务（transactions） 和不同级别的 磁盘持久化（persistence）， 并通过 Redis哨兵（Sentinel）和自动 分区（Cluster）提供高可用性（high availability）。

### 与memcache区别

|             | Redis | memecache |
| ----------- | ----- | --------- |
| 数据类型        | 有     | 无         |
| 单纯存储k-v     | 相比略低  | 相比比较高     |
| 数据持久化和主从复制时 | 支持    | 不支持       |

参考 https://www.cnblogs.com/EE-NovRain/p/3268476.html

https://www.cnblogs.com/JavaBlackHole/p/7726195.html

> 没有必要过多的关注性能。由于Redis只使用单核，而Memcached可以使用多核，所以在比较上，平均每一个核上Redis在存储小数据时比Memcached性能更高。而在100k以上的数据中，Memcached性能要高于Redis，虽然Redis最近也在存储大数据的性能上进行优化，但是比起Memcached，还是稍有逊色。说了这么多，结论是，无论你使用哪一个，每秒处理请求的次数都不会成为瓶颈。
> 
> 你需要关注内存使用率。对于key-value这样简单的数据储存，memcache的内存使用率更高。如果采用hash结构，redis的内存使用率会更高。当然，这些都依赖于具体的应用场景。
> 
> 你需要关注关注数据持久化和主从复制时，只有redis拥有这两个特性。如果你的目标是构建一个缓存在升级或者重启后之前的数据不会丢失的话，那也只能选择redis。
> 
> 你应该关心你需要的操作。redis支持很多复杂的操作，甚至只考虑内存的使用情况，在一个单一操作里你常常可以做很多，而不需要将数据读取到客户端中（这样会需要很多的IO操作）。这些复杂的操作基本上和纯GET和POST操作一样快，所以你不只是需要GET/SET而是更多的操作时，redis会起很大的作用。
> 
> 对于两者的选择还是要看具体的应用场景，如果需要缓存的数据只是key-value这样简单的结构时，我在项目里还是采用memcache，它也足够的稳定可靠。如果涉及到存储，排序等一系列复杂的操作时，毫无疑问选择redis。

## Redis 为什么这么快

参考： https://segmentfault.com/a/1190000021985202

* Redis基本是内存操作，所以速度很快

* Redis通信采用非阻塞IO， 内部实现采用epolll+自己实现的简单的事件框架。epoll中的读、写、关闭、连接都转化成了事件，然后利用epoll的多路复用特性，绝不在io上浪费一点时

* 单机Redis采用单进程、单线程、单实例，避免了不必要的上下文切换和竞争条件
  
  > 可能很多人认为要想系统处理速度快不是应该使用多线程技术。但其实Redis的数据都是放在内存中，查询存储都延时都非常小，是纳秒级别的，所以如果使用多线程，就需要加锁，系统资源还需要耗费在线程之间上下文切换上面，反而会影响性能。单进程、单线程天生就保证了请求的顺序执行，不需要加锁，也没有了不必要的上下文切换，因此可以将硬件的性能发挥到极致
