- JAVA基础
  - [Java 基础](/docs/basic/java-basic.md)
  - [JAVA 版本](/docs/basic/java-versions.md)
- 高并发架构
  - [消息队列](/docs/high-concurrency/mq-interview.md)
    -   [为什么使用消息队列？](/docs/high-concurrency/why-mq.md)
    -   [如何保证消息队列的高可用？](/docs/high-concurrency/how-to-ensure-high-availability-of-message-queues.md)
    -   [如何保证消息不被重复消费？](/docs/high-concurrency/how-to-ensure-that-messages-are-not-repeatedly-consumed.md)
    -   [如何保证消息的可靠性传输？](/docs/high-concurrency/how-to-ensure-the-reliable-transmission-of-messages.md)
    -   [如何保证消息的顺序性？](/docs/high-concurrency/how-to-ensure-the-order-of-messages.md)
    -   [如何解决消息队列的延时以及过期失效问题？](/docs/high-concurrency/mq-time-delay-and-expired-failure.md)
    -   [如何设计一个消息队列？](/docs/high-concurrency/mq-design.md)
  - [搜索引擎](/docs/high-concurrency/es-introduction.md)
    -   [ES 的分布式架构原理是什么？](/docs/high-concurrency/es-architecture.md)
    -   [ES 写入数据的工作原理是什么？](/docs/high-concurrency/es-write-query-search.md)
    -   [ES 在数十亿级别数量下如何提高查询效率？](/docs/high-concurrency/es-optimizing-query-performance.md)
    -   [ES 生产集群的部署架构是什么？](/docs/high-concurrency/es-production-cluster.md)
  - 缓存
    -   [在项目中缓存是如何使用的？](/docs/high-concurrency/why-cache.md)
    -   [Redis 和 Memcached 有什么区别？](/docs/high-concurrency/redis-single-thread-model.md)
    -   [Redis 都有哪些数据类型以及适用场景？](/docs/high-concurrency/redis-data-types.md)
    -   [Redis 的过期策略都有哪些？](/docs/high-concurrency/redis-expiration-policies-and-lru.md)
    -   [如何保证 Redis 高并发、高可用？](/docs/high-concurrency/how-to-ensure-high-concurrency-and-high-availability-of-redis.md)
    -   [Redis 主从架构是怎样的？](/docs/high-concurrency/redis-master-slave.md)
    -   [Redis 的持久化有哪几种方式？](/docs/high-concurrency/redis-persistence.md)
    -   [Redis 如何基于哨兵集群实现高可用？](/docs/high-concurrency/redis-sentinel.md)
    -   [Redis 集群模式的工作原理能说一下么？](/docs/high-concurrency/redis-cluster.md)
    -   [Redis 的雪崩、穿透和击穿，如何应对？](/docs/high-concurrency/redis-caching-avalanche-and-caching-penetration.md)
    -   [如何保证缓存与数据库双写一致性？](/docs/high-concurrency/redis-consistence.md)
    -   [如何解决 Redis 的并发竞争问题？](/docs/high-concurrency/redis-cas.md)
    -   [生产环境中的 Redis 是怎么部署的？](/docs/high-concurrency/redis-production-environment.md)
  - 分库分表
    -   [为什么要分库分表？](/docs/high-concurrency/database-shard.md)
    -   [分库分表如何平滑过渡？](/docs/high-concurrency/database-shard-method.md)
    -   [设计一个动态扩容缩容的分库分表方案？](/docs/high-concurrency/database-shard-dynamic-expand.md)
    -   [分库分表之后，id 主键如何处理？](/docs/high-concurrency/database-shard-global-id-generate.md)
  - 读写分离
    -   [如何实现 MySQL 的读写分离？](/docs/high-concurrency/mysql-read-write-separation.md)
  - 高并发系统
    -   [如何设计一个高并发系统？](/docs/high-concurrency/high-concurrency-design.md)
