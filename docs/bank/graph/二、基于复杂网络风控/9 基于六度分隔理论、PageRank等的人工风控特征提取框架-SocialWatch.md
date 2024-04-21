

# 基于六度分隔理论、PageRank等的人工风控特征提取框架-SocialWatch

原创 小伍哥 [小伍哥聊风控](javascript:void(0);) *2022-04-25 08:17*

![图片](https://mmbiz.qpic.cn/mmbiz_png/EBka0dZichyxHH52pZ0l2yKjSf67xp0eUZKjTTbpTWSViaUJZqLowuEESmZ4ia4I71Rib8nM4kBFjaQ9WJ9A4zdyMQ/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

关于图的风控应用，之前的很多文章都是基于算法的，今天分享一篇基于图进行人工特征提取的欺诈检测文章，这样大部分人都能应用上了，其中的特征提取方法和思想，值得我们探索和借鉴，可以作为无监督的的指标进行监控，也可以作为算法特征的输入。本文内容来自论文《SocialWatch: Detection of Online Service Abuse via Large-Scale Social Graphs》，**地址：**https://users.soe.ucsc.edu/~abadi/Papers/socialwatch.pdf



# **一、背景介绍**

本文主要进行的是两类风险账户的检测：**黑产自己注册的账号+黑产盗号的账号**。在一些网络在线服务中，黑产会使用这些控制的恶意账号进行一些恶意行为，这些账号可能是黑产批量注册的，也可能是盗号，因此需要有明显的特征去区分恶意账号和正常账号。论文为了识别邮箱服务中的恶意账号，提出来两类特征：一类是基于图的属性统计指标，另一类是基于社交关系的特征(social affinity feature)。

我们可以从这篇文章中学到几个点：第一个是如何构图（文章中用的邮件，我们可以用电话、地址、点击、设备、IP等），第二个是图统计特征提，第三个是图社交关系特征提取。



# **二、设计构建Graph**

论文中根据邮件关系构建了两种不同类型的图，顶点都是用户，但是边的构造有所不同，示意图如下。

1）发送邮件的有向图Gd：如果用户v1给v2发邮件，那么生成v1指向v2的边，权重是发送的数量

2）用户关系的无向图Gu：如果用户v1给v2发邮件>=2，同时v2给v1发邮件>=2，那么v1和v2之间会形成一条边。

下图为示意图，第一个图覆盖比较广，第二个条件的条件比较严格，通过要求边缘的权重至少同时为2，可以消除因偶尔或意外电子邮件交换（例如，意外回复恶意帐户）而导致的弱连接，图会小很多，但是整个图的靠靠性要强很多，可能很多人不知道结构化的数据怎么构建有向图和无向图，后面我会出个文章教大家怎么构图。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EBka0dZichyxHH52pZ0l2yKjSf67xp0eUbAjUqnzhmH7EDfRw8H95dnsibJ2azAZXIicmkXan2ey8TCoKh2sJ9MLA/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

**条件1图：**节点数为6.82亿个，边数57.45

**条件2图：**节点个数2.55亿个，边数4.369



# **三、检测黑产自己注册的账号**

对于黑产自己的账号，有两个最显著且易于计算的图属性，节点度 和 PageRank。度是一种能捕捉账户攻击性的图属性，PageRank 是一种从全局层面计算整个图上每个节点的权重的方法。接下来，我们将讨论如何在社交环境中修改这两个属性以进行检测。

## **1、账号回复率**

账号回复率 = 回复该账号邮件的账号数/接收该账号邮件的账号数

恶意账号出度大（发邮件给其他的账号数量多），但回复率会比较低，通过简单的统计，可以找到一些明显的恶意账号。

## **2、PageRank**

PageRank算法是一种基于图的传播算法，一种简单的想法是在有向图Gd上使用PageRank，传播善意分数（goodness score），然而尽管恶意账号的回复率比较低，但是由于发送的邮件数巨大，偶然性的回复会使得其善意分数偏高，而一些不活跃的正常账号善意分数会比较低。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EBka0dZichyxHH52pZ0l2yKjSf67xp0eUR2gC47O84OeibqlaQa5sBmyx4QnYNmufwdyzdaTcoNpz5DcpfPI3DeQ/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

为了解决上述问题，论文提出来了两处改进，一是修改边的权重（考虑发送和回复比例），二是把原来网络图连接关系进行反转（入链变成出链，出链变成入链），传播恶意分数（badness score）。

下面举一个简单的例子：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EBka0dZichyxHH52pZ0l2yKjSf67xp0eUldngC7GxFalnNwxg6M3jLxWXZRicNCUrtxU1jljFn5hZiadKt5ceaOaw/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

假设一个正常账号A发送给spammer的邮件数是1，而给其friend的邮件数是10。那么在传播goodness score时，根据A发送邮件数作为传播权重，传给spammer的善意得分比较小。

将出入关系进行反转，若spammer给A发送的邮件数是100，而friend给A发送的邮件数是10，根据公式：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EBka0dZichyxHH52pZ0l2yKjSf67xp0eUCu5eUljLlxwYYS6ozTg5Z6XicNauVJg41Da40Y4qmiaHgZVvyrmuEW3g/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

> w(A->spammer) = (101/2) /( 101/2+11/11+11/11) ) = 96.4%
>
> w(A->friend)    = (11/11) /( 101/2+11/11+11/11) ) = 1.8%

根据上述权重由A传播恶意分数，传给spammer的善意得分比较大。定义指标badness_score/goodness_score，若指标大于某阈值则认为账号是恶意的。

上面的计算不是很理解的同学，可以看看这个文章，网页排序算法PageRank：http://sparkandshine.net/webpages-ranking-algorithm-pagerank/

