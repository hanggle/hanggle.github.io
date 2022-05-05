---
title: VirtualBox安装虚拟机
cover: https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220505095902946.png

author: 
  nick: hanggle
  link: https://www.github.com/hanggle
subtitle: VirtualBox号称是最强的免费虚拟机软件，它不仅具有丰富的特色，而且性能也很优异。它简单易用，可虚拟的系统包括Windows（从Windows 3.1到Windows 10、Windows Server 2012，所有的Windows系统都支持）、Mac OS X、Linux、OpenBSD、Solaris、IBM OS2甚至Android等操作系统。

tags: 
    - 虚拟机
    - VirtualBox
categories: 虚拟机
date: 2022-5-2
---

## 下载Linux镜像

https://mirrors.aliyun.com/centos/7.9.2009/isos/x86_64/

https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220502235500511.png

![image-20220505095902946](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220505095902946.png)

## 新建虚拟机

控制->新建

![image-20220504235449193](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220504235449193.png)

跟着提示一步步向下走。

## 选择系统镜像

![image-20220504235821310](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220504235821310.png)

点击确定后，开始安装虚拟机，按提示步骤操作。

## 配置网络



### 配置NAT模式网络

NAT模式网络可以让虚拟机联网

![image-20220505000203065](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220505000203065.png) 



```shell
# 进入网络配置文件
cd /etc/sysconfig/network-scripts

# 配置NAT网络
vi ifcfg-enp0s3
```

```bash
OXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=dhcp
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=enp0s3
UUID=98be109d-5656-49b2-8b0b-860s008d6ab
DEVICE=enp0s3
ONBOOT=yes
```

配置完成，执行命令刷新

```shell
service network restart
```

```
# 查看当前网络
ip addr	
```

此时可以访问外网

![image-20220505001033323](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220505001033323.png)



### 配置Host-only模式网络

Host-only模式网络可以让主机访问虚拟机

![image-20220505000645685](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220505000645685.png)

```shell
# 进入配置文件目录
cd /etc/sysconfig/network-scripts

# 复制一份配置
cp ifcfg-enp0s3 ifcfg-enp0s8
```

添加配置

```sh
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
# start
BOOTPROTO=static
IPADDR=192.168.56.111
NETMASK=255.255.255.0
DNS1=114.114.114.114
gateway=192.168.56.1
#end
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=enp0s8
UUID=98be109d-5356-49b2-8b0b-860d5008d6ab
DEVICE=enp0s8
ONBOOT=yes
```

配置完成，执行命令刷新

```
service network restart

# 查看是否成功
ip addr
```



此时主机可以ping通虚拟机的ip

![image-20220505001101708](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220505001101708.png)

多台虚拟机可以 在修改ip后类似配置



### 不同虚拟机时间同步

#### 查找和设置Linux本地时区

```shell
# 查看当前时区和时间
timedatectl

# 设置时区为上海
timedatectl set-timezone "Asia/Shanghai"
# 或使用
cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# 设置时间（不推荐）
timedatectl set-time '16:10:40 2015-11-20'
```



#### 使用ntpdate同步时间

```
# 安装ntpdate
yum install -y ntpdate

# 手动同步时间
ntpdate us.pool.ntp.org

# 设置定时任务同步时间
*/10 * * * * /usr/sbin/ntpdate us.pool.ntp.org

```

