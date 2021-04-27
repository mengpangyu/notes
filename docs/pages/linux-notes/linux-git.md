# git 配置

## 设置基本信息

```shell script
git config --global user.name 你的英文名
git config --global user.email 你的邮箱
git config --global push.default simple
git config --global core.quotepath false
git config --global core.editor vim 
git config --global core.autocrlf input
```

## 设置别名 

```shell script
touch ~/.bashrc
echo 'alias ga="git add"'>> ~/.bashrc
echo 'alias gb="git branch"'>> ~/.bashrc
echo 'alias gc="git commit -m"'>> ~/.bashrc
echo 'alias gl="git pull"'>> ~/.bashrc
echo 'alias gp="git push"'>> ~/.bashrc
echo 'alias gco="git checkout"'>> ~/.bashrc
echo 'alias gst="git status -sb"'>> ~/.bashrc
echo 'alias ghard="git reset --hard"'>> ~/.bashrc
```

打开 ~/.bashrc 写入

```shell script
alias glog="git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit -- | less"
```
## 基础命令

添加文件到缓存

```shell script
git add 文件名 # 添加文件
```

提交缓存中文件到本地仓库

```shell script
git commit -m 提交信息 # 不打开编辑工具
git commit -v 提交信息 # 打开指定的编辑工具
```

查看文件状态 

```shell script
git status -sb # 查看文件状态
```

查看commit提交信息

```shell script
git log # 查看commit
```

提交到远程仓库

```shell script
git push # 拉取代码
```

从远程仓库拉取代码

```shell script
git pull # 拉取代码

git pull === git fetch; git merge; # 这两个命令等价
```

> 解决冲突, 分割线上方是本地代码, 下方是远程代码

暂存代码

```shell script
git stash # 切换分支时可以暂存代码
```

分支

```shell script
git branch 分支名 # 创建分支

git branch -d 分支名 # 删除分支

git checkout 分支名 # 切换分支

git chekcout -b 分支名 # 创建并切换分支

git merge 分支名 # 合并分支, 保留原来的 commit 保持修改内容的历史记录, 但是历史记录会很复杂

git rebase 分支名 # 合并分支, 与 master 上的 commit 合并 历史记录简单, 是在原有提交的基础上将差异内容反映进去
```

标签

```shell script
git tag 标签名 # 轻标签

git tag # 查看标签

git log # 查看commit和标签

git tag -am 标签注解 标签名 # 注解标签

git tag -n # 显示标签注解和列表

git tag -d 标签名 # 删除标签
```

修改 commit 

```shell script
git commit --amend # 修改最近一次的提交

git revert commit号 # 取消指定的提交

git reset --hard/soft/mixed commit号 # 回到之前的提交

git cherry-pick commit号 # 可以从其他分支上复制提交

git rebase -i commit号 # 合并提交 squash

git rebase -i commit号 # 修改提交 edit

git merge --squash 分支名 # 可以把分支上的多个 commit 合并成一个加到 master
```
















