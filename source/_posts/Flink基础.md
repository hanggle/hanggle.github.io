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
categories: 大数据
date: 2022-01-22 21:59:12
---

官方文档：https://flink.apache.org/zh/flink-architecture.html

# Flink是什么

Apache Flink 是一个框架和分布式处理引擎，用于在*无边界和有边界*数据流上进行有状态的计算。Flink 能在所有常见集群环境中运行，并能以内存速度和任意规模进行计算。

### 无界数据流与有界数据流

任何类型的数据都可以形成一种事件流。信用卡交易、传感器测量、机器日志、网站或移动应用程序上的用户交互记录，所有这些数据都形成一种流。数据可以被作为 *无界* 或者 *有界* 流来处理。

**无界流** 有定义流的开始，但没有定义流的结束。它们会无休止地产生数据。无界流的数据必须持续处理，即数据被摄取后需要立刻处理。我们不能等到所有数据都到达再处理，因为输入是无限的，在任何时候输入都不会完成。处理无界数据通常要求以特定顺序摄取事件，例如事件发生的顺序，以便能够推断结果的完整性。

**有界流** 有定义流的开始，也有定义流的结束。有界流可以在摄取所有数据后再进行计算。有界流所有数据可以被排序，所以并不需要有序摄取。有界流处理通常被称为批处理

![image-20220202093927373](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220202093927373.png)

#### 流计算

流更多的形容数据流，以数据流的自然状态设计触发计算模型，称为**流计算**。

#### 批计算

单位时间所积蓄的数据，我们称之为一批数据，以一批数据作为计算单元所设计触发计算模型，我们称之为**批计算**。

>  **流计算产品**
> 
> 数据集成: 侧重解决数据到达时不需要立即执行数据分析的业务情况，但这些业务场景需要在数据到达时立即进行实时的接收，并有一定的数据过滤和数据变化需求。比如ETL，CDD等。数据最终会存储到数据湖或数据仓库等存储系统，供以后对静态数据进行分析。
> 
> 数据分析: 核心是对需要在数据到达时候对数据进行连续的动态分析，并需要可靠的将分析结果供下游业务系统使用。比如电商数据/传感器数据进行实时性强聚合分析，数据预测，进而达成监控预警和智能决策目的。数据分析类场景对流计算产品提出更高的能力要求。

### 部署应用到任意地方

Apache Flink 是一个分布式系统，它需要计算资源来执行应用程序。Flink 集成了所有常见的集群资源管理器，例如 [Hadoop YARN](https://hadoop.apache.org/docs/stable/hadoop-yarn/hadoop-yarn-site/YARN.html)、 [Apache Mesos](https://mesos.apache.org/) 和 [Kubernetes](https://kubernetes.io/)，但同时也可以作为独立集群运行。

### 运行任意规模应用

Flink 旨在任意规模上运行有状态流式应用。因此，应用程序被并行化为可能数千个任务，这些任务分布在集群中并发执行。所以应用程序能够充分利用无尽的 CPU、内存、磁盘和网络 IO。而且 Flink 很容易维护非常大的应用程序状态。其异步和增量的检查点算法对处理延迟产生最小的影响，同时保证精确一次状态的一致性。

- 处理**每天处理数万亿的事件**,
- 应用维护**几TB大小的状态**, 和
- 应用**在数千个内核上运行**。

### 利用内存性能

有状态的 Flink 程序针对本地状态访问进行了优化。任务的状态始终保留在内存中，如果状态大小超过可用内存，则会保存在能高效访问的磁盘数据结构中。任务通过访问本地（通常在内存中）状态来进行所有的计算，从而产生非常低的处理延迟。Flink 通过定期和异步地对本地状态进行持久化存储来保证故障场景下精确一次的状态一致性。

![image-20220204092251955](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220204092251955.png)
