---
title: Elasticsearch 简介、基本操作
cover: https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220322224223753.png
author: 
  nick: hanggle
  link: https://www.github.com/hanggle
#editor:
#  name: Minfive
#  link: https://www.github.com/Mrminfive
subtitle: Elasticsearch是一个面向文档型数据库，一条数据就是一个文档。
tag:  大数据
categories: ES
date: 2022-3-22
---

Elasticsearch是一个面向文档型数据库，一条数据就是一个文档。Elasticsearch与MySQL存储数据概念对比如下

![image-20220322230355273](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220322230355273.png)

type在7.*之后已经被删除了



#### 倒排索引&正排索引

倒排索引（Inverted Index）也叫反向索引，有反向索引必有正向索引。通俗地来讲，正向索引是通过key找value，反向索引则是通过value找key。

#### 创建索引

```
PUT http://localhost:9200/test
```

结果:

```
{
    "acknowledged": true,
    "shards_acknowledged": true,
    "index": "test"
}
```

#### 查询索引

```
GET localhost:9200/test
```

```
{
    "test": {
        "aliases": {},
        "mappings": {},
        "settings": {
            "index": {
                "routing": {
                    "allocation": {
                        "include": {
                            "_tier_preference": "data_content"
                        }
                    }
                },
                "number_of_shards": "1",
                "provided_name": "test",
                "creation_date": "1648349689832",
                "number_of_replicas": "1",
                "uuid": "LyryPCWBSfSJzyCs3bQOEw",
                "version": {
                    "created": "7170199"
                }
            }
        }
    }
}
```

#### 删除索引

```
delete localhost:9200/test
```

```
{
    "acknowledged": true
}
```

#### 创建文档

```
POST localhost:9200/test/_doc
{
    "id":1,
    "name":"张三 is zhangsan"
}
```

```
{
    "_index": "test",
    "_type": "_doc",
    "_id": "OIRSyX8B4Mndvzjgdaft",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 0,
    "_primary_term": 1
}
```

#### 创建文档(自定义id)

```
POST localhost:9200/test/_doc/1001
{
    "id":2,
    "name":"李四 is lisi"
}
```

```
{
    "_index": "test",
    "_type": "_doc",
    "_id": "1001",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 1,
    "_primary_term": 1
}
```

此种方式put也可以

#### 主键查询

```
GET http://localhost:9200/test/_doc/1001
```

```
{
    "_index": "test",
    "_type": "_doc",
    "_id": "1001",
    "_version": 1,
    "_seq_no": 1,
    "_primary_term": 1,
    "found": true,
    "_source": {
        "id": 2,
        "name": "李四 is lisi"
    }
}
```



####  查询所有

```
GET http://localhost:9200/test/_search
```

```
{
    "took": 30,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 2,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": "test",
                "_type": "_doc",
                "_id": "OIRSyX8B4Mndvzjgdaft",
                "_score": 1.0,
                "_source": {
                    "id": 1,
                    "name": "张三 is zhangsan"
                }
            },
            {
                "_index": "test",
                "_type": "_doc",
                "_id": "1001",
                "_score": 1.0,
                "_source": {
                    "id": 2,
                    "name": "李四 is lisi"
                }
            }
        ]
    }
}
```



#### 更新文档(全量数据更新)

```
PUT http://localhost:9200/test/_doc/1001

{
    "id":2,
    "name":"李四 is lisi-update"
}
```

```
{
    "_index": "test",
    "_type": "_doc",
    "_id": "1001",
    "_version": 2,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 2,
    "_primary_term": 1
}
```

#### 更新数据（局部更新）

```
POST http://localhost:9200/test/_update/1001

{
    "doc":{
        "title":"李四 new"
    }
}
```



```
{
    "_index": "test",
    "_type": "_doc",
    "_id": "1001",
    "_version": 3,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 3,
    "_primary_term": 1
}
```

#### 删除数据

```
DELETE http://localhost:9200/test/_doc/1001
```

```
{
    "_index": "test",
    "_type": "_doc",
    "_id": "1001",
    "_version": 4,
    "result": "deleted",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 4,
    "_primary_term": 1
}
```

