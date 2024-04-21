# dtreeviz，一个申请的Python库

原创 小伍哥 [小伍哥聊风控](javascript:void(0);) *2024-02-04 12:03* *浙江*

在视频号发了个决策树可视化的视频，要代码的同学还挺多的，在这里把这个代码分享下。这是个10分类的决策树，标题打错了，应该是神奇。😂😂



决策树，几乎是最经典的算法了，并且很多常用的集成树模型，都是基于决策树构建的。因此对决策树的理解，显得非常重要。可视化是比较好理解的形式了。

决策树中，决定树的复杂程度，是树的深度和叶子节点最小样本数。也就是下面这两个参数：max_depth 和 min_samples_leaf

```
## 决策树的可视化

from sklearn.datasets import load_iris,load_wine,load_breast_cancer
from sklearn.tree     import DecisionTreeClassifier
from  sklearn import datasets
import dtreeviz


df = datasets.load_digits()
X = df.data
Y = df.target

clf = DecisionTreeClassifier(
    max_depth=8,
    min_samples_leaf=50
    )
clf.fit(X, Y)

viz_model = dtreeviz.model(clf,
                           X_train = X, 
                           y_train = Y,
                           feature_names = df.feature_names,
                           target_name   = 'label',
                           class_names   = df.target_names
                          )


viz_model.view()

v = viz_model.view()     # render as SVG into internal object 
v.show()                 # pop up window
v.save("digits.svg")  # optionally save as svg
viz_model.view()
```

得到如下的图，目前的深度比较小，叶子最小样本数比较多，因此树比较简单。

![图片](https://mmbiz.qpic.cn/mmbiz_svg/N4HWkmwbSVS5picN193pwQGwPJ8MoChjYcfLMrPNwghDeJEw2Mq3gXp2MEssZMrlZgvqNNNIhu3HLSBu5UbeV8O1aLr0exMKs/640?wx_fmt=svg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

我们再画复杂点的图：

- 

```
## 决策树的可视化

from sklearn.datasets import load_iris,load_wine,load_breast_cancer
from sklearn.tree     import DecisionTreeClassifier
from  sklearn import datasets
import dtreeviz


df = datasets.load_digits()
X = df.data
Y = df.target

clf = DecisionTreeClassifier(
    max_depth=8,
    min_samples_leaf=10
    )
clf.fit(X, Y)

viz_model = dtreeviz.model(clf,
                           X_train = X, 
                           y_train = Y,
                           feature_names = df.feature_names,
                           target_name   = 'label',
                           class_names   = df.target_names
                          )


viz_model.view()

v = viz_model.view()     # render as SVG into internal object 
v.show()                 # pop up window
v.save("digits.svg")  # optionally save as svg
viz_model.view()
```

根本放不下，我们切断看看

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/EBka0dZichyze6ibAWTeI3T8hdEZiaibXJz1aWGTMy3iaCD0kOM2avKgkSLB3x3iaGU5ArvKHYgl0Q6Ev0tosck7HGhw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/EBka0dZichyze6ibAWTeI3T8hdEZiaibXJz17lufHZziaWCFbNRwdbnTkMzYbxXjj4eIIhPlOVdBo8NVamfRSEEeaXg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

还有没有更复杂的？

- 

```
## 决策树的可视化

from sklearn.datasets import load_iris,load_wine,load_breast_cancer
from sklearn.tree     import DecisionTreeClassifier
from  sklearn import datasets
import dtreeviz


df = datasets.load_digits()
X = df.data
Y = df.target

clf = DecisionTreeClassifier(
    max_depth=12,
    min_samples_leaf=5
    )
clf.fit(X, Y)

viz_model = dtreeviz.model(clf,
                           X_train = X, 
                           y_train = Y,
                           feature_names = df.feature_names,
                           target_name   = 'label',
                           class_names   = df.target_names
                          )


viz_model.view()

v = viz_model.view()     # render as SVG into internal object 
v.show()                 # pop up window
v.save("digits.svg")  # optionally save as svg
viz_model.view()
```



![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/EBka0dZichyze6ibAWTeI3T8hdEZiaibXJz1sNcSaJpMxSf6Waqu3OxdKpbeXb4cqVqVFZ9Lw8taLBqe1xJSN4o4bQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/EBka0dZichyze6ibAWTeI3T8hdEZiaibXJz1q7CVZ6EXA6h03BrHQx1OZM70FHFibgByBOlKbukicqLe4beWtoeqHDKA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/EBka0dZichyze6ibAWTeI3T8hdEZiaibXJz11HE1Gax5dFJgD8KWrQFYZ1qJBMZ1PW7W51uWRibFibjgcNG1365Ht8hA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/EBka0dZichyze6ibAWTeI3T8hdEZiaibXJz1ZMrsFwkrice2COia3RXdeH8U2fdRY7RPb3tFDza4jvhJy6pIXByw9csg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)