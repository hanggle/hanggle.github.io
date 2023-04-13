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

自动提交到github的shell脚本，解决github访问不稳定，频繁出现无法提交的问题。

```shell
#!/bin/bash
echo "请输入->
1： hanggle.github.io
2： qg"

#读取控制台输入一个 item 值，在 10 秒内输,不输入自动向下执行
read -t 10 -p  "请选择同步的项目 = " item

path="D:\\MySpace\\hanggle.github.io"
case $item in
	1 )
		path='D:\\MySpace\\hanggle.github.io' ;;
	2 )
		path='D:\MySpace\qg' ;;
	*)
		echo "默认选择 hanggle.github.io "
esac

echo "path:${path} "
cd ${path}
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

