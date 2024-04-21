# 令人惊艳的社会网络可视化库igraph！

原创 小伍哥 [小伍哥聊风控](javascript:void(0);) *2023-12-26 07:02* *浙江*

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/EBka0dZichyxXyC6DCHrkC1lDEpwGcRYW9kBbZ0ohGxibhgQDmqt2STOCl8Bptz6jW5ZlTZ7uAnGziaIO28MadCfA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

最近在研究igraph这个库，发现这个库对关系网络的可视化挺惊艳的，分享下，风控业务中经常会遇到，首先安装下，注意不要 pip install igraph，这个安装不了，需要按下面的方法安装。

- 

```
pip install  python-igraph
```

本次数据集的下载网站：https://public.websites.umich.edu/~mejn/netdata/

不想下载的，我下载了一份，后台回复【**网络可视化**】获取。

```
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Dec 25 21:53:09 2023

@author: wuzhengxiang
"""

import igraph as ig
import matplotlib.pyplot as plt
import os

#设置工作空间
path = '/Users/wuzhengxiang/Documents/算法文档/igraph'
os.chdir(path)


# 数据读取
g = ig.load("lesmis.gml")

print(g)

# 社区划分
communities = g.community_edge_betweenness()
communities = communities.as_clustering()

# 查看社区划分结果
for i, community in enumerate(communities):
    print(f"Community {i}:")
    for v in community:
        print(f"\t{g.vs[v]['label']}")

# 社区颜色设置
num_communities = len(communities)
palette1 = ig.RainbowPalette(n=num_communities)
for i, community in enumerate(communities):
    g.vs[community]["color"] = i
    community_edges = g.es.select(_within=community)
    community_edges["color"] = i
g.vs["label"] = ["\n\n" + label for label in g.vs["label"]]

# 可视化展示
layout = g.layout("kk")

fig1, ax1 = plt.subplots()
ig.plot(
    communities,
    layout = layout,
    target = ax1,
    mark_groups = True,
    palette = palette1,
    vertex_size = 40,
    edge_width = 1.5,
    vertex_label_size = 15
)
fig1.set_size_inches(4, 4)
```

我们对不同的数据集进行可视化，可以看到不同的效果。

**netscience**

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/EBka0dZichyxXyC6DCHrkC1lDEpwGcRYWLf0tbFmbKwpFv9J0jVzibCDh3dpJqM0zFSRkZribQz5O16XMiafBiazfIw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**celegansneural**

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/EBka0dZichyxXyC6DCHrkC1lDEpwGcRYWaPxZ0Mhvkmnoibt9ZC7Z5eNq9Cmah3IQgp0SvX12fz5KwX8iahaNvOnQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**football**

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/EBka0dZichyxXyC6DCHrkC1lDEpwGcRYWgDmCicyJJQVpZCrOLkJ4O5H5BcRdQhTfNEN39Z5mQgxLxgTeGqJj9iaA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**polbooks**

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/EBka0dZichyxXyC6DCHrkC1lDEpwGcRYWUvP5HByWX0PFEo0Pl5M0NgN5OpW7SRIdRVwqflrRNgvzReicVd1uorQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**adjnoun**

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/EBka0dZichyxXyC6DCHrkC1lDEpwGcRYWpvVcY8JwnPic4A6JaZVNJuZEN4v6p81sF93Nuiab9SIrrHzafRvKiacGQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**lesmis**

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/EBka0dZichyxXyC6DCHrkC1lDEpwGcRYWEePPTL56IhZUXmopaHQ8YIMELwBOibFIt9by0icRMo02Ly88DpZ3b8eg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**dolphins**

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/EBka0dZichyxXyC6DCHrkC1lDEpwGcRYWa5UOiaeLLKhbEOGTNkXg8n20hUUUdVzKzZia19mvqzaTndEke4wYibXAg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**布局算法:**

将节点放在一个圆环上:circle , circular

常用于大图，分散递归布局:drl

Kamda-Kawai 力导向布局:kk

常用于大图，大图布局:large , lgl , large_graph

将节点完全随机放置:random

Reingold-Tilford 树状布局，对类树状图有用:rt , tree

极坐标转换后Reingold-Tilford 树状布局，对类树状图有用:rt_citcular , tree



**节点绘图布局参数**

节点的颜色：vertex_color

节点字体：vertex_font

节点标签:vertex_label

节点标签的颜色:vertex_label_color

节点标签的字体大小:vertex_label_size

节点的大小（单位：像素）:vertex_size

vertex_shape：节点的形状；可用形状有：rectangle（正方形）、circle（圆形）、hidden（隐藏）、triangle-up（三角形）、triangle-down（倒三角），可以查看 drawing_shapes 获取更多形状

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/EBka0dZichyxXyC6DCHrkC1lDEpwGcRYWLf0tbFmbKwpFv9J0jVzibCDh3dpJqM0zFSRkZribQz5O16XMiafBiazfIw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)