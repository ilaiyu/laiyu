# 图嵌入：基于DeepWalk+Skipgram的节点向量化方法及落地案例剖析

[小伍哥聊风控](javascript:void(0);) *2023-03-29 08:29* *浙江*

以下文章来源于老刘说NLP ，作者刘焕勇

![img](http://wx.qlogo.cn/mmhead/Q3auHgzwzM7eCFJUwZWfQHIzT5GuiaUwZ9p83sbXs3tlnpDcxO4sAAg/0)

**老刘说NLP**.

老刘，NLP开源爱好者与践行者。主页：https://liuhuanyong.github.io。老刘说NLP，将定期发布语言资源、工程实践、技术总结等内容，欢迎关注。

GraphEmbedding，旨在解决图节点的向量表示以及图表示两个基本任务，以支持后续的节点分类、节点推荐、链接预测等下游应用场景。

不过，对于这一问题，我们首先需要想到的是，生成一个图的向量表示必须与图本身的特征挂钩，即图里有什么？

**一方面，一个基本的图，由节点和边构成，形成一个拓扑结构。节点自身可以携带标签，边可以是有向的、无向的，且可以携带权重和边的标签。这些是图自身的特征信息。**

**另一方面，通过边的关联，节点之间形成了一张张子图，即特定的网络拓扑结构，这种结构特征为一个节点提供了上下文的特征信息。**

因此，将网络结构和图自身特征信息作为处理对象，进行节点向量表示学习，成为了一个重要的工作方向。一般的，如下图所示，当前节点向量表示的方法可分为因式分解方法、随机游走方法和深度方法。

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaUL3X7vdHFFFgbib9pdHFN1ZBqiaGlehL0vtfjbmjtQBJuhtQy7dgR458pnOPzY6J6GPeHQNf1aqbA/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

本文主要介绍当前几个主流的随机游走方法图节点表示方法，包括DeepWalk、LINE、node2vec**，从中我们可以看到这一类方法的处理范式，并以业界Airbn、淘宝推荐两个实际落地场景作为例子进行案例总结，以说明该方法的实际价值。****供大家一起参考。**

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaQNVHmYz8GyhKH9JTn9XxGkWy5v3tMcTucfQibxibmGuc9YsnBMJh0ldv11FM72efoHia8TeR6SnESw/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)



## 一、从Word2Vec到DeepWalk 

word2vec是通过语料库中的句子序列来描述词与词的共现关系，因此对于Graph而言，**其关键问题是如何描述节点与节点的共现关系。**

经典的deepwalk借鉴了word2vec思想，同样认为，具有相同上下文的节点，也应该是相似的，而这一上下文，可以是一阶邻居，也可以是二阶、三阶等，可以通过游走的方式，形成上下文，然后采用wordvec的架构，完成节点表示学习。

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaUL3X7vdHFFFgbib9pdHFN1BBc3zsniaDqarVFSkeK6Oc3mUKfLv1OAIKtUhszdD5YVxv16icAdPPTA/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)



1、随机游走生成节点序列

随机游走生成序列的方法，包括深度优先遍历以及广度优先遍历两种。

1）深度优先遍历

深度优先遍历尽可能优先往深层次进行搜索。在实现上，在G中任选一顶点v为初始出发点(源点)，首先访问出发点v，并将其标记为已访问过；然后依次从v出发搜索v的每个邻接点w。

若w未曾访问过，则以w为新的出发点继续进行深度优先遍历，直至图中所有和源点v有路径相通的顶点均已被访问为止。

例如，给定图：

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/fUBU1yiaEmJiaQNVHmYz8GyhKH9JTn9XxGewtGemO3cgcndbmcgJ0DADoRfyTa19SiaoeDcXnK8ciaqnXjH3qaGnUA/640?wx_fmt=jpeg&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

深度优先遍历的路径为， **A>B>E>F>C>D>G>H** 



2）广度优先遍历

广度优先搜索是按层来处理顶点，距离开始点最近的那些顶点首先被访问，而最远的那些顶点则最后被访问。具体的，首先访问出发点v，接着依次访问v的所有邻接点w1、w2......wt，然后依次访问w1、w2......wt邻接的所有未曾访问过的顶点。以此类推，直至图中所有和源点v有路径相通的顶点都已访问到为止。此时从v开始的搜索过程结束。

