# Ubuntu 18.04 常用软件

## JDK

因个人原因需要安装 JKD8, 在这里安装

```bash
sudo apt update

sudo apt install openjdk-8-jdk

java -version
```

## Node.js

下载 12.x 版本

```bash
cd ~
curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -

sudo apt update

sudo apt install nodejs
```

卸载

```bash
sudo apt remove nodejs

sudo apt purge nodejs

sudo apt autoremove
```

## Android Studio

[中文 Android Studio 社区](http://www.android-studio.org/)

下载好 Android Studio 后根据 [React Native 官网配置](https://reactnative.cn/docs/environment-setup) 好 SDK

## VSCode

[vscode 官网](https://code.visualstudio.com/)

## Webstrom

[webstrom 官网](https://www.jetbrains.com/webstorm/)

下载解压后运行 bin/webstrom.sh

## Fira Code

```bash
sudo apt install fonts-firacode
```

## Charles

```bash
wget -q -O - https://www.charlesproxy.com/packages/apt/PublicKey | sudo apt-key add

sudo sh -c 'echo deb https://www.charlesproxy.com/packages/apt/ charles-proxy main > /etc/apt/sources.list.d/charles.list'

sudo apt-get update

sudo apt-get install charles-proxy
```

## Chrome

[官网下载](https://www.google.com/intl/en_hk/chrome/)

## utools

[官网下载](https://u.tools/)

## WPS

[官网下载](https://linux.wps.com/)

## XMind

[官网下载](https://www.xmind.net/xmind2020/)

## 百度网盘

[官网下载](https://pan.baidu.com/download)

## ibus 拼音(换输入法)

[ubuntu 自带](https://github.com/libpinyin/ibus-libpinyin)

## Chromium

[官网下载](https://www.chromium.org/)

## Ubuntu 美化

[Linux 玩家必备：Ubuntu 完全配置指南](https://zhuanlan.zhihu.com/p/56253982)

[[18.04/美化] 总结一下 Ubuntu 安装完之后都会做的事情](https://zhuanlan.zhihu.com/p/36200924)

[下载下拉终端插件需要完成美化后](https://ywnz.com/linuxjc/5735.html)

## 杂项

命令行安装 vim(使用方方的配置), curl, netstat
