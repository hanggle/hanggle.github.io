---
title: Elasticsearch 分词
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
date: 2022-3-29
---



#### 映射关系

```
PUT http://localhost:9200/user/_mapping

{
    "properties":{
        "name":{
            "type":"text", //text 表示文本，可以分词
            "index":true 
        },
        "sex":{
            "type":"keyword", //keyword 表示文本，可以不能分词
            "index":true
        },
        "tel":{
            "type":"keyword",
            "index":false // 不添加索引，无法用此列搜索
        }
    }
}
```

```
{
    "acknowledged": true
}
```

#### 条件查询（精确匹配）

```
GET http://localhost:9200/test/_search

{
    "query": {
        "match_phrase": {
            "name": "is come"
        }
    }
}
```



#### 分页查询

```
GET http://localhost:9200/test/_search

{
    "query": {
        "match_all": {}
    },
    "from": 0,
    "size": 2
}
```

#### 分页查询(部分栏位)

```
GET http://localhost:9200/test/_search


{
    "query": {
        "match_all": {}
    },
    "from": 0,
    "size": 2,
    "_source":["name"]
}
```

#### 分页查询(排序)

```
GET http://localhost:9200/test/_search

{
    "query": {
        "match_all": {}
    },
    "from": 0,
    "size": 2,
    "_source": [
        "name"
    ],
    "sort": {
        "id": {
            "order": "desc"
        }
    }
}
```

#### 多条件查询（类似于and）

```
GET http://localhost:9200/test/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "name": "李四"
                    }
                },
                {
                    "match": {
                        "id": "2"
                    }
                }
            ]
        }
    }
}
```

以下相当于or

```
GET http://localhost:9200/test/_search
{
    "query": {
        "bool": {
            "should": [
                {
                    "match": {
                        "name": "李四"
                    }
                },
                {
                    "match": {
                        "id": "1"
                    }
                }
            ]
        }
    }
}
```

范围查找？

```
GET http://localhost:9200/test/_search
{
    "query": {
        "bool": {
            "should": [
                {
                    "match": {
                        "name": "李四"
                    }
                },
                {
                    "match": {
                        "id": "2"
                    }
                }
            ],
            "filter": {
                "range": {
                    "id": {
                        "gt": 2
                    }
                }
            }
        }
    }
}
```

#### 高亮显示

```
GET http://localhost:9200/test/_search
{
    "query": {
        "match_phrase": {
            "name": "is come"
        }
    },
    "highlight":{
        "fields":{
            "name":{}
        }
    }
}
```

#### 聚合操作

```
GET http://localhost:9200/test/_search
{
    "aggs": {
        "id_avg": {
            "avg": {
                "field":"id"
            }
        }
    },
    "size":0 // 不显示原始数据
}
```

```
{
    "took": 55,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 3,
            "relation": "eq"
        },
        "max_score": null,
        "hits": []
    },
    "aggregations": {
        "id_avg": {
            "value": 2.0
        }
    }
}
```

