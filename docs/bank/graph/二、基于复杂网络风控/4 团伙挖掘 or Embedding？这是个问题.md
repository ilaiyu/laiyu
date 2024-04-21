# 团伙挖掘 or Embedding？这是个问题。

原创 小伍哥 [小伍哥聊风控](javascript:void(0);) *2023-07-20 08:27* *浙江*

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/EBka0dZichyztfDzeXwD7KaNZCopkjUx3jmmkHlNKmNd9MUTic3HAdQjokEg7Y8UINvOw7TMBzkztMYD9z4v3wGg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

作为风控人，处理团伙数据，可以说是家常便饭了，如果你还没做过团伙，那肯能还没接触到真正的风控，面临的选择就是直接的**团伙挖掘**还是做**Embedding**？经常不好选择，今天找个案例，通过明确的可视化的形式，给大家体会下。

数据集用我风控课程里面的一个案例（*[课程链接](http://mp.weixin.qq.com/s?__biz=MzA4OTAwMjY2Nw==&mid=2650194530&idx=1&sn=efd11e7567127617783a890e97c617a7&chksm=8823e5a6bf546cb0dea88ccce092181d6417a540d26ec06333de0fe10c6d6a60ac505a483818&scene=21#wechat_redirect)*），大家从感官上体验下两种方法的差异性，以便进行选择。

先加载下必要的包，如果没有的话，自行下载。

```python
import networkx as nx
import matplotlib.pyplot as plt
from node2vec import Node2Vec
import pandas as pd
from   faker import Faker
fake = Faker(locale='zh_CN')
```

我们来生成一个图数据，搞个复杂点的异构图（包含**手机号、邮箱、IP地址、用户ID四种节点**），太简单了和实际业务有差异

```python
#用faker库,构建一个数据集，如果没有，需要提前安装 pip install Faker
import pandas as pd
from   faker import Faker
fake = Faker(locale='zh_CN')

# 我们构建三个关系，4个节点的异构图
uid = ['uid_'+str(fake.random_int(10000, 10012)) for i in range(0,12)]
ip = ['ip_'+fake.ipv4() for i in range(0,4)]*3
uid1  = ['uid_'+str(fake.random_int(10000, 10100)) for i in range(0,100)]
email = ['em_'+fake.email() for i in range(0,50)]*2
phone = ['ph_'+fake.phone_number() for i in range(0,100)]*1

df1 = pd.DataFrame({
    'sr':uid,
    'ds':ip
})
df2 = pd.DataFrame({
    'sr':uid1,
    'ds':email
     })
df3 = pd.DataFrame({
    'sr':email,
    'ds':phone
     })
# 四个节点、三种关系合并
df = pd.concat([df1,df2,df3])

# 对数据进行聚合
df = df.groupby(['sr','ds']).agg({'ds': ['count']}).reset_index()
```

**来看看我们生成的图长什么样子的**

```
#图数据转换
da = df.values
G  = nx.Graph()
for num in range(len(da)):
    G.add_edge(str(da[num,0]),str(da[num,1]))
#显示图片
colors = ['#008B8B','b','orange','y','c','DeepPink','#838B8B','purple','olive','#A0CBE2','#4EEE94']*50
colors = colors[0:len(G.nodes())]

#显示该graph - spring_layout
plt.figure(figsize=(4,4),dpi=400)
nx.draw_networkx(G,
                 pos = nx.spring_layout(G),
                 node_color = colors,
                 font_color = 'DeepPink',
                 node_size=15,
                 font_size=2,
                 alpha=1.0,
                 width=0.1
                 )
plt.axis('off')
#plt.title("spring_layout")
plt.show()
```



![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/EBka0dZichyztfDzeXwD7KaNZCopkjUx3WF2JOnQCac4BxcGs34zgcPpbwhWS8raE2kMAiaic14qtibicchbGGIn1Zg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

大家可以看到，生成的图还是挺复杂的，我们现在开始做团伙的挖掘，用最简单的最大连通子图算法

```python
# 找到所有连通子图
com = list(nx.connected_components(G))

# 打印看看什么格式的，可以看到得到的结果为列表-字典格式
print(com)

# 将 列表-字典 整理成数据表格形式
df_com  = pd.DataFrame()
for i in range(0, len(com)):
    d = pd.DataFrame({'group_id': [i] * len(com[i]), 'object_id': list(com[i])})
    df_com = pd.concat([df_com,d])

# 查看数据结果
df_com

# 统计每个团伙人数 并降序
df_com.groupby('group_id').count().sort_values(by='object_id', ascending=False)         
0                85
1                58
4                17
3                 9
5                 5
7                 5
8                 5
10                5
df_com[df_com['group_id']==4]
```

可以看到分成了10个团伙，最大的85个人，最小的5人，我们再来训练节点向量，后面好做详细的对比



```
node2vec = Node2Vec(G, 
                    dimensions=64, 
                    walk_length=30, 
                    num_walks=200, 
                    workers=4
                    ) # Use temp_folder for big graphs

# Embed nodes
model = node2vec.fit(window=10, 
                     min_count=1, 
                     batch_words=4
                     )
```



我们来看看同一个团伙的相似性

```

# 统计每个团伙人数 并降序 我们看看每个团伙d数量和明细
df_com.groupby('group_id').count().sort_values(by='object_id', ascending=False) 
df_com[df_com['group_id']==4]
```

- 

```
# Look for most similar nodes
model.wv.most_similar('uid_10033',
                      topn = 20
                      ) 

[('uid_10041', 0.9586275815963745),
 ('ph_15242591111', 0.9586054086685181),
 ('ph_14507745078', 0.9538685083389282),
 ('em_guiying73@example.net', 0.9522542357444763),
 ('ph_13768600694', 0.9488211870193481),
 ('em_yong24@example.org', 0.9449688196182251),
 ('ph_15761064136', 0.9396862983703613),
 ('uid_10015', 0.9099156856536865),
 ('em_min25@example.net', 0.8340558409690857),
 ('ph_14514331094', 0.8094121217727661),
 ('ph_18668752538', 0.8056728839874268),
 ('uid_10045', 0.791681170463562),
 ('em_shaofang@example.org', 0.6886488199234009),
 ('uid_10027', 0.6832790970802307),
 ('ph_14535417006', 0.680618941783905),
 ('ph_13056284728', 0.6726599931716919),
 ('ph_18567983883', 0.43192121386528015),
 ('ph_15288731251', 0.4308112561702728),
 ('uid_10089', 0.4301893413066864),
 ('uid_10010', 0.42971858382225037)]
```

可以看到：最近的是**uid_10041**，比直接接壤的 **em_guiying73@example.net**要高，感觉就是扁担两端的比桥梁略高一点，整体差异不大，就是离得近的越相似。离得远的越不相似。uid_10010、uid_10089甚至都不在一个社群里面

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/EBka0dZichyztfDzeXwD7KaNZCopkjUx3qOfeEq0YfUusudR28NsX68rVpdlHPYvZcWJIdSAPfs9PTbEtzGWMtw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)





```

#看看图上离得最远的两个伙伴相似度
model.wv.similarity('ph_18609158237','ph_13598935989')
0.8747926

#看看两个用户的距离 可以看到，还是非常近的
model.wv.similarity('uid_10077','uid_10039')
0.9642026
```

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/EBka0dZichyztfDzeXwD7KaNZCopkjUx3ngCgRg83o383DBGicDuDX4icNJRysltIp4s891QlOym5WmQ5JyBj0flg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

我们再找个更大的图看看，单个团伙的拆分可视化diam我放后面

```
#看看两个最远的，左上角和右下角的，可以看到，相似度很低
model.wv.similarity('uid_10004','uid_10096')
0.36086872
#再在中间挑两个离得近的，可以看到，相似度高
model.wv.similarity('uid_10001','uid_10003')
0.9128927
```

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/EBka0dZichyztfDzeXwD7KaNZCopkjUx3QNwhqVa5WiavA9y6Yt2ubazHCuy6KicVjc8XwibuCkEalKOvmXeDvSMow/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

单个团伙可视化代码

```python
from   pandasql import sqldf
df.columns = ['sr','ds','cnt']

### 单个团伙关系提取
query = '''
select 
sr,
ds
from
(select 
sr,
ds
from df
)a

left join
(select
group_id,
object_id
from df_com
where group_id=0
) b 
on a.sr = b.object_id

left join
(select
group_id,
object_id
from df_com
where group_id=0
) c 
on a.ds = c.object_id
where b.object_id is not null and c.object_id is not null
'''
ls = sqldf(query)
ls
```

- 

```python

# 社区还原并可视化
da = ls[['sr','ds']].values
G  = nx.Graph()
for num in range(len(da)):
    G.add_edge(str(da[num,0]),str(da[num,1]))

#显示图片
plt.figure(figsize=(4,3),dpi=300)

colors = ['#008B8B','r','b','orange','y','c','DeepPink','#838B8B','purple','olive','#A0CBE2','#4EEE94']*50
colors = colors[0:len(G.nodes())]

#kamada_kawai_layout spring_layout
nx.draw_networkx(G,
                 pos = nx.spring_layout(G),
                 node_color = colors,
                 edge_color = colors,
                 font_color = 'DeepPink',
                 node_size = 100,
                 font_size = 5,
                 alpha = 0.95,
                 width = 0.5,
                 font_weight=0.9
                 )
plt.axis('off')
plt.show()
```

文章到这里基本上就结束了，我们可以得出下面的结论：

在图中，embedding的时候，越远相似性越低，并没有考虑结构和特征啥的，但是向量化后可以用作分类任务或者与其他特征融合

在团伙挖掘中，每个节点都是等价的，也是容易误杀。

对比下来，两个算法基本上都可以用，但是效果不是最好的，那能填补这两个缺点的，就只有图神经网络了。大家卷起来吧。