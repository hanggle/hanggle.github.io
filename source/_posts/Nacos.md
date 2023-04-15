---
title: Nacos
cover: https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/image-20220117215820573.png
author: 
  nick: hanggle
  link: https://www.github.com/hanggle
subtitle: Nacos 致力于帮助发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，帮助您快速实现动态服务发现、服务配置、服务元数据及流量管理。
tags: 
    - 分布式
categories: 分布式
date: 2022-01-17 21:59:12
---

# Nacos是什么

Nacos 更敏捷和容易地构建、交付和管理微服务平台。 Nacos 是构建以“服务”为中心的现代应用架构 (例如微服务范式、云原生范式) 的服务基础设施。

* **服务发现和服务健康监测**

  Nacos 支持基于 DNS 和基于 RPC 的服务发现。

  

* **动态配置服务**

  动态配置服务可以让您以中心化、外部化和动态化的方式管理所有环境的应用配置和服务配置。

  动态配置消除了配置变更时重新部署应用和服务的需要，让配置管理变得更加高效和敏捷。

* **动态 DNS 服务**

  动态 DNS 服务支持权重路由，让您更容易地实现中间层负载均衡、更灵活的路由策略、流量控制以及数据中心内网的简单DNS解析服务。动态DNS服务还能让您更容易地实现以 DNS 协议为基础的服务发现，以帮助您消除耦合到厂商私有服务发现 API 上的风险。

* **服务及其元数据管理**

  Nacos 能让您从微服务平台建设的视角管理数据中心的所有服务及元数据，包括管理服务的描述、生命周期、服务的静态依赖分析、服务的健康状态、服务的流量管理、路由及安全策略、服务的 SLA 以及最首要的 metrics 统计数据。

  

#  Nacos 架构



![nacos_arch.jpg](https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/1561217892717-1418fb9b-7faa-4324-87b9-f1740329f564.jpeg)



## Nacos一致性协议

使用Raft 以及 Distro协议，同时运行 CP 协议以及 AP 协议