例如，给定图，

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/fUBU1yiaEmJiaQNVHmYz8GyhKH9JTn9XxGewtGemO3cgcndbmcgJ0DADoRfyTa19SiaoeDcXnK8ciaqnXjH3qaGnUA/640?wx_fmt=jpeg&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

广度优先遍历生成路径为**A>B>C>D>E>F>G>H>I**



**Deepwalk**主要考虑了深度优先遍历形成节点之间的游走序列的方法，假设邻域相似，即给定当前访问起始节点，从其邻居中随机采样节点作为下一个访问节点，重复此过程，直到访问序列长度满足预设条件，产生大量节点序列；

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaUL3X7vdHFFFgbib9pdHFN1q9Jj84eaAPPrBIs5BLp10lf1go5PllwLQHFVTFXNy4f62xowYnGRbQ/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

**从上面的伪代码中，可以看到给定一个图G(V，E)，有多个参数，如：**

W表示窗口大小，用于skipgram构造上下文训练样本。

d表示节点向量维度，用于控制生成的节点特征数。

r表示遍历的次数，用于生成不同的随机路径忘本。

t 表示生成的路径长度，用于控制节点生成的路径序列发现。

**2、节点向量表示训练**

可以通过游走形成的节点进行ID化，形成类似于word2vec类似的矩阵，大小为图节点大小x图节点向量特征维度。

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaUL3X7vdHFFFgbib9pdHFN10y7p7uqfKjckSuSJAKiahPqz7ptEQ1R884DCLTAowd7R7GN1eIaOVcA/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

将这些词序列作为训练样本输入word2vec，用Skip-gram + Hierarchical softmax进行训练，得到词的embedding。

## 二、从DeepWalk到Node2Vec

DeepWalk采用的随机游走策略开创了利用节点序列与词向量共现思想生成embedding的先和河，但其存在几个不足：

一方面，D**eepwalk有一个前提假设，即所有的节点出现的概率是服从均匀分布的，但实际上并非如此，从一个节点到其他节点的概率是不同的。**

另一方面，**Deepwalk采用深度遍历的游走方式，只解决了图节点的结构相似性（结构即上下文，上下文相同，则节点近似），还有内容相似性可以进一步融合**。

因此，针对以上两个问题，node2vec综合考虑了广度优先遍历（**用于捕捉局部共现信息**）和深度优先遍历（**用于捕捉全局共现信息**），提出了**二阶随机游走思想，解决内容相似和结构相似**的问题。

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaUL3X7vdHFFFgbib9pdHFN1CeOM0gTVgqWOJAs1GkQ83hvMcQp5ib4CnM43icOwbauPMQOA5qibxtdHg/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

如上图所示：

**1）内容相似。**假设具有直接连接关系的两个节点，是内容相似的（例如两个灰色网站之间很有可能能够直接跳转），如图中的s1，s2，s3等一阶邻居与节点是相似的。广度优先遍历会偏向于的找到一阶邻域。对于极端情况，采用BFS的时候，每一个节点的观测被限制在度为1的邻居上，也就是下图的节点s1，s2，s3，这种观测有助于提取网络structural的信息，两个拥有同样邻居的节点在向量化后距离很近。

**2）结构相似**。假设具有相同邻居结构的两个节点，也是相似的。例如，**周围邻居数量类似，如图中的s6和u节点，两个都有4个邻接，在结构上是相似的**。采用DFS的时候，我们不断走向其他节点，如图的s4，s5，s9。这种情况有助于提取网同质性的信息，即**两个相互连接通路较多的节点在向量化后距离很近**。

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaUL3X7vdHFFFgbib9pdHFN1VMLScgU7owMEiaGtBb2N1Vb2zvJ7YRXtdBFqwriaV2iaTFaWWoTZI6Vhg/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

针对Deepwalk均匀采样的问题，Node2vec进一步引入了p和q两个概率参数来加以控制。如下图所示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaUL3X7vdHFFFgbib9pdHFN1nQ8WKu6gFWVKp6VWRVONsM8Mhcds0C1ujO4O62FXJLEYqI0at36o6Q/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)例如，我们从节点v转移到节点t，并且当前在节点t时，需要考虑下一个采样节点x。因此，可以设计一个节点到它的不同邻居的转移概率：

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaQNVHmYz8GyhKH9JTn9XxGCgIj5IibE0Ra1UHsoqCrVic7xGExcewEGFzAarDUwo7ezjHCMqb7GJyQ/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

