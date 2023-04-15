---
title: Activity(一)
cover: https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/Snipaste_2022-09-18_23-40-48.png
author: 
  nick: hanggle
  link: https://www.github.com/hanggle
#editor:
#  name: Minfive
#  link: https://www.github.com/Mrminfive
#subtitle: docker-compose离线安装
tag:  demo
categories: demo
date: 2022-9-18
---







ProcessEngines通过activiti.cfg.xml初始化activiti表数据结构（也可以通过自定义配置文件来创建）

```java
 @Test
    public void test(){
        ProcessEngine defaultProcessEngine = ProcessEngines.getDefaultProcessEngine();
        System.out.println(defaultProcessEngine);
    }
```

![Snipaste_2022-09-18_21-40-51.png](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/Snipaste_2022-09-18_21-40-51.png)



#### 创建流程，并部署

绘制流程图

![Snipaste_2022-09-18_23-25-19.png](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/Snipaste_2022-09-18_23-25-19.png)

部署代码

```java
 @Test
    public void test1(){
        // 获取processEngine对象
        ProcessEngine defaultProcessEngine = ProcessEngines.getDefaultProcessEngine();
        RepositoryService repositoryService = defaultProcessEngine.getRepositoryService();
        Deployment deploy = repositoryService.createDeployment()
                .addClasspathResource("bpmn/qingjia.png")
                .addClasspathResource("bpmn/qingjia.bpmn20.xml")
                .name("出差申请流程").deploy();

        System.out.printf(deploy.toString());

    }
```

![Snipaste_2022-09-18_23-27-15.png](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/Snipaste_2022-09-18_23-27-15.png)