![图片](https://mmbiz.qpic.cn/mmbiz_png/EBka0dZichyxHH52pZ0l2yKjSf67xp0eUe6FLWB7IllLeYNm3xC0SfIWhSWNeCjls3n7iaZ6556tCSeTrttTg0Vw/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)



# **三、被盗号账户检测-社会亲和力特征**

被盗的账号相比于黑产自己注册的账号来讲行为的噪音更大（被盗号账户，过去的行为都很正常，并没有大规模的异常邮件行为），通过degree或者pagerank很难识别到，为了解决这个问题，作者从社交关系的角度出发，定义了两个 social affinity feature（社会亲和力特征）：Recipient connectivity（收件人连通性 ）和 Social distance（社交距离），下面我们分别看看这两个特征的具体含义。

## **1、 Recipient connectivity（收件人连通性 ）**

一个正常账号 和 与其进行邮件通讯的账号往往处于同一个社区，对于一个账号v，从Gu中抽取顶点为接收到v邮件的账号子图Gu(v)，通过连通图聚类得到若干连通分量c1，c2，...，ck，这些连通图分量的成员数至少为2，于是：对于节点v而言，删除节点v得到以节点v为中心的一阶的子图，然后使用connected components 算法获取k个联通分量，显然最小联通分量包含两个节点。

最后使用公式：Recipient connectivity（v） = 连通分量的账号数之和/接收到v邮件的账号数

![图片](https://mmbiz.qpic.cn/mmbiz_png/EBka0dZichyxHH52pZ0l2yKjSf67xp0eUZkX0jxHU3fRLSOTLGNDcibsax1S1bodETibl3dkPcG3teJmgu8poZfLA/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

我画了个示意图，如下所示，我们把定点V剔除后，剩下的图，连通性各不相同，图1就是比较异常的，只要定都发送，发送的各个点之间并没有联系，剔除后连同分量为0，而图3，剔除后的三个账户，依然连通，所以连通分量为3。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EBka0dZichyxHH52pZ0l2yKjSf67xp0eUwFIhz9fP4BIKicHp2B3ud1QUN4Mr2dWyemXLPHMZr7ibqCjl8amYsKeA/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

这背后的直觉就是正常的账户和周围人的联系一般较为密切而极少与不认识的人存在联系，因此其 recipient connectivity 往往较高，而对于一个被劫持的正常账户，由于被劫持账户也是用来发广告之类的（比如微博号、qq号，微信号被盗，会给关注的人发各种乱七八糟的私信），因此被劫持的账户一旦发生了这类行为，其recipient connectivity往往会发生变化，从而变得较低。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EBka0dZichyxHH52pZ0l2yKjSf67xp0eUdDMH1KXgJIzbW78dGyLhnK38mFxegIBWsC5TjuEBpDJd2QlCerkDyA/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

Recipient connectivity的一个问题是两个用户在邮件网络中没有联系，不代表其在真实世界中也没有联系。

**注意：**无向图G的极大连通子图称为G的连通分量( Connected Component)，任何连通图的连通分量只有一个，即是其自身，非连通的无向图有多个连通分量。求图的连通分量的目的，是为了确定从图中的一个顶点是否能到达图中的另一个顶点，也就是说，图中任意两个顶点之间是否有路径可达。这个问题从图上可以直观地看出答案，然而，一旦把图存入计算机中，答案就不大清楚了。

## **2、Social distance（收件人社交距离）**

对于一个账号v，从子图Gu中剔除账号v和相关的边，于是：Social distance（v）= 接收到v邮件的账号之间的平均最短距离

![图片](https://mmbiz.qpic.cn/mmbiz_png/EBka0dZichyxHH52pZ0l2yKjSf67xp0eUoibsZalpGDPGxnyY2ibp50FlWSeggsMFUkAtVhaAEBotQ0WibHTzLFfIQ/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

However, the social-distance fea-ture l(v) requires computing shortest-path distances on the largegraph Gu for all user pairs in R(v)

这个特征怎么理解？其背后的直觉是复杂网络中的“小世界”，正常账户往往在一个社交圈子里，大部分人彼此认识，因此对于正常用户的通过邮件构建起来的社交圈子而言，其social distance**比较短**，而对于被劫持的正常账户而言，群体中的其他人彼此并不认识，其social distance比较长。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EBka0dZichyxHH52pZ0l2yKjSf67xp0eUMaOcA0icRkPywf6GauMkVZGYRpQqrQCNuqQJSakWQVhxx9VrLGfptRA/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

有了这些相关特征后，如果有已知的被盗账号，那么通过各种算法就可以构建一个分类任务了，从而识别其他的被盗账号，或者直接用规则，识别被盗账号。

收获就这两个社交亲和力特征，用来帮助处理盗号问题，没标签就做规则，有标签就作为特征train 模型。在上述缺失观测的情况下，由最短路径距离定义的社会距离是完整图上真实社会距离的上限近似值。

通过上面的图，我们可以发现一个理论，六度分隔理论，哈佛大学心理学教授斯坦利·米尔格拉姆于1967年根据这个概念做过一次连锁信实验，尝试证明平均只需要6步就可以联系任何两个互不相识的人。后世的人们将这个理论称作是“六度空间理论”或“六度分隔理论”。我们的计算中，正常用户的距离，均值恰好是6左右。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EBka0dZichyxHH52pZ0l2yKjSf67xp0eUWArSOgbmicSC5ia5LKXzJs3MJtwxmsDvAQsopFjq5z6v1GtibTZCtpicsA/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

文章就写到这里了，文章虽然简单，但是里面的细节还是非常多的，大家可以结合自己的业务，寻找不同的关系图，然后来研究里面提到的指标。