# CWRU Data Experiment
CWRU数据实验部署运行说明

## Overview
- [CWRU Data Experiment](#cwru-data-experiment)
  - [Overview](#overview)
  - [Changelog](#changelog)
  - [Setup](#setup)
    - [Install Python](#install-python)
    - [Setup a Conda environment](#setup-a-conda-environment)
    - [Install required packages](#install-required-packages)
  - [Getting start](#getting-start)
  - [Extension](#extension)
    - [Setup](#setup-1)
    - [Run](#run)
  - [Others](#others)
  - [License](#license)


## Changelog
- Apr. 16, 2020: v0.5.0: 完成了小程序的后端API。
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
我们使用 Anaconda 开源的Python包管理器。有关conda环境使用，可以参照[官方网站](https://www.anaconda.com/)。

创建一个名为`CWRU`的新Conda环境
```
conda create --name cwru python=3.7
```
如果您位于虚拟环境中，则shell提示符应类似于：`(cwru) user@computer:~$` 如果不是，则可以使用以下命令启用虚拟环境：
```
conda activate cwru 
```
要停用虚拟环境，请使用：
```
source cwru
```
### Install required packages
要安装所需的包，请在您喜欢的虚拟环境中运行以下命令：
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
参照以下的目录结构:
```
第10组
.
├── code
│   ├── data
│   │   ├── train
│   │   └── test2
│   ├── main.ipynb
│   └── requirements.txt
├── othercode
│   └── other.ipynb
├── result.csv
├── cwru.model
└── Readme.md
```
运行`code/main.ipynb`，内含部分代码的讲解。

## Extension
除了 `main.ipynb` 中的 `RandomForestClassifier`，我们也尝试了其他分类器。
### Setup
使用其他分类器可能还需要安装：
```
tensorflow=2.0.0
mkl=2019.5
```
### Run
运行 `code/other.ipynb` 即可，但是由于实验最终没有采用那些分类器并调参，可能没有很好的分类结果。

## Others
我们也在自己的服务器上搭建了API。详细后端代码可以参考`othercode`文件夹内的`.py`代码。也可以参照我们的[部分API文档]()。

## License
© Ryan, Released under the MIT License.