---
title: MongoDB(一)
cover: https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/mongobd.png
author: 
  nick: hanggle
  link: https://www.github.com/hanggle
#editor:
#  name: Minfive
#  link: https://www.github.com/Mrminfive
subtitle: MogoDB是一款强大、灵活且易于拓展的通用型数据库。
tags: 
    - 数据库
    - mongodb
categories: 数据库
date: 2019-10-05 22:14:31
---

# MongoDB

### 1.简介

##### 概念

| No  | 关系型数据库 | NoSQL数据库       |
| --- | ------ | -------------- |
| 1   | 数据库    | 数据库（类似MySQL）   |
| 2   | 表      | 集合             |
| 3   | 行      | 文档             |
| 4   | 列      | 成员             |
| 5   | 主键     | ObjectID(自动维护) |

MogoDB是一款强大、灵活且易于拓展的通用型数据库。它能拓展出非常多的功能，比如二级索引、返回查询、排序、聚合，以及地理空间索引。

##### 1.1 易于使用

MongoDB是一个面向文档的数据库，不是关系型数据库。文档中的键和值不再是固定的类型和大小。

##### 1.2 易于拓展

业务数据增长到一定程度时需要拓展数据库，有两种方式可以进行拓展：

1. 纵向扩展。使用性能更强的机器
2. 横向扩展。将数据分区到不同的机器上

​    MongoDB采用横向拓展的方式。面向文档的数据模型使它很容易在多台服务器之间进行数据分割。MongoDB能够自动处理跨集群的数据和负载，自动重新分配文档，以及将用户请求分配到正确的机器上。

##### 1.3 功能丰富

MongoDB具有以下功能：

- 索引
  
  MongoDB支持二级索引，允许多种快速查询，提供唯一索引、复合索引、地理空间索引，以及全文索引。

- 聚合
  
  MongoDB支持“聚合管道”。用户能够通过简单的片段创建复杂的聚合，并通过数据库自动优化。

- 特殊的集合类型
  
  MongoDB支持存在时间有限的集合，适用于那些将在某个时刻国企的数据，如会话（session）。MongoDB也支持固定大小的集合，用于保存近期数据，如日志。

- 文件存储
  
  MongoDB支持一种非常易用的协议，用于存储大文件和文件元数据。

  MongoDB不具备一些关系型数据库很普遍的功能，如连接和复杂多行事务。

##### 1.4 卓越的性能

​    MongoDB的一个主要目标是提供卓越的性能。MongoDB能对文档动态填充，也能预分配数据文件以利用额外的空间换区稳定的性能。MongoDB把尽可能多的内存用作缓存，试图为每次查询自动选择正确的索引。

### MongoDB 安装

1. 下载

2. 配置MongoDB环境变量
   
   D:\devTools\MongoDB\Server\4.0\bin

3. 配置文件存储路径
   
    安装目录下新建一个data目录

4. 修改配置信息
   
   D:\devTools\MongoDB 目录下建立mongodb.conf
   
   > dbpath=

### 2. MongoDB基础知识

##### 2.1 文档

**文档**是MongoDB的核心概念。文档就是键值对的一个有序集。比如

```json
{"greeting": "hello world!"}
```

这个文档只有一个键“greeting，其对应的值为”hello world! "。

文档的键是字符串。除了少数例外情况，键可以使用任意UTF-8字符。

- 键不能含有\0 （空字符）。这个字符用于表示键的结尾。
- .和$具有特殊意义，只能在特定的环境下使用。这两个字符被保留，不能使用。

**MongoDB不区分类型，但区分大小写**。

```json
{"foo": 3}和{"foo":"3"}是相同的
{"foo":3}和{"Foo":3}是不同的
```

**MongoDB中不能有重复的键**。

##### 2.2 集合

集合是**动态模式**的。这意味着集合里面的文档可以是各式各样的。下面两个文档可以放在同一个集合里：

