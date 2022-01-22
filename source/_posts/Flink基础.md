---
title: Flink基础
cover: https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/20220122103730.png
author: 
  nick: hanggle
  link: https://www.github.com/hanggle
subtitle: Apache Flink is a framework and distributed processing engine for stateful computations over unbounded and bounded data streams. Flink has been designed to run in all common cluster environments, perform computations at in-memory speed and at any scale.

tags: 
    - 大数据
    - Flink
categories: Flink
date: 2022-01-22 21:59:12
---

# Flink是什么

Flink是一个框架和分布式处理引擎，用于对无界和有界数据流进行状态计算。



#  流计算产品

### 数据集成

> 侧重解决数据到达时不需要立即执行数据分析的业务情况，但这些业务场景需要在数据到达时立即进行实时的接收，并有一定的数据过滤和数据变化需求。比如ETL，CDD等。数据最终会存储到数据湖或数据仓库等存储系统，供以后对静态数据进行分析。

### 数据分析

> 核心是对需要在数据到达时候对数据进行连续的动态分析，并需要可靠的将分析结果供下游业务系统使用。比如电商数据/传感器数据进行实时性强聚合分析，数据预测，进而达成监控预警和智能决策目的。数据分析类场景对流计算产品提出更高的能力要求。



### 流计算

流更多的形容数据流，以数据流的自然状态设计触发计算模型，称为**流计算**。



### 批计算

单位时间所积蓄的数据，我们称之为一批数据，以一批数据作为计算单元所设计触发计算模型，我们称之为**批计算**。