其中，每一步采样都会有三种状态，分别对应于上图的0，1，2三种情况：

1）0代表如果t和x相等，那么采样的概率为1/p；

2）1代表t与x相连，采样的概率为1；

3）2代表t与x不相连，采样的概率为1/q

式子中的参数p作为返回参数，控制重新采样上一步已访问节点的概率。参数q，作为出入参数，控制采样的方向。

其中：

1）当q>1时，接下来采样的节点倾向于节点t，偏向于广度优先遍历；

2）当q<1时，接下来采样的节点倾向于远离t，偏向于深度优先遍历。

3）当p>max(q,1)时，接下来采样的节点很大概率不是之前已访问节点，这一方法使得采样偏向深度优先；

4）当p<max(q,1)时，接下来采样的节点很大概率是之前已访问节点，这一方法使得采样偏向广度优先。

**这样一来，在每次遍历时，既可以生成广度优先遍历的路径结果，也可以生成深度优先遍历的结果，即walks，最后同样的接入skipgram完成节点向量表示训练。**

## 三、从DeepWalk到LINE

上面说到，Noede2vec在Deepwalk的基础上，进一步考虑**了内容相似性与结构相似性，解决方法是引入深度优先遍历和广度优先遍历两种方式**，取得了一定效果，但我们发现，Deepwalk无法处理有向加权图，对于图节点之间边存在不同权重的情况，并未能有效考虑。

因此，针对这个权重及有向的问题，LINE，全称**Large-scale Information Network Embedding，提出将一阶、二阶的邻近关系引入目标函数，以应用于有向图、无向图以及边有权重的网络方法**，并从另一个角度来刻画内容相似性及结构相似性。

为了衡量两个节点之间的相似度，该模型引入了KL散度是用于衡量两个概率分布相似性的指标，定义为：

，

表示概率分布 和概率分布 之间的差异，差异越小表示节点越接近。

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaUL3X7vdHFFFgbib9pdHFN1y0xKtCm0hJ1T0KlsJQOhR7QEicMrdPP12aZyuVKjcREszPPXR6Yt8pA/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

**1、一阶相似建模**

一阶相似(First-order proximity)。用于**描述图中成对顶点之间的局部相似度，即若节点之间存在直连边，则边的权重即为两个顶点的相似度，若不存在直连边，则1阶相似度为0。**这种相似对应于node2vec中的内容相似性。

例如，上图中的节点6和7之间存在直连边，且边权较大，则认为两者相似且1阶相似度较高**（边的越粗，权重越大）**，而5和6之间不存在直连边，则两者间1阶相似度为0。

对于两个节点 和 ，它们之间的相似性可以用向量距离来表示，其中 和 分别表示节点 和 对应的向量 ，



而实际直观上，两个结点的相似度是用两者之间的连接强度即边的权重来表示，即表示为：



因此我们的目标函数就是使得 和 尽可能地相同。

**2、二阶相似建模**

二阶相似(Second-order proximity)。进一步观察后，我们发现，只有1阶相似度显然不够，还是以上图为例，虽然节点5和6之间不存在直连边，但是这两个节点有很多相同的相邻节点1、2、3，这这方面看，5和6也是相似的，而且在真实场景中，大规模图中有链接的结点相对少。

因此，引入2阶相似度来描述这种关系，通过𝑝𝑢和𝑝𝑣的相似度来表示u与v的2阶相似度，若u与v之间不存在相同的邻居顶点，则2阶相似度为0，和word2vec类似，2阶相似度认为中间结点的**上下文结点交集越大**则越相似。

对于每个节点 都有两个向量表示：一个是作为中间结点时的表示 ，以及作为上下文结点时的表示 。对于每一条边 ，由结点 生成上下文 的概率为：



两个结点的二阶相似性可以表示为：



其中 为边的权重， 为结点的出度。最终也是通过KL散度来最小化两个概率分布的差距，



二阶相似性的目标函数中， 这一项的计算会涉及所有和结点 相邻结点的内积，计算量很大。为此作者采用了负采样的方式进行优化，其中第一项为正样本的边，第二项为采样的负样本边。