```json
{"greeting": "hello, world!"}
{"foo": 5}
```

文档里面的值的类型可以不同，键的类型也可以不同

那为什么还要使用多个集合呢？

- 不同的文档放在同一个集合不利于管理。返回数据时类型混乱等。
- 同种类型放在一个集合里，数据更加集中，比混合在一个集合查询更快。
- 创建索引时，索引是按照集合类型来定义的。

##### 2.3 命名

集合使用名称进行标识。集合名需要满足下列条件任意的UTF-8字符串。

- 集合名不能是空字符串（""）。
- 集合名不能不能包含\0(空字符)，这个字符标识集合名的结束。
- 集合名不能以“system.”开头，这是为系统集合保留的前缀
- 用户创建的集合不能再集合名中包含保留字‘$’。因为某些系统生成的集合中包含$。

**子集合**

组织集合的一种惯例是使用“.”分割不同命名空间的子集合。例如一个具有博客功能的应用可能包含两个集合，分别是blog.posts和blog.authors。这是为了使组织结构更清晰，这里的blog集合跟他的子集合是没有任何关系的。

##### 2.4 数据库

MongoDB中，多个文档组成集合，而多个集合可以组成数据库。一个MongoDB可以承载多个数据库，每个数据库拥有0个或多个集合。每个数据库都有独立的权限。

数据库名需满足以下任意UTF-8的字符串

- 不能是空字符串（""）
- 不能包含 / \ . " * < > : | ? $  \0 .只是用字母和数字
- 数据库名区分大小写。建议全部小写
- 数据库名最多64个字节

数据库最终会变成文件系统中的一个文件，数据库名即对应的文件名，这也是数据库名有诸多限制的原因。

admin、local、config 这些数据库名是保留的。

**数据库名+集合名=命名空间**

##### 2.5 启动MongoDB

# mongodb命令

启动并指定数据库

```
mongod --dbpath  d:/devtools/mongodb.db
```

启动并指定数据库和端口号

```
mongod --dbpath  d:/devtools/mongodb.db --port=77777
```

查看数据库

```
show database
```

启动并制定配置文件

```
mongod -f d:/devtools/mongodb/mongodb.conf
```

使用指定数据库

```
use db1
```

1.带条件删除

> db.user.remove({"name":"zhangshan"});

2.删除所有数据

> db.user.remove({})

3.删除集合

> db.user.drop()

4.删除整个数据库

> show dbs;
> db.user.getDB()
> db.dropDatabase()

# 数据库操作

### 新增

```
db.infos.insert({"url":"www.hanggle.com"})
db.infos.insert([{"url":"www.hanggle.com"}, {"url":"www.hanggle.com"}])
for(var i=0; i<10; i++){
    db.infos.insert({"url":"www.hanggle.com-"+ i})
}
```

### 查询

#### 普通查询

查询所有

```
db.infos.find();
```

查询url为"www.hanggle.com"的数据

```
db.infos.find({"url":"www.hanggle.com"});
```

查询url为"www.hanggle.com"的数据且id不显示

```
db.infos.find({"url":"www.hanggle.com"}, {"_id":0});
```

查询url为"www.hanggle.com"的数据,数据漂亮显示

```
db.infos.find({"url":"www.hanggle.com"}).pretty();
```

#### 关系运算查询

| $gt | $gte | $ne | $lt | $lte |
| --- | ---- | --- | --- | ---- |
| 大于  | 大于等于 | 不等于 | 小于  | 小于等于 |

查询age>20的记录

```
db.course.find({"age":{"$gt":20}}).pretty();
```

查询age大于等于20的记录

```
db.course.find({"age":{"$gte":20}}).pretty();
```

查询age不等于20的记录

```
db.course.find({"age":{"$ne":20}}).pretty();
```

#### 逻辑运算

| $and | $or | $not/$nor |
| ---- | --- | --------- |
| 与    | 或   | 非         |

