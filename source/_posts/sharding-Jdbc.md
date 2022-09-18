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

Apache ShardingSphere 由 JDBC、Proxy 和 Sidecar（规划中）这 3 款既能够独立部署，又支持混合部署配合使用的产品组成。 它们均提供标准化的基于数据库作为存储节点的增量功能，可适用于如 Java 同构、异构语言、云原生等各种多样化的应用场景。

ShardingSphere-JDBC 定位为轻量级 Java 框架，在 Java 的 JDBC 层提供的额外服务。 它使用客户端直连数据库，以 jar 包形式提供服务，无需额外部署和依赖，可理解为增强版的 JDBC 驱动，完全兼容 JDBC 和各种 ORM 框架。

- 适用于任何基于 JDBC 的 ORM 框架，如：JPA, Hibernate, Mybatis, Spring JDBC Template 或直接使用 JDBC；
- 支持任何第三方的数据库连接池，如：DBCP, C3P0, BoneCP, HikariCP 等；
- 支持任意实现 JDBC 规范的数据库，目前支持 MySQL，PostgreSQL，Oracle，SQLServer 以及任何可使用 JDBC 访问的数据库。

![Snipaste_2022-09-12_22-35-03.png](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/Snipaste_2022-09-12_22-35-03.png)



## 使用demo

```xml
<dependency>
    <groupId>org.apache.shardingsphere</groupId>
    <artifactId>shardingsphere-jdbc-core</artifactId>
    <version>最新版本号</version>
</dependency>
```

此处使用**5.1.0**

ShardingSphere-JDBC 可以通过 `Java`，`YAML`，`Spring 命名空间`和 `Spring Boot Starter` 这 4 种方式进行配置
