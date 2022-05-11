---
title: github博客自动同步到服务器
#cover: 
author: 
  nick: hanggle
  link: https://www.github.com/hanggle
#editor:
#  name: Minfive
#  link: https://www.github.com/Mrminfive
subtitle: 博客定时任务自动同步
tag:  shell
categories: other
date: 2022-4-19 22:39:04
---

### docker创建nginx

配置nginx映射的配置和日志文件，静态网页文件路径

```
docker run -p 80:80 --name mynginx -v /home/data/nginx/html:/usr/share/nginx/html:ro -v /home/data/nginx/conf/extra/:/etc/nginx/extra -v /home/data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /home/data/nginx/logs:/var/log/nginx --privileged=true -d  nginx
```





### 创建脚本，自动拉取最新的文章

在使用目录新增 deploy.sh

```shell
#!/bin/bash
rm -rf master.zip
wget  https://github.com/hanggle/hanggle.github.io/archive/refs/heads/master.zip  –no-check-certificate
unzip master.zip
rm -rf html/*
mv hanggle.github.io-master/* ./html
```

启动Linux的**crontab**定时任务，每隔6个小时拉取一次博客

 ```
 crontab -e
 ```

打开crontab定时任务配置文件，录入

```
* */6 * * * /home/data/nginx/deploy.sh
```