查询age大于等于18，且小于等于20的记录

```
db.course.find({"age": {"$gte": 18, "$lte": 20}})
```

查询age>18或score>80的记录

```
db.course.find({"$or": [{"age": {"$gt":18}},{"score":{"$gt": 80}}]})
```

查询age>18并且score<80的记录

```
db.course.find({"$and": [{"age": {"$gt":18}},{"score":{"$lt": 80}}]})
```

查询age不大于18并且score不小于80的记录

```
db.course.find({"$nor": [{"age": {"$gt":18}},{"score":{"$lt": 80}}]})
```

#### 查询数组

| $all | ￥   |     |
| ---- | --- | --- |
| 查询所有 |     |     |

查询数组中包含语文数学的记录

```
db.course.find({"course": {"$all": ["语文", "数学"]}})
```

查询数组中坐标1的数据为数学的记录

```
db.course.find({"course.1": "数学"})
```

查询数组size为3的记录

```
db.course.find({"course": {"$size":3}})
```

-- 有问题  查询数组前两条数据

```
db.course.find({"course": {"$slice": 2}})
```

-- 有问题  查询数组后两条数据

```
db.course.find({"course": {"$slice": 2}})
```

-- 有问题  查询数组中index1-2坐标数据两条数据

```
db.course.find({"course": {"$slice": [1, 2]}})
```

#### 判断一个字段是否存在

查询存在course的记录

```
db.course.find({"course": {"$exists": true}})
```

查询不存在course的记录

```
db.course.find({"course": {"$exists": false}})
```

#### where 查询

**不建议使用**

#### 正则运算

- 基础语法：{key: 正则标记}

- 完整语法：{key:{"$regex":正则标记, "$options":选项}}。
  
  对于options主要是设置正则的信息查询的标记：
  
  > - "i": 忽略字母大小写
  > - "m"：多行查找
  > - "x": 空白字符串除了被转义的或在字符串类中意外的完全被忽略
  > - "s"：匹配所有的字符（圆点、“.”）,包括换行内容。
  
  需要注意的是：如果是直接使用（javascript），那么只能使用i和m，而“x”和“s”必须使用$regex

模糊查询那么包含A的记录

```
(1) db.course.find({"name": /A/i})
(2) db.course.find({"name": {"$regex":/A/i}})
```

模糊查询数组那么包含“数”的记录

```
db.course.find({"course": {"$regex":/数/i}})
```

### 数据排序

按分数倒序排序（-1），正序排序（1）

```
db.course.find().sort({"score": -1})
```

自然排序 倒序排序（-1），正序排序（1）

```
db.course.find().sort({"$natural": 1})
```

### 删除数据

删除course集合

```
db.course.drop()
```

删除集合course中url为www.hanggle.com的数据

```
db.course.remove({"url":"www.hanggle.com"});
```

删除course中所有数据

```
db.user.remove({})
```

### 分页显示

- skip(n): 表示跨过多少行
- limit(n): 取出的数据行的个数限制

按score倒序排序跳过1条取2条

```{}
db.course.find().skip(1).limit(2).sort({"score": -1})
```

### 数据更新

#### 查询索引

```
db.infos.getIndexes()
```

### 创建索引

在集合infos上的age列创建升序索引

```
db.infos.ensureIndex({"age"：1})
```

### 使用索引

查询age=19的数据，FETCH表示正在使用索引

```
db.infos.find({"age":{"$eq":19}}).explain();
```

![1561126812376](E:\01 File\node\DB\assets\1561126812376.png)

### ！强制使用索引

sql加上hint() 表示强制使用索引，强制使用索引只能使用已存在的索引。

```
db.infos.find({"$or":[{"age":{"$eq":19}},{"name":{"$eq":"haha"}}]}).hint().explain();
```

### 删除索引

删除集合上age列的正序索引

```
db.infos.dropIndex({"age":1});
```

### 删除全部索引

删除infos上除_id其它的所有索引

