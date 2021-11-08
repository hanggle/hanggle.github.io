---
# title为文章的标题
title: HTTPS证书配置-2
# cover为文章的首图和缩略图
cover: https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20211108091304669.png
# 作者信息，多作者则设置为数组
author: 
  nick: hanggle
  link: https://www.github.com/hanggle
# 如果文章为转载文章，需要多加文章出处项
#editor:
#  name: Minfive
#  link: https://www.github.com/Mrminfive
# 首页每篇文章的子标题
subtitle: HTTPS （全称：Hyper Text Transfer Protocol over SecureSocket Layer），是以安全为目标的 HTTP 通道，在HTTP的基础上通过传输加密和[身份认证](https://baike.baidu.com/item/身份认证/5294713)保证了传输过程的安全性。
tags: 
    - https
    - tomcat
categories: java
date: 2021-07-05 21:14:31
---

# HTTPS 证书转换 crt key jks pkcs12

HTTPS （全称：Hyper Text Transfer Protocol over SecureSocket Layer），是以安全为目标的 HTTP 通道，在HTTP的基础上通过传输加密和[身份认证](https://baike.baidu.com/item/身份认证/5294713)保证了传输过程的安全性  。HTTPS 在HTTP 的基础下加入[SSL](https://baike.baidu.com/item/SSL/320778)，HTTPS 的安全基础是 SSL，因此加密的详细内容就需要 SSL。 HTTPS 存在不同于 HTTP 的默认端口及一个加密/身份验证层（在 HTTP与 [TCP](https://baike.baidu.com/item/TCP/33012) 之间）。这个系统提供了身份验证与加密通讯方法。它被广泛用于[万维网](https://baike.baidu.com/item/万维网/215515)上安全敏感的通讯，例如交易支付等方面。



1.crt、key和jks之间的转换

```
##.crt和.key转换.jks （tomcat server.xml）
openssl pkcs12 -export -in  server.crt -inkey  server.key > server.p12
[mykey]
keytool -importkeystore -keyalg EC -srckeystore server.p12 -destkeystore server.jks -srcstoretype pkcs12
[mykey]

##.jks转换.crt和.key
1. 从JKS转换到PKCS12keytool
keytool -importkeystore -srckeystore D:\server.jks -destkeystore D:\keystore.p12 -srcstoretype JKS -deststoretype PKCS12 -srcstorepass [mykey] -deststorepass [mykey] -srcalias 1 -destalias 1 -srckeypass [mykey] -destkeypass [mykey] –noprompt
 
2.从PKCS12转换成PEM格式openssl pkcs12 (openssl要在linux上使用）
openssl pkcs12 -in D:\keystore.p12 -out D:\server.pem -passin pass:[mykey] -passout pass:[mykey]
 
3. 提取证书
openssl pkcs12 -in keystore.p12 -nokeys -clcerts -out server-ssl.crt
openssl pkcs12 -in keystore.p12 -nokeys -cacerts -out gs_intermediate_ca.crt
Enter Import Password:[mykey]
server-ssl.crt是SSL证书,gs_intermediate_ca.crt是中级证书,两个合并到一起才是nginx服务器所需要的证书
合并证书: cat server-ssl.crt gs_intermediate_ca.crt >server.crt
此时server.crt是一个完成的证书。
4. 提取私钥
openssl pkcs12 -in keystore.p12 -nocerts -nodes -out server.key
Enter Import Password:[mykey]
```



 2.crt、key和p12之间的转换

```
##.crt和.key合成.p12
1.先将证书链文件放到证书文件后面：
cat server-ssl.crt gs_intermediate_ca.crt >server.crt
2.用合成后的crt和key转换成PFX格式(.p12)的证书文件
openssl pkcs12 -export -in  server.crt -inkey  server.key  > server.p12
key  [mykey]
 
 
#验证：测试解开后的文件和合成前的文件一一对应：
##.p12解开成.crt和.key
 
##分离出普通PRIVATE KEY
1.分离出ssl证书
openssl pkcs12 -in server.p12 -nokeys -clcerts -out server-ssl.crt
2.分离出证书链
openssl pkcs12 -in server.p12 -nokeys -cacerts -out gs_intermediate_ca.crt
3.分离出.key
openssl pkcs12 -in server.p12 -nocerts -nodes -out server.key 
 
##分离出RSA PRIVATE KEY
1.先转换成pem(里面包含证书、证书链和PRIVATE KEY)
openssl pkcs12 -in server.p12 -nodes -out server.pem
2.pem分离出证书
openssl x509 -in server.pem -out server.crt
3.pem分离出RSA key
openssl rsa -in server.pem -out server.key
writing RSA key
 
md5验证:得出的字符串相同则crt和key是配对的
openssl x509 -noout -modulus -in server.crt | openssl md5
openssl rsa -noout -modulus -in server.key | openssl md5 
```