然后，当模型在优化更新过程中，对结点embedding进行计算。

最后，对于一个新来的结点，如果它和已知的结点有链接关系，那么可以来优化下面任意一个目标函数，

  或

并且保持原有已知节点的embedding不变，更新新来节点表示。

## 四、从DeepWalk到Airbnb应用场景

Airbnb是一个租房平台，连接了顾客与房东，房东把自己的房子挂在平台上提供短租服务，顾客在平台上浏览选择合适的房子进行预订，就像我们国内的携程等租房app。

Airbnb中存在着明显的推荐场景，当用户浏览房子时，系统需要推荐出对应的房源。基于此，Airbnb在2018年提出了实践性很强的论文《Real-time Personalization using Embeddings for Search Ranking at Airbnb》，其思想和DeepWalk的方法类似，思想在于基于用户的session行为序列构建有向带权Graph，其中根据行为的时间间隔，将一个用户的行为序列分割为多个session，并生成Listing Embedding以及User-type & Listing-type Embeddings。

**1、Listing Embeddings**

顾客在Airbnb上浏览房源时，每一个房源就是一个"Listing"，这个listing中描述了关于该房子的一些描述信息，如图片、价格等。因此将这个房子进行embedding化后，就可以利用相似度计算等方法进行推荐。

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaQNVHmYz8GyhKH9JTn9XxGfZuXOSxCNFFKAReMCXTIgDacc5tpIENLryzGgx0ia4FQuicQb6pzr3cg/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

为了生成Listing Embeddings，该工作采用了skip-gram的思想进行处理，模型思如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaQNVHmYz8GyhKH9JTn9XxGjpKBpPMn8MVTeoRwfRxJnnEMjrGzSDR8jzR1icLe8zHtYAMFFT5sRng/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

## 

**1)数据采样**

如上图所示，在具体实现上，定义为个用户的个click sessions，每个session为，如果一个用户的两次点击之间超过30分钟这进行session的截断。

**2)embedding学习**

在拿到listing行为数据后，可以每个房源生成一个 维的embedding向量，，该工作使用word2vec中的skip-gram，最大化目标函数为：





其中 可以通过softmax来进行定义和求解：





其中 表示的是房源 的输入向量， 表示的是房源 的输出向量表示， 表示的上下文滑动的窗口大小，表示所有房源的集合，而因为空间中的listing数量是非常多的，计算该概率较为困难，因此，文章采用了Negative Sampling的方法，将损失函数进行转换：

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaQNVHmYz8GyhKH9JTn9XxGMmz9CpWjufkVAdCicBVpDUU5y5uOpgdPvEpiah565NX84amNMzcX7myA/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

其中，c表示central listing；Dp表示与c相邻的listings；Dn表示与c不相关的listing。

**1.加入booked listing目标函数**

此外，如上图所示，与skipgram不同的是，模型在最后引入了booked listing，以适应业务需求，**因为平台当然希望用户最终能够booking，而且用户一直浏览的最终的目的是为了产生"booking"这样下订单的行为，因此应当将"booking"了的listing当作这一段时间的最后一个item，并将其作为一个全局的context。**因此，根据预定行为构造有导向于"Booking"的目标函数：

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaQNVHmYz8GyhKH9JTn9XxG1U8jI95y93LRNEv3Hl4j6IvWCUJmicbbXpiayAqV8dibGWzK5lOIxCndg/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)



其中，Vlb表示booking listing的embedding向量；注意绿色框的地方就是添加进来的booking listing。由于这个booking listing是作为"正例"样本，所以纳入到目标函数中的分母的指数是取"负"。



而为了说明这个全局上下文，同时，这个booking listing纳入目标函数的前面并没有加求和符号，即在这个session里面，都需要考虑到这个booking listing作为正例。

**
**

**2.加入location listing目标函数**

由于listing embedding是基于当前已经点击了一个房源，因此，此时用户是已经有一个地区倾向；同时，listing embedding更多的就是为了解决Airbnb的"相似房源"这个场景下的候选listings的排序，因此提出了在目标函数中在加入基于地区的采样，进一步加入了根据房源地区以优化目标函数目标函数，并将与点击listing处于同一个地区的其他listing当作负样本，纳入目标函数：

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaQNVHmYz8GyhKH9JTn9XxG6dTKpk7qBu5o9CpQqTz16c3aH1YzTmYs8WQZ68XSDvibia7icBsAcDGTQ/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