```
db.infos.dropIndexes();
```

### 创建唯一索引

在infos上创建name唯一索引

```
db.infos.ensureIndex({"name":1},{"unique": true});
```

如果增加重复数据会有以下提示信息

> E11000 duplicate key error collection: mydb.infos index: name_1 dup key: { : "张三" }

### 过期索引

过期索引用于延时自动珊瑚记录的一种索引。它仅包含一个字段，改字段为Date类型，并且不支持复合索引。可以指定某条记录在延时固定时间后自动删除。数据自动超时删除主要用在系统生成的事件、日志或者会话信息等不需要永久存储的数据。**超时时间是不准确的**

> - **注意事项**
> 1. TTL索引仅支持一个字段，不能支持复合索引。
> 2. _id字段不支持TTL索引。
> 3. 不能再固定大小的集合上创建TTL索引。
> 4. 不能通过createIndex()接口来改变expireAfterSeconds的值，可以通过"collMod"命令，或者先删除再创建的方式。
> 5. 不能在已经建立索引的字段创建TTL索引。

在phone的time字段上设置过期索引，过期时间为10s

```
db.phones.ensureIndex({"time":1}, {expireAfterSeconds:10});
```

### 全文索引

### 聚合-取得集合数量

统计info中数据个数，count可以加参数

```
db.infos.count();
```

### 聚合-消除重复数据

查询course中name去重数据

```
db.runCommand({"distinct":"course","key":"name"})
```

### 聚合-分组

```

```

### 聚合框架

#### group

Group查询都是无序的

> db.emps.insert({"name":"AAA", "dept":"部门A", "tel":110, "salery":2000, "sex":"W"});
> db.emps.insert({"name":"BBB", "dept":"部门A", "tel":120, "salery":7000, "sex":"M"});
> db.emps.insert({"name":"CCC", "dept":"部门B", "tel":130, "salery":4000, "sex":"W"});
> db.emps.insert({"name":"DDD", "dept":"部门B", "tel":140, "salery":1000, "sex":"M"});
> db.emps.insert({"name":"EEE", "dept":"部门B", "tel":150, "salery":2000, "sex":"W"});

查询emps每个部分的人数

```
db.emps.aggregate([{"$group":{"_id":"$dept", emp_count:{"$sum": 1}}}]);
```

查询每个部门总工资

```
db.emps.aggregate([{"$group":{"_id":"$dept", salery_count:{"$sum": "$salery"}}}]);
```

查询每个人的平均工资

```
db.emps.aggregate([{"$group":{
    "_id":"$dept", 
    salery_sum:{"$sum": "$salery"},
    salery_avg:{"$avg": "$salery"}
    }}]);
```

查询每个分组的数据

```
db.emps.aggregate([{"$group":{
    "_id":"$dept", 
    sal_data:{"$push": "$salery"}
    }}]);
```

查询每个分组最大值和最小值

```
db.emps.aggregate([{"$group":{
    "_id":"$dept", 
    sal_data:{"$push": "$salery"}
    }}]);
```

#### project

控制_id列不显示，name列显示

```
db.emps.aggregate([{"$project":{
    "_id":0,
    "name":1}}]);
```

project使用的是数据库投影机制，投影过程中也可以进行加减乘除运算，

乘法运算：

```
db.emps.aggregate([{"$project":{
    "_id":0,
    "name":1,
    "salery":{
        "年薪":{"$multiply":["$salery",12]}
        }}}])
```

### 用户管理

MongoDB默认不使用用户名密码，使用密码要具备以下条件：

> 1. 服务器启动时打开授权认证
> 2. 设置用户名密码

#### 创建用户

```shell
db.createUser({
    "user":"hanggle",
    "pwd":"hanggle",
    "roles":[{"role":"readWrite", "db":"mydb"}]
    })    
```

#### 修改密码

```
db.changeUserPassword("mongodb", "mongodb")
```
