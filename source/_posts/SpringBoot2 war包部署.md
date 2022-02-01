---
# title为文章的标题
title: Spring Boot 2 实战：以 War 包的形式部署
# cover为文章的首图和缩略图
cover: https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220131153701240.png
# 作者信息，多作者则设置为数组
author: 
  nick: hanggle
  link: https://www.github.com/hanggle
# 如果文章为转载文章，需要多加文章出处项
editor:
  name: 码农小胖哥
  link: https://segmentfault.com/a/1190000020906409
# 首页每篇文章的子标题
subtitle: Spring Boot 提供了内置的 tomcat、undertow、jetty 三种 Servlet Web 容器。让我们开箱即用，可以迅速以 JAR 启动一个 Web 应用。但是在某些场景中我们可能还需要将我们的 Spring Boot 容器以 War 的形式进行传统的部署。这时我们就需要通过借助于 SpringBootServletInitializer 来实现
tags: 
    - spring boot
    - 多线程
categories: java
date: 2020-03-05
---

## 1. 前言

**Spring Boot** 提供了内置的 `tomcat`、`undertow`、`jetty` 三种 **Servlet Web** 容器。让我们开箱即用，可以迅速以 **JAR** 启动一个 **Web** 应用。但是在某些场景中我们可能还需要将我们的 **Spring Boot** 容器以 **War** 的形式进行传统的部署。这时我们就需要通过借助于 `SpringBootServletInitializer` 来实现。

## 2. SpringBootServletInitializer

`SpringBootServletInitializer` 是 `WebApplicationInitializer` 的实现，它从部署在 **Web** 容器上的传统 **WAR** 包运行 **Spring Boot** 应用。该类将 **Servlet**，**Filter** 和 **ServletContextInitializer Bean** 从应用程序上下文绑定到服务器。`SpringBootServletInitializer` 类还允许我们通过覆盖 `SpringApplicationBuilder configure(SpringApplicationBuilder application)`方法来配置由 **Servlet** 容器运行的应用程序。

## 3. Spring Boot War 部署

接下来我们来讲述详细的 **Spring Boot War** 部署步骤。

### 3.1 修改打包方式为 War

修改 **Spring Boot** 项目的 `pom.xml` 文件将打包方式修改为 `war` 。

> 默认打 `jar` 包 `<packaging>jar</packaging>` 我们改为打 `war` 包 `<packaging>war</packaging>`

### 3.2 排除 内嵌的 Web 容器。

默认使用内嵌 **Tomcat Web** 容器。如果此前你使用了内嵌的 **Jetty**、**Undertow** ，请务必清除相关的 **Starter** 依赖。然后我们可以使用两种方式来处理：

- 方法一

**Spring Boot** 内嵌的`Tomcat`默认已经集成在`spring-boot-starter-web`包里，所以我们要排除掉它。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

此方式我们把 **Servlet Api** 依赖也排除掉了, `SpringBootServletInitializer` 需要依赖 **Servlet Api** ，因此我们要加上它（**务必注意 versionNumber 版本要跟你外置的 Tomcat 版本兼容**）。

```xml
<dependency>
     <groupId>javax.servlet</groupId>
     <artifactId>javax.servlet-api</artifactId>
     <version>${versionNumber}</version>
     <scope>provided</scope>
</dependency>
```

- 方法二

我们通过引入 `spring-boot-starter-tomcat` 覆盖掉默认的内置 **Tomcat** 并设置作用范围（`scope`）是`provided`(编译、测试)。

```xml
     <dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-tomcat</artifactId>
  <scope>provided</scope>
     </dependency>                      
```

### 3.3 实现 SpringBootServletInitializer 接口

新建 `SpringBootServletInitializer` 的实现类 `ServletInitializer` 如下：

```java
 package cn.felord.war;
 
 import org.springframework.boot.builder.SpringApplicationBuilder;
 import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
 
 /**
  * @author Felordcn
  */
 public class ServletInitializer extends SpringBootServletInitializer {
 
     @Override
     protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
 
         return application.sources(WarSpringBootApplication.class);
     }
 
 }
```

其中 `WarSpringBootApplication` 是 **Spring Boot** 的入口类，跟原来没什么两样：

```java
 package cn.felord.war;
 
 import org.springframework.boot.SpringApplication;
 import org.springframework.boot.autoconfigure.SpringBootApplication;
 
 /**
  * @author Felordcn
  */
 @SpringBootApplication
 public class WarSpringBootApplication {
 
     public static void main(String[] args) {
         SpringApplication.run(WarSpringBootApplication.class, args);
     }
 
 }
```

### 3.4 编译打包

通过 maven 命令 `mvn clean package` 执行编译，稍等片刻，就会获得 `${artifactId}-${version}.war` ，然后你就可以以传统的 War 部署方式运行 **Spring Boot** 应用了。

## 4. 总结

总体来说 War 部署 **Spring Boot** 的方式也并不复杂。如果还有疑惑可参考 **DEMO** ,**DEMO** 可通过关注公众号：**Felordcn** 回复 **war** 来获取。
