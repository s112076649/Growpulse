#!/bin/bash

# 提示用户输入密码并修复npm权限
echo "请在终端输入您的管理员密码来修复npm权限问题"
sudo chown -R $(whoami) ~/.npm

# 安装设计工具
echo "正在安装设计工具..."
npm install -g lighthouse pageres-cli stylelint

echo "安装完成!" 