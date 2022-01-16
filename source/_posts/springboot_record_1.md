---
title: spring boot 扫描不到自定义Controller
# cover: http://img.blog.csdn.net/20150309140927553
author: 
  nick: hanggle
  link: https://www.github.com/hanggle
#editor:
#  name: Minfive
#  link: https://www.github.com/Mrminfive
subtitle: spring boot 扫描不到自定义Controller
tags: 
    - Spring
    - SpringBoot
categories: SpringBoot
date: 2017-04-09 01:034:31
---

在springboot官网照着给的介绍写了个springboot程序

pom.xml

```
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>1.5.2.RELEASE</version>
</parent>
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```


java文件

```
package hello;

import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

@Controller
@EnableAutoConfiguration
public class Application{

    @RequestMapping("/")
    @ResponseBody
    String home() {
        return "Hello World!";
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(SampleController.class, args);
    }
}
```

然后自己写了个Controller
![1](https://images2015.cnblogs.com/blog/997786/201704/997786-20170409005618644-1487234010.png)

但是无论如何也无法扫描到自己定义的Controller（如果用的是idea，能明显看出来，如果扫描到会有的图标）。访问结果结果如下：



报错的原因是找不到对应的映射路径，即Controller没有被扫描到 ，。

郁闷至极，到晚上搜的结果说的是LoginController 方的位置不对，应该让启动类和Controller的包在同一级目录下，然而对我却没有效果。

**官方建议application.java放的位置**：
![2](https://images2015.cnblogs.com/blog/997786/201704/997786-20170409005618644-1487234010.png)


最后尝试了下修改下Application上的注解，我本来复制官方的代码用的是@Controller和@EnableAutoConfiguration，试着换成了**@SpringBootApplication** 注解，出乎意外的可以扫描到Controller 
![3](https://images2015.cnblogs.com/blog/997786/201704/997786-20170409005618644-1487234010.png)

![4](https://images2015.cnblogs.com/blog/997786/201704/997786-20170409005618644-1487234010.png)

![5](https://images2015.cnblogs.com/blog/997786/201704/997786-20170409005618644-1487234010.png)

 

又查了下官方的文档终于找到原因了，原因是：

> 如果使用@Controller和@EnableAutoConfiguration 注解还应该再加上一个注解：@ComponentScan  就可以了。@Controller和@EnableAutoConfiguration没>有扫描注解的功能，而@ComponentScan是
> springboot专门用来扫描@Component, @Service, @Repository, @Controller等注解的注解

 

**总结：**

使用springboot启动类配置扫描的两种注解配置方式：

1、@Controller

　  @EnableAutoConfiguration

　  @ComponentScan

2、@SpringBootApplication

@SpringBootApplication注解等价于@Configuration, @EnableAutoConfiguration and @ComponentScan

 

另外application.java（启动类）也应该按照官方的建议放在root目录下，这样才能扫描到Service和dao，不然还会引起，扫描不到注解的问题。

**--- 更新日期：2018-10-14 ---**

最近用了最新的springboot 2.0.5.RELEASE 版本 多了一种新的扫描注解，新版的springboot application可以放在任意位置，只要加上

```
@ComponentScan(basePackages = {"com.oskyhang", "com.frames"})
```

注解就可以，注解指定扫描的包，就可以扫描到，更灵活方便。