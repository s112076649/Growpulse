#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}开始迁移过程 GrowthBook -> GrowPulse${NC}"

# 步骤1: 清理node_modules和yarn.lock文件
echo -e "${YELLOW}步骤1: 清理node_modules和yarn.lock文件...${NC}"
find . -name "node_modules" -type d -exec rm -rf {} +
find . -name "yarn.lock" -type f -delete
echo -e "${GREEN}清理完成!${NC}"

# 安装必要的依赖
echo -e "${YELLOW}步骤1.5: 安装必要的工具...${NC}"
npm install -g yarn
yarn add -D wsrun
echo -e "${GREEN}工具安装完成!${NC}"

# 步骤2: 创建本地软链接以替代需要的包
echo -e "${YELLOW}步骤2: 创建本地包链接...${NC}"
mkdir -p ./node_modules/@growpulse
ln -sf $(pwd)/packages/sdk-js ./node_modules/@growpulse/growpulse
ln -sf $(pwd)/packages/sdk-react ./node_modules/@growpulse/growpulse-react
echo -e "${GREEN}本地包链接创建完成!${NC}"

# 步骤3: 重新安装依赖
echo -e "${YELLOW}步骤3: 重新安装依赖...${NC}"
yarn install --force || {
  echo -e "${RED}依赖安装失败，请检查错误信息${NC}"
  exit 1
}
echo -e "${GREEN}依赖安装完成!${NC}"

# 步骤4: 重新链接本地包
echo -e "${YELLOW}步骤4: 重新链接本地包...${NC}"
mkdir -p ./node_modules/@growpulse
ln -sf $(pwd)/packages/sdk-js ./node_modules/@growpulse/growpulse
ln -sf $(pwd)/packages/sdk-react ./node_modules/@growpulse/growpulse-react
echo -e "${GREEN}本地包链接更新完成!${NC}"

# 步骤5: 运行安装脚本
echo -e "${YELLOW}步骤5: 运行安装脚本...${NC}"
yarn setup || {
  echo -e "${RED}安装脚本运行失败，请检查错误信息${NC}"
  exit 1
}
echo -e "${GREEN}安装脚本运行完成!${NC}"

# 步骤6: 构建应用程序
echo -e "${YELLOW}步骤6: 构建应用程序...${NC}"
yarn build || {
  echo -e "${RED}构建失败，请检查错误信息${NC}"
  exit 1
}
echo -e "${GREEN}构建完成!${NC}"

echo -e "${GREEN}GrowPulse学习版设置完成!${NC}"
echo -e "${YELLOW}现在可以运行 'yarn dev' 启动应用程序${NC}" 