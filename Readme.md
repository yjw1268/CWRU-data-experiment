# CWRU Data Experiment
CWRU数据实验部署运行说明。

## Contents
- [CWRU Data Experiment](#cwru-data-experiment)
  - [Contents](#contents)
  - [Overview](#overview)
  - [Structure](#structure)
  - [Changelog](#changelog)
  - [Setup](#setup)
    - [Install Python](#install-python)
    - [Setup a Conda environment](#setup-a-conda-environment)
    - [Install required packages](#install-required-packages)
  - [Getting start](#getting-start)
    - [Download](#download)
    - [Operation](#operation)
  - [Extension](#extension)
    - [Setup](#setup-1)
    - [Run](#run)
  - [What's more](#whats-more)
  - [Contact](#contact)
  - [License](#license)


## Overview
BUPT移动互联网课设2020春季学期大作业代码。

## Structure
代码总体参照以下的目录结构:

```
10
.
├── code
│   ├── data
│   │   ├── train
│   │   │   └── ...
│   │   └── test2
│   │       └── ...
│   ├── main.ipynb
│   ├── other.ipynb
│   └── requirements.txt
├── othercode
│   └── ...
├── wxapp
│   ├── ...
│   └── README.md
├── result.csv
├── cwru.model
└── Readme.md
```

## Changelog
- May. 12, 2020: v0.6.0: 添加了微信小程序前端代码。
- Apr. 16, 2020: v0.5.0: 完成了小程序的部分后端API。
- Apr. 13, 2020: v0.4.1: 输出了TEST2的答案，并调参。
- Mar. 31, 2020: v0.3.7: 提高了TEST1分数。
- Mar. 26, 2020: v0.3.1: 输出了TEST1的答案，并调优。
- Mar. 25, 2020: v0.2.0: 测试了多个分类器。
- Mar. 22, 2020: v0.1.5: 进行时间窗优解测试。
- Mar. 21, 2020: v0.1.2: 特征提取、分类模型粗略完成。
- Mar. 19, 2020: v0.0.5: 数据预处理测试。
- Mar. 18, 2020: v0.0.1: 环境创建调试。

## Setup
如果您已经配置好了python有关环境，可以直接跳到本节的[Install required packages](#install-required-packages)

### Install Python
已针对Python 3.6及更高版本进行了测试，但我们建议使用Python 3.7。对于Ubuntu：如果您的系统上尚未安装正确的Python版本，请运行以下命令进行安装：

```
sudo apt install python-pip
sudo apt-get update
sudo apt-get install python3.7
```

### Setup a Conda environment
我们使用 Anaconda 开源的Python包管理器。有关 Conda 环境使用，可以参照[官方网站](https://www.anaconda.com/)。

创建一个名为`CWRU`的新Conda环境

```
conda create --name cwru python=3.7
```

如果您位于虚拟环境中，则shell提示符应类似于：`(cwru) user@computer:~$` 如果不是，则可以使用以下命令启用虚拟环境：

```
source activate cwru 
```

要停用虚拟环境，请使用：

```
source deactivate
```

### Install required packages
要安装所有的包，请在您喜欢的虚拟环境中运行以下命令：

```
pip install -r requirements.txt
```

或者手动安装下列您可能缺少的包：

```
pandas=1.0.1
scikit-learn=0.22.1
scipy=1.3.1
numpy=1.17.3
matplotlib=3.1.2
seaborn=0.10.0
pywavelets=1.1.1
```

如果您需要使用 `Jupyter Notebook`，还可能需要安装：

```
ipykernel=5.1.3
ipython=7.9.0
jupyter=1.0.0
```

## Getting start
### Download
我们建议使用Git下载代码：
```
git clone https://github.com/yjw1268/CWRU-data-experiment.git
```

### Operation
运行`code/main.ipynb`，内含部分代码的讲解。如需加载模型`cwru.model`验证，可以直接跳到最后一部分。

*运行过程中可能会生成一些临时文件。需要注意的是，由于我们采用了 K折交叉验证 `KFold`，给出的运行参考的结果可能会与您实际运行的略有不同。*

## Extension
在 `main.ipynb` 中，除了最终生成model的 `RandomForestClassifier`，我们也尝试了其他分类器：

```
DecisionTreeClassifier
SGDClassifier
```

### Setup
在`code/main.ipynb`中，如果您想复现除了我们最终提交的`.model`以外的分类器，可能还需要安装：

```
tensorflow=2.0.0
mkl=2019.5
```

*如果您只需要复现我们的最终结果，可以无需安装这些。同时，我们也在 Jupyter Notebook 中给出了运行参考结果。*

### Run
运行 `code/main.ipynb` 中**开始分析数据**部分中的代码即可，但是由于实验最终并没有采用那些分类器并调参，可能没有很好的分类结果。

*需要注意的是，由于我们采用了 K折交叉验证 `KFold`，给出的运行参考的结果可能会与您实际运行的略有不同。*

## What's more
除了[PHM](http://www.phmlearn.com/api/get_list/3)网站提供的以外，我们也在自己的[服务器](https://www.bupt404.cn/)上搭建了API。部分后端代码例子可以参考`othercode`文件夹内的`.py`代码。也可以参照我们的[部分API文档](https://documenter.getpostman.com/view/10553949/SzKZrbDE?version=latest)。（仍在更新中）

## Contact
如果您有问题或者建议，欢迎访问开发者 [网站](https://www.bupt404.cn/)，[邮箱](mailto:yjw981213@163.com)，[Issues](https://github.com/yjw1268/CWRU-data-experiment/issues)联系。

## License
© Ryan, Released under the [MIT](https://github.com/yjw1268/CWRU-data-experiment/blob/master/LICENSE) License.