- 分布式系统
  -   [面试连环炮](/docs/distributed-system/distributed-system-interview.md)
  -   系统拆分
      - [为什么要进行系统拆分？](/docs/distributed-system/why-dubbo.md)
  -   分布式服务框架
      -   [说一下 Dubbo 的工作原理？](/docs/distributed-system/dubbo-operating-principle.md)
      -   [Dubbo 支持哪些序列化协议？](/docs/distributed-system/dubbo-serialization-protocol.md)
      -   [Dubbo 负载均衡策略和集群容错策略？](/docs/distributed-system/dubbo-load-balancing.md)
      -   [Dubbo 的 SPI 思想是什么？](/docs/distributed-system/dubbo-spi.md)
      -   [如何基于 Dubbo 进行服务治理？](/docs/distributed-system/dubbo-service-management.md)
      -   [分布式服务接口的幂等性如何设计？](/docs/distributed-system/distributed-system-idempotency.md)
      -   [分布式服务接口请求的顺序性如何保证？](/docs/distributed-system/distributed-system-request-sequence.md)
      -   [如何自己设计一个类似 Dubbo 的 RPC 框架？](/docs/distributed-system/dubbo-rpc-design.md)
      -   [CAP 定理的 P 是什么？](/docs/distributed-system/distributed-system-cap.md)
  -   分布式锁
      -   [Zookeeper 都有哪些应用场景？](/docs/distributed-system/zookeeper-application-scenarios.md)
      -   [分布式锁如何设计？](/docs/distributed-system/distributed-lock-redis-vs-zookeeper.md)
  -   分布式事务
      -   [分布式事务了解吗？](/docs/distributed-system/distributed-transaction.md)
  -   分布式会话
      -   [集群分布式 Session 如何实现？](/docs/distributed-system/distributed-session.md)
- 高可用架构
  -   基于 Hystrix 实现高可用
      -   [Hystrix 介绍](/docs/high-availability/hystrix-introduction.md)
      -   [电商网站详情页系统架构](/docs/high-availability/e-commerce-website-detail-page-architecture.md)
      -   [Hystrix 线程池技术实现资源隔离](/docs/high-availability/hystrix-thread-pool-isolation.md)
      -   [Hystrix 信号量机制实现资源隔离](/docs/high-availability/hystrix-semphore-isolation.md)
      -   [Hystrix 隔离策略细粒度控制](/docs/high-availability/hystrix-execution-isolation.md)
      -   [深入 Hystrix 执行时内部原理](/docs/high-availability/hystrix-process.md)
      -   [基于 request cache 请求缓存技术优化批量商品数据查询接口](/docs/high-availability/hystrix-request-cache.md)
      -   [基于本地缓存的 fallback 降级机制](/docs/high-availability/hystrix-fallback.md)
      -   [深入 Hystrix 断路器执行原理](/docs/high-availability/hystrix-circuit-breaker.md)
      -   [深入 Hystrix 线程池隔离与接口限流](/docs/high-availability/hystrix-thread-pool-current-limiting.md)
      -   [基于 timeout 机制为服务接口调用超时提供安全保护](/docs/high-availability/hystrix-timeout.md)
  -   高可用系统
      -   如何设计一个高可用系统？
  -   限流
      -   [如何限流？说一下具体的实现？](/docs/high-concurrency/how-to-limit-current.md)
  -   熔断
      -   如何进行熔断？
      -   熔断框架都有哪些？具体实现原理知道吗？
      -   [熔断框架，选用 Sentinel 还是 Hystrix？](/docs/high-availability/sentinel-vs-hystrix.md)
  -   降级
      -   如何进行降级？