其中，Vmn表示当前地区的listing的embedding向量，Dmn表示当前的输入向量属于目标地区中负样本。

**2)User-type & Listing-type Embeddings**

Airbnb每天都有新上的房源，但是因为其没有出现在训练集中，导致无法产出其embedding，这里采用的解决办法是最相近的三个房源的平均embedding进行表示。

不能满足用户"长期兴趣偏好的挖掘"这一需求，因此，该工作进一步提出**User-type & Listing-type Embeddings。**

**1.数据采样**

大量用户的历史booking次数非常少，甚至可能他们的booking session的长度只有1，因此，基于一定的规则，对listing和user进行归类，将listing映射为listing-type，将user映射为user-type。

然后，提取出listing session中的预定行为，按时间构造booking session，按时间构造形如（user-type， listing-type）的二元组所构成的有序序列，表示该user-type预定了该listing-type。

**2.\**embedding学习\****

此处的embedding学习依旧采用negative sampling构造最初的目标函数进行训练，包括user-type embdding以及listing-type embedding两种类型，并将房东的拒绝行为（rejection）作为负样本加入目标函数。如a)到b)的变化：

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaQNVHmYz8GyhKH9JTn9XxG9Ig9foabJOnoef3xFHS8NOQdYxiapGviadyt9ypff0mrrbR7XAP7V8ww/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

***\*user-type embdding损失函数：\****

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaQNVHmYz8GyhKH9JTn9XxGREN7o6rIRrXKFYAtkpq5C8bN8GZujckU6Iia2zTUbSc7o4n0oKJOVWA/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)



**listing-type embedding损失函数：**

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaQNVHmYz8GyhKH9JTn9XxGUCLjHs7hvZk1yNxfkRCicY5KKPhTwc1VRaAQcdkH4MobJl5FgdvpKdg/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

## 五、从DeepWalk到tabo应用场景

2014年提出的DeepWalk，它的主要思想是**在由物品组成的图结构上进行随机游走，产生大量物品序列，然后将这些物品序列作为训练样本输入Word2Vec进行训练，得到物品的Embedding**。

**1、DeepWalk生成\**物品Embedding的一般流程\****

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaQNVHmYz8GyhKH9JTn9XxGJ1M4RBSxamdCvhLjONewMOkj7z6RvqHDRFx9x02nypicYkdQq31BFJA/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

上图描述了这一生成过程：

图a是原始的用户行为序列，包括3个用户，以及5组行为序列，图b是基于这些用户行为序列构建的物品关系图。

物品A和B之间的边产生的原因是用户U1先后购买了物品A和物品B，如果后续产生了多条相同的有向边，则有向边的权重被加强。在将所有用户行为序列都转换成物品关系图中的边之后，全局的物品关系图就能构建起来。

图c采用随机游走的方式随机选择起始点，重新产生物品序列，上图产生了6组,图d将这些物品序列输入到Word2Vec模型中，生成最终的物品Embedding向量。

在上述DeepWalk的算法流程中，需要形式化定义随机游走的跳转概率，即从节点vi到vj之间的概率，计算公式如下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaQNVHmYz8GyhKH9JTn9XxGHzHZbsEMLoia4HRlGX5O6X7VdrePiarnBbhmkoINibmzH0Q4DONxNlgkw/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

其中：ε是物品关系图中所有边的集合， N+(vi)是节点vi所有的出边集合，Mij是节点vi到节点vj边的权重(跳转边的权重占所有相关出边权重之和的比例)；

如果物品关系图是无向无权图，那么跳转概率中的权重Mij将为常数1，且 N+(vi)应是节点 vi所有“边”的集合。

不过，这种方法虽然能够较好的学习到Item Embedding信息，但是其是基于用户的行为构建的有向带权graph，对于一些冷启动商品，则无法进行覆盖。

**2、引入sideinfo的embedding学习**

