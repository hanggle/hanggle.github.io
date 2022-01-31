---
# title为文章的标题
title: git自动提交到github
# cover为文章的首图和缩略图
cover: https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/git.png
# 作者信息，多作者则设置为数组
author: 
  nick: hanggle
  link: https://www.github.com/hanggle
# 如果文章为转载文章，需要多加文章出处项
#editor:
#  name: Minfive
#  link: https://www.github.com/Mrminfive
# 首页每篇文章的子标题
subtitle: 自动提交到github，解决github访问不稳定，频繁出现无法提交的问题。
tags: 
    - git
    - shell
categories: git
date: 2022-1-31
---

# git自动提交到github

自动提交到github的shell脚本，解决github访问不稳定，频繁出现无法提交的问题。

```shell
#!/bin/bash
cd D:\\MySpace\\hanggle.github.io
git add .
#写个sleep 2s 是为了解决并发导致卡壳
sleep 2s
echo "####### 添加文件 #######"
 
git commit -m "update"
 
echo "####### commit #######"
 
sleep 1s
 
echo "####### 开始推送 #######"

times=1 
while :
do 
	if git push
	then
	  echo "####### 推送成功 #######"
	  break
	else
	  echo "第$times次push失败, 正在重试......"
	  let times++	
	  sleep 5s
	fi
done

sleep 10s
```