- 微服务架构
  -   微服务的一些概念
      -   [关于微服务架构的描述](/docs/micro-services/microservices-introduction.md)
      -   [从单体式架构迁移到微服务架构](/docs/micro-services/migrating-from-a-monolithic-architecture-to-a-microservices-architecture.md)
      -   [微服务的事件驱动数据管理](/docs/micro-services/event-driven-data-management-for-microservices.md)
      -   [选择微服务部署策略](/docs/micro-services/choose-microservice-deployment-strategy.md)
  -   Spring Cloud 微服务架构
      -   [什么是微服务？微服务之间是如何独立通讯的？](/docs/micro-services/what's-microservice-how-to-communicate.md)
      -   Spring Cloud 和 Dubbo 有哪些区别？
      -   Spring Boot 和 Spring Cloud，谈谈你对它们的理解？
      -   什么是服务熔断？什么是服务降级？
      -   微服务的优缺点分别是什么？说一下你在项目开发中碰到的坑？
      -   [你所知道的微服务技术栈都有哪些？](/docs/micro-services/micro-services-technology-stack.md)
      -   [微服务治理策略](/docs/micro-services/micro-service-governance.md)
      -   Eureka 和 Zookeeper 都可以提供服务注册与发现的功能，它们有什么区别？
      -   [谈谈服务发现组件 Eureka 的主要调用过程？](/docs/micro-services/how-eureka-enable-service-discovery-and-service-registration.md)
- 海量数据处理
  -   10 道经典的海量数据处理面试题
  -   [如何从大量的 URL 中找出相同的 URL？](/docs/big-data/find-common-urls.md)
  -   [如何从大量数据中找出高频词？](/docs/big-data/find-top-100-words.md)
  -   [如何找出某一天访问百度网站最多的 IP？](/docs/big-data/find-top-1-ip.md)
  -   [如何在大量的数据中找出不重复的整数？](/docs/big-data/find-no-repeat-number.md)
  -   [如何在大量的数据中判断一个数是否存在？](/docs/big-data/find-a-number-if-exists.md)
  -   [如何查询最热门的查询串？](/docs/big-data/find-hotest-query-string.md)
  -   [如何统计不同电话号码的个数？](/docs/big-data/count-different-phone-numbers.md)
  -   [如何从 5 亿个数中找出中位数？](/docs/big-data/find-mid-value-in-500-millions.md)
  -   [如何按照 query 的频度排序？](/docs/big-data/sort-the-query-strings-by-counts.md)
  -   [如何找出排名前 500 的数？](/docs/big-data/find-rank-top-500-numbers.md)
- Spring 系列
  - IoC 容器
    - [BeanDefinition 的资源定位过程](/docs/Spring/IoC/1、BeanDefinition的资源定位过程.md)
    - [将 bean 解析封装成 BeanDefinition](/docs/Spring/IoC/2、将bean解析封装成BeanDefinition.md)
    - [将 BeanDefinition 注册进 IoC 容器](/docs/Spring/IoC/3、将BeanDefinition注册进IoC容器.md)
    - [依赖注入(DI)](</docs/Spring/IoC/4、依赖注入(DI).md>)
    - [BeanFactoryPostProcessor](/docs/Spring/IoC/BeanFactoryPostProcessor.md)
    - [BeanPostProcessor](/docs/Spring/IoC/BeanPostProcessor.md)
    - [Spring BeanFactory 源码解析](/docs/Spring/clazz/Spring-beanFactory.md)
    - [循环依赖](/docs/Spring/IoC/循环依赖.md)

  - AOP
    - [AOP 源码实现及分析](/docs/Spring/AOP/AOP源码实现及分析.md)
    - [JDK 动态代理的实现原理解析](/docs/Spring/AOP/JDK动态代理的实现原理解析.md)
    - [Spring AOP 如何生效(Spring AOP 标签解析)](/docs/Spring/AOP/Spring-Aop如何生效.md)

  - SpringMVC
    - [IoC 容器 在 Web 环境 中的启动](/docs/Spring/SpringMVC/IoC容器在Web环境中的启动.md)
    - [SpringMVC 的设计与实现](/docs/Spring/SpringMVC/SpringMVC的设计与实现.md)
    - [SpringMVC 跨域解析](/docs/Spring/SpringMVC/SpringMVC-CROS.md)
    - [Spring-MVC-HandlerMapping](/docs/Spring/mvc/Spring-MVC-HandlerMapping.md)
    - [Spring-mvc-MappingRegistry](/docs/Spring/mvc/Spring-mvc-MappingRegistry.md)

  - SpringJDBC
    - 努力编写中...

    - Spring 事务
    - [Spring 与事务处理](/docs/Spring/SpringTransaction/Spring与事务处理.md)
    - [Spring 声明式事务处理](/docs/Spring/SpringTransaction/Spring声明式事务处理.md)
    - [Spring 事务处理的设计与实现](/docs/Spring/SpringTransaction/Spring事务处理的设计与实现.md)
    - [Spring 事务管理器的设计与实现](/docs/Spring/SpringTransaction/Spring事务管理器的设计与实现.md)
    - [Spring 事务解析](/docs/Spring/TX/Spring-transaction.md)

  - Spring 源码故事（瞎编版）
    - [面筋哥 IoC 容器的一天(上)](</docs/Spring/Spring源码故事（瞎编版）/面筋哥IoC容器的一天(上).md>)

  - Spring 整体脉络
    - [16 张图解锁 Spring 的整体脉络](/docs/Spring/Spring整体脉络/16张图解锁Spring的整体脉络.md)

  - Spring 类解析
    - [Spring 自定义标签解析](/docs/Spring/clazz/Spring-Custom-label-resolution.md)
    - [Spring Scan 包扫描](/docs/Spring/clazz/Spring-scan.md)
    - [Spring 注解工具类](/docs/Spring/clazz/Spring-AnnotationUtils.md)
    - [Spring 别名注册](/docs/Spring/clazz/Spring-SimpleAliasRegistry.md)
    - [Spring 标签解析类](/docs/Spring/clazz/Spring-BeanDefinitionParserDelegate.md)
    - [Spring ApplicationListener](/docs/Spring/clazz/Spring-ApplicationListener.md)
    - [Spring messageSource](/docs/Spring/clazz/Spring-MessageSource.md)
    - [Spring 自定义属性解析器](/docs/Spring/clazz/Spring-Custom-attribute-resolver.md)
    - [Spring 排序工具](/docs/Spring/clazz/Spring-OrderUtils.md)
    - [Spring-import 注解](/docs/Spring/clazz/Spring-Import.md)
    - [Spring-定时任务](/docs/Spring/clazz/Spring-Scheduling.md)
    - [Spring StopWatch](/docs/Spring/clazz/Spring-StopWatch.md)
    - [Spring 元数据](/docs/Spring/clazz/Spring-Metadata.md)
    - [Spring 条件接口](/docs/Spring/clazz/Spring-Conditional.md)
    - [Spring MultiValueMap](/docs/Spring/clazz/Spring-MultiValueMap.md)
    - [Spring MethodOverride](/docs/Spring/clazz/Spring-MethodOverride.md)
    - [Spring BeanDefinitionReaderUtils](/docs/Spring/clazz/Spring-BeanDefinitionReaderUtils.md)
    - [Spring PropertyPlaceholderHelper](/docs/Spring/clazz/Spring-PropertyPlaceholderHelper.md)
    - [Spring PropertySource](/docs/Spring/clazz/PropertySource)
    - [Spring PlaceholderResolver](/docs/Spring/clazz/PlaceholderResolver)
    - [Spring-AnnotationFormatterFactory](/docs/Spring/clazz/format/Spring-AnnotationFormatterFactory.md)
    - [Spring-Formatter](/docs/Spring/clazz/format/Spring-Formatter.md)
    - [Spring-Parser](/docs/Spring/clazz/format/Spring-Parser.md)
    - [Spring-Printer](/docs/Spring/clazz/format/Spring-Printer.md)

  - Spring5 新特性
    - [Spring5-spring.components 解析](/docs/Spring/Spring5新特性/Spring-spring-components.md)

  - Spring RMI
    - [Spring RMI](/docs/Spring/RMI/Spring-RMI.md)

  - SpringBoot
    - [SpringBoot run 方法解析](/docs/SpringBoot/Spring-Boot-Run.md)
    - [SpringBoot 配置加载解析](/docs/SpringBoot/SpringBoot-application-load.md)
    - [SpringBoot 自动装配](/docs/SpringBoot/SpringBoot-自动装配.md)
    - [SpringBoot ConfigurationProperties](/docs/SpringBoot/SpringBoot-ConfigurationProperties.md)
    - [SpringBoot 日志系统](/docs/SpringBoot/SpringBoot-LogSystem.md)
    - [SpringBoot ConditionalOnBean](/docs/SpringBoot/SpringBoot-ConditionalOnBean.md)

  - SpringBootBatch
    - [SpringBootBatch 源码](/docs/SpringBootBatch/SpringBootBatch源码.md)

  - Spring Cloud
    - [Spring Cloud Commons 源码](docs/SpringCloud/spring-cloud-commons-source-note.md)
    - [Spring Cloud OpenFeign 源码](docs/SpringCloud/spring-cloud-openfeign-source-note.md)
    - [Spring Cloud Gateway 源码](docs/SpringCloud/spring-cloud-gateway-source-note.md)

  - SpringSecurity
    - [SpringSecurity 请求全过程解析](/docs/SpringSecurity/SpringSecurity请求全过程解析.md)
    - [SpringSecurity 自定义用户认证](/docs/SpringSecurity/SpringSecurity自定义用户认证.md)
    - [SpringSecurity 流程补充](/docs/SpringSecurity/SpringSecurity流程补充.md)
- MyBatis
  - 基础支持层
    - [反射工具箱和 TypeHandler 系列](docs/Mybatis/基础支持层/1、反射工具箱和TypeHandler系列.md)
    - [DataSource 及 Transaction 模块](docs/Mybatis/基础支持层/2、DataSource及Transaction模块.md)
    - [binding 模块](docs/Mybatis/基础支持层/3、binding模块.md)
    - [缓存模块](docs/Mybatis/基础支持层/4、缓存模块.md)

  - 核心处理层
    - [MyBatis 初始化](docs/Mybatis/核心处理层/1、MyBatis初始化.md)
    - [SqlNode 和 SqlSource](docs/Mybatis/核心处理层/2、SqlNode和SqlSource.md)
    - [ResultSetHandler](docs/Mybatis/核心处理层/3、ResultSetHandler.md)
    - [StatementHandler](docs/Mybatis/核心处理层/4、StatementHandler.md)
    - [Executor 组件](docs/Mybatis/核心处理层/5、Executor组件.md)
    - [SqlSession 组件](docs/Mybatis/核心处理层/6、SqlSession组件.md)

  - 类解析
    - [Mybatis-Cache](/docs/Mybatis/基础支持层/Mybatis-Cache.md)
    - [Mybatis-log](/docs/Mybatis/基础支持层/Mybatis-log.md)
    - [Mybatis-Reflector](/docs/Mybatis/基础支持层/Mybatis-Reflector.md)
    - [Mybatis-Alias](/docs/Mybatis/核心处理层/Mybatis-Alias.md)
    - [Mybatis-Cursor](/docs/Mybatis/核心处理层/Mybatis-Cursor.md)
    - [Mybatis-DataSource](/docs/Mybatis/核心处理层/Mybatis-DataSource.md)
    - [Mybatis-DyanmicSqlSourcce](/docs/Mybatis/核心处理层/Mybatis-DyanmicSqlSourcce.md)
    - [Mybatis-MapperMethod](/docs/Mybatis/核心处理层/Mybatis-MapperMethod.md)
    - [Mybatis-MetaObject](/docs/Mybatis/核心处理层/Mybatis-MetaObject.md)
    - [Mybatis-MethodSignature](/docs/Mybatis/核心处理层/Mybatis-MethodSignature.md)
    - [Mybatis-ObjectWrapper](/docs/Mybatis/核心处理层/Mybatis-ObjectWrapper.md)
    - [Mybatis-ParamNameResolver](/docs/Mybatis/核心处理层/Mybatis-ParamNameResolver.md)
    - [Mybatis-SqlCommand](/docs/Mybatis/核心处理层/Mybatis-SqlCommand.md)
    - [Mybats-GenericTokenParser](/docs/Mybatis/核心处理层/Mybats-GenericTokenParser.md)

- Mybatis-Plus
    


- Netty
  - 网络 IO 技术基础
    - [把被说烂的 BIO、NIO、AIO 再从头到尾扯一遍](docs/Netty/IOTechnologyBase/把被说烂的BIO、NIO、AIO再从头到尾扯一遍.md)
    - [IO 模型](docs/Netty/IOTechnologyBase/IO模型.md)
    - [四种 IO 编程及对比](docs/Netty/IOTechnologyBase/四种IO编程及对比.md)

  - JDK1.8 NIO 包 核心组件源码剖析
    - [Selector、SelectionKey 及 Channel 组件](docs/Netty/IOTechnologyBase/Selector、SelectionKey及Channel组件.md)

  - Netty 粘拆包及解决方案

    - [TCP 粘拆包问题及 Netty 中的解决方案](docs/Netty/TCP粘拆包/TCP粘拆包问题及Netty中的解决方案.md)

  - Netty 多协议开发
    - [基于 HTTP 协议的 Netty 开发](docs/Netty/Netty多协议开发/基于HTTP协议的Netty开发.md)
    - [基于 WebSocket 协议的 Netty 开发](docs/Netty/Netty多协议开发/基于WebSocket协议的Netty开发.md)
    - [基于自定义协议的 Netty 开发](docs/Netty/Netty多协议开发/基于自定义协议的Netty开发.md)

  - 基于 Netty 开发服务端及客户端
    - [基于 Netty 的服务端开发](docs/Netty/基于Netty开发服务端及客户端/基于Netty的服务端开发.md)
    - [基于 Netty 的客户端开发](docs/Netty/基于Netty开发服务端及客户端/基于Netty的客户端开发.md)

  - Netty 主要组件的源码分析
    - [ByteBuf 组件](docs/Netty/Netty主要组件源码分析/ByteBuf组件.md)
    - [Channel 组件 和 Unsafe 组件](docs/Netty/Netty主要组件源码分析/Channel和Unsafe组件.md)
    - [EventLoop 组件](docs/Netty/Netty主要组件源码分析/EventLoop组件.md)
    - [ChannelPipeline 和 ChannelHandler 组件](docs/Netty/Netty主要组件源码分析/ChannelPipeline和ChannelHandler组件.md)
    - [Future 和 Promise 组件](docs/Netty/Netty主要组件源码分析/Future和Promise组件.md)

  - Netty 高级特性
    - [Netty 架构设计](docs/Netty/AdvancedFeaturesOfNetty/Netty架构设计.md)
    - [Netty 高性能之道](docs/Netty/AdvancedFeaturesOfNetty/Netty高性能之道.md)

  - Netty 技术细节源码分析
    - [FastThreadLocal 源码分析](docs/Netty/Netty技术细节源码分析/FastThreadLocal源码分析.md)
    - [Recycler 对象池原理分析](docs/Netty/Netty技术细节源码分析/Recycler对象池原理分析.md)
    - [MpscLinkedQueue 队列原理分析](docs/Netty/Netty技术细节源码分析/MpscLinkedQueue队列原理分析.md)
    - [HashedWheelTimer 时间轮原理分析](docs/Netty/Netty技术细节源码分析/HashedWheelTimer时间轮原理分析.md)
    - [HashedWheelTimer & schedule](docs/Netty/Netty技术细节源码分析/HashedWheelTimer&schedule.md)
    - [ByteBuf 的内存泄漏原因与检测原理](docs/Netty/Netty技术细节源码分析/ByteBuf的内存泄漏原因与检测原理.md)
    - [内存池之 PoolChunk 设计与实现](docs/Netty/Netty技术细节源码分析/内存池之PoolChunk设计与实现.md)
    - [内存池之从内存池申请内存](docs/Netty/Netty技术细节源码分析/内存池之从内存池申请内存.md)
- Dubbo
  - 架构设计
    - [Dubbo 整体架构](docs/Dubbo/architectureDesign/Dubbo整体架构.md)
  - SPI 机制
    - [Dubbo 与 Java 的 SPI 机制](docs/Dubbo/SPI/Dubbo与Java的SPI机制.md)

  - 注册中心
    - [Dubbo 注册中心模块简析](docs/Dubbo/registry/Dubbo注册中心模块简析.md)
    - [注册中心的 Zookeeper 实现](docs/Dubbo/registry/注册中心的Zookeeper实现.md)

  - 远程通信
    - [Dubbo 远程通信模块简析](docs/Dubbo/remote/Dubbo远程通信模块简析.md)
    - [Transport 组件](docs/Dubbo/remote/Transport组件.md)
    - [Exchange 组件](docs/Dubbo/remote/Exchange组件.md)
    - [Buffer 组件](docs/Dubbo/remote/Buffer组件.md)
    - [基于 Netty 实现远程通信](docs/Dubbo/remote/基于Netty实现远程通信.md)
    - [基于 HTTP 实现远程通信](docs/Dubbo/remote/基于HTTP实现远程通信.md)

  - RPC

    - [RPC 模块简析](docs/Dubbo/RPC/RPC模块简析.md)
    - [Protocol 组件](docs/Dubbo/RPC/Protocol组件.md)
    - [Proxy 组件](docs/Dubbo/RPC/Proxy组件.md)
    - [Dubbo 协议](docs/Dubbo/RPC/Dubbo协议.md)
    - [Hessian 协议](docs/Dubbo/RPC/Hessian协议.md)

  - 集群

    - [Dubbo 集群模块简析](docs/Dubbo/cluster/Dubbo集群模块简析.md)
    - [负载均衡](docs/Dubbo/cluster/负载均衡.md)
    - [集群容错](docs/Dubbo/cluster/集群容错.md)
    - [mock 与服务降级](docs/Dubbo/cluster/mock与服务降级.md)
- Tomcat
  - Servlet 与 Servlet 容器
    - [servlet-api 源码赏析](docs/Tomcat/servlet-api源码赏析.md)
    - [一个简单的 Servlet 容器](docs/Tomcat/一个简单的servlet容器代码设计.md)
    - [Servlet 容器详解](docs/Tomcat/servlet容器详解.md)
  - Web 容器
    - [一个简单的 Web 服务器](docs/Tomcat/一个简单的Web服务器代码设计.md)
- Redis
  - [深挖 Redis 6.0 源码——SDS](docs/Redis/redis-sds.md)
- Nacos
  - [nacos 服务注册](docs/nacos/nacos-discovery.md)
- Sentinel
  - [sentinel 时间窗口实现](docs/Sentinel/Sentinel时间窗口的实现.md)
  - [Sentinel 底层 LongAdder 的计数实现](docs/Sentinel/Sentinel底层LongAdder的计数实现.md)
  - [Sentinel 限流算法的实现](docs/Sentinel/Sentinel限流算法的实现.md)
- RocketMQ
  - [RocketMQ NameServer 与 Broker 的通信](docs/rocketmq/rocketmq-nameserver-broker.md)
  - [RocketMQ 生产者启动流程](docs/rocketmq/rocketmq-producer-start.md)
  - [RocketMQ 消息发送流程](docs/rocketmq/rocketmq-send-message.md)
  - [RocketMQ 消息发送存储流程](docs/rocketmq/rocketmq-send-store.md)
  - [RocketMQ MappedFile 内存映射文件详解](docs/rocketmq/rocketmq-mappedfile-detail.md)
  - [RocketMQ ConsumeQueue 详解](docs/rocketmq/rocketmq-consumequeue.md)
  - [RocketMQ CommitLog 详解](docs/rocketmq/rocketmq-commitlog.md)
  - [RocketMQ IndexFile 详解](docs/rocketmq/rocketmq-indexfile.md)
  - [RocketMQ 消费者启动流程](docs/rocketmq/rocketmq-consumer-start.md)
  - [RocketMQ 消息拉取流程](docs/rocketmq/rocketmq-pullmessage.md)
  - [RocketMQ Broker 处理拉取消息请求流程](docs/rocketmq/rocketmq-pullmessage-processor.md)
  - [RocketMQ 消息消费流程](docs/rocketmq/rocketmq-consume-message-process.md)
- 番外篇（JDK 1.8）
  - 基础类库
    - [String 类 源码赏析](docs/JDK/basic/String.md)
    - [Thread 类 源码赏析](docs/JDK/basic/Thread.md)
    - [ThreadLocal 类 源码赏析](docs/JDK/basic/ThreadLocal.md)
  - 集合
    - [HashMap 类 源码赏析](docs/JDK/collection/HashMap.md)
    - [ConcurrentHashMap 类 源码赏析](docs/JDK/collection/ConcurrentHashMap.md)
    - [LinkedHashMap 类 源码赏析](docs/JDK/collection/LinkedHashMap.md)
    - [ArrayList 类 源码赏析](docs/JDK/collection/ArrayList.md)
    - [LinkedList 类 源码赏析](docs/JDK/collection/LinkedList.md)
    - [HashSet 类 源码赏析](docs/JDK/collection/HashSet.md)
    - [TreeSet 类 源码赏析](docs/JDK/collection/TreeSet.md)

  - 并发编程
    - [JUC 并发包 UML 全量类图](docs/JDK/concurrentCoding/JUC并发包UML全量类图.md)
    - [Executor 线程池组件 源码赏析](docs/JDK/concurrentCoding/Executor线程池组件.md)
    - [Lock 锁组件 源码赏析](docs/JDK/concurrentCoding/Lock锁组件.md)
    - [详解 AbstractQueuedSynchronizer 抽象类](docs/JDK/concurrentCoding/详解AbstractQueuedSynchronizer.md)
    - [Semaphore 类 源码赏析](docs/JDK/concurrentCoding/Semaphore.md)

  - 学习心得
    - 个人经验
      - [初级开发者应该从 Spring 源码中学什么](docs/LearningExperience/PersonalExperience/初级开发者应该从spring源码中学什么.md)
    - 编码规范
      - [一个程序员的自我修养](docs/LearningExperience/EncodingSpecification/一个程序员的自我修养.md)

    - 设计模式
      - [从 Spring 及 Mybatis 框架源码中学习设计模式(创建型)](<docs/LearningExperience/DesignPattern/从Spring及Mybatis框架源码中学习设计模式(创建型).md>)
      - [从 Spring 及 Mybatis 框架源码中学习设计模式(行为型)](<docs/LearningExperience/DesignPattern/从Spring及Mybatis框架源码中学习设计模式(行为型).md>)
      - [从 Spring 及 Mybatis 框架源码中学习设计模式(结构型)](<docs/LearningExperience/DesignPattern/从Spring及Mybatis框架源码中学习设计模式(结构型).md>)

    - 多线程
      - [Java 并发编程在各主流框架中的应用](docs/LearningExperience/ConcurrentProgramming/Java并发编程在各主流框架中的应用.md)


- 数据库(建设中)
  - Arangodb
  - Mongodb
  - Mysql
  - Neo4j
  - Oracle
---