在电商（淘宝）推荐系统中，存在可扩展性（scalability）、稀疏性（sparsity）、冷启动问题（cold start）三个挑战，阿里淘宝团队提出了GES(Graph Embedding with Side Information)模型，即增加商品的多模态信息（类别、店铺、价格等）来增强item的表征力度。

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaQNVHmYz8GyhKH9JTn9XxGSYaqO1Ibkb812CoicLCcl6gGCkvupLaX1BNGewVrvwXU1sxl72npOVw/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

在具体实现上，GES方法针对每个Item，一起训练item_embedding，category_embedding，brand_embedding，price_embedding 等 embedding 信息，最后进行Avg Pooling操作，继而表示该Item。



3**、引入权重的sideinfo embedding学习**

不过，进一步发现，GES能够获取到不错的效果，但是仍存在一些问题，**GES中采取的Avg-Pooling来得到最终的item embedding信息，但这并不能反应真实的情况**，例如，购买iPhone的用户因为“Apple”这个品牌而倾向于查看Macbook或iPad，一些用户会为了方便和更低的价格可能会在淘宝的同一家商店购买不同品牌的衣服。

因此，不同类型的辅助信息对用户行为中的item贡献是不同的(类似于注意力机制)。为了解决这个问题，进一步提出了Enhanced Graph Embedding with Side Information（EGES）模型

和GES区别在于，**组合表示 item_embedding 时，对 item 和 side information（例如category, shop, price等）的embedding学习不同的权重，并最终池化embedding表示，**即：



其中， 表示第 个维度的特征对应的权重，并做了归一化， 表示第个维度的embedding， 表示embedding的长度。

下图展示了该模型的网路结构：

![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaQNVHmYz8GyhKH9JTn9XxGRLD5icWVXy47e2rm27gWpZn4LvfepBF6Cm3k0nMHGkkMV9lUcQxvuZw/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

图中的Sparse Features代表item和side information的ID信息，Dense Embeddings表示item和side information的embedding信息，包括category_embedding，brand_embedding，price_embedding；

alpha1, alpha2,alpha n 分别代表 item 和 side information 的 embedding 权重；Sampled Softmax Classifier中的N代表采样的负样本行，P代表正样本，某个item周边上下n个item均为正样本，在模型中表示时不区分远近。

在模型训练上，EGES的损失函数为交叉熵损失函数：

，

其中表示item对应的上下文节点embedding。

## 六、总结

本文主要介绍了当前几个主流的随机游走方法图节点表示方法，包括DeepWalk、LINE、node2vec**，从中我们可以看到这一类方法的处理范式，并以业界Airbn、淘宝推荐两个实际落地场景作为例子进行案例总结，以说明该方法的实际价值。**

***\*![图片](https://mmbiz.qpic.cn/mmbiz_png/fUBU1yiaEmJiaQNVHmYz8GyhKH9JTn9XxGkWy5v3tMcTucfQibxibmGuc9YsnBMJh0ldv11FM72efoHia8TeR6SnESw/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)\****

基于DeepWalk方法进行图谱节点表示的方式，简单、高效，其大致可以概括为**随机数据采样+Skipgram的处理范式**，不同模型之间的差异主要在于采样的方以及目标函数，

例如**node2vec引入深度优先遍历以及广度优先遍历两种，以分别捕捉结构相似性以及内容相似性，以生成不同的游走序列**；

又如，我**们需要根据实际业务需求，来更改skipgram的目标函数，如Airbnb中做更改。**

## 参考文献

1、https://mp.weixin.qq.com/s/3XKrFGkhxxXdg-XGNkvXdg

2、https://mp.weixin.qq.com/s/j-vEuwUk1HVzHObeIvuh5A

3、https://arxiv.org/pdf/1607.00653.pdf

4、https://mp.weixin.qq.com/s/RJHIUm0SPRr-BZjyu8xDTw

5、https://mp.weixin.qq.com/s/88E0xbyzZsxLSgD3hp6H9Q

6、http://www.jos.org.cn/josen/article/pdf/6186

7、https://mp.weixin.qq.com/s/DPhP8EXtUN-qda8jLXBQog

8、https://zhuanlan.zhihu.com/p/112222118

9、https://blog.csdn.net/program_developer/article/details/106313165

10、Real-time Personalization using Embeddings for Search

Ranking at Airbnb

11、Billion-scale Commodity Embedding for E-commerce Recommendation in Alibaba