---
title: Sharding-Jdbc
cover: https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/Snipaste_2022-09-14_22-24-42.png
author: 
  nick: hanggle
  link: https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/Snipaste_2022-09-14_22-24-42.png

tag: java
categories: java
date: 2022-9-12
---

# Sharding-Jdbc

ShardingSphere-JDBC 定位为轻量级 Java 框架，在 Java 的 JDBC 层提供的额外服务。 它使用客户端直连数据库，以 jar 包形式提供服务，无需额外部署和依赖，可理解为增强版的 JDBC 驱动，完全兼容 JDBC 和各种 ORM 框架。

- 适用于任何基于 JDBC 的 ORM 框架，如：JPA, Hibernate, Mybatis, Spring JDBC Template 或直接使用 JDBC；
- 支持任何第三方的数据库连接池，如：DBCP, C3P0, BoneCP, HikariCP 等；
- 支持任意实现 JDBC 规范的数据库，目前支持 MySQL，PostgreSQL，Oracle，SQLServer 以及任何可使用 JDBC 访问的数据库。

![Snipaste_2022-09-12_22-35-03.png](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/Snipaste_2022-09-12_22-35-03.png)
