---
title: Elasticsearch 查询
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
date: 2022-3-28
---



#### 条件查询（全文检索）

```
GET http://localhost:9200/test/_search

{
    "query": {
        "match": {
            "name": "李四"
        }
    }
}
```

```
{
    "took": 36,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 1.3260207,
        "hits": [
            {
                "_index": "test",
                "_type": "_doc",
                "_id": "1001",
                "_score": 1.3260207,
                "_source": {
                    "id": 2,
                    "name": "李四 is lisi-update"
                }
            }
        ]
    }
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

