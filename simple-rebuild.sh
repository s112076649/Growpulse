#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}开始GrowPulse学习版设置...${NC}"

# 步骤1: 清理node_modules
echo -e "${YELLOW}步骤1: 清理node_modules...${NC}"
find . -name "node_modules" -type d -exec rm -rf {} +
echo -e "${GREEN}清理完成!${NC}"

# 步骤2: 仅安装根目录依赖
echo -e "${YELLOW}步骤2: 安装根目录依赖...${NC}"
yarn install || {
  echo -e "${RED}依赖安装失败，请检查错误信息${NC}"
  exit 1
}
echo -e "${GREEN}依赖安装完成!${NC}"

# 步骤3: 安装全局工具
echo -e "${YELLOW}步骤3: 安装全局工具...${NC}"
yarn global add wsrun || {
  echo -e "${RED}wsrun安装失败，尝试使用npm全局安装...${NC}"
  npm install -g wsrun || {
    echo -e "${RED}wsrun安装失败，请手动安装后重试${NC}"
    exit 1
  }
}
echo -e "${GREEN}wsrun安装完成!${NC}"

# 步骤4: 检查是否已激活核心功能
echo -e "${YELLOW}步骤4: 检查学习版配置...${NC}"
if grep -q "feature === \"schedule-feature-flag\"" packages/shared/src/enterprise/licenseUtil.ts; then
  echo -e "${GREEN}学习版配置已应用!${NC}"
else
  echo -e "${RED}学习版配置未应用，请先运行 ./selective-features.sh${NC}"
  exit 1
fi

echo -e "${GREEN}GrowPulse学习版基础设置完成!${NC}"
echo -e "${YELLOW}接下来您可以运行:${NC}"
echo -e "${YELLOW}1. yarn build     # 构建应用${NC}"
echo -e "${YELLOW}2. yarn dev       # 运行开发服务器${NC}" 