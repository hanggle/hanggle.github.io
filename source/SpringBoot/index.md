---
title: SpringBoot
date: 2019-11-30 22:14:31
layout: SpringBoot
---


```java
@SpringBootApplication
@ComponentScan(basePackages = {"com.hanggle"})
public class Application {

	public static void main(String[] args) throws Exception {
		//第一种启动方式
		// SpringApplication.run(Application.class, args);

		//第二种启动方式自定义配置
		SpringApplication app = new SpringApplication(Application.class);
		app.setBannerMode(Banner.Mode.OFF);
		app.run(args);
	}
}

```