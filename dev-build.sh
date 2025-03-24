#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 切换到项目根目录
cd /Users/kh/Desktop/growthbook-main

# 输出标题
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}开发模式构建（忽略类型检查）${NC}"
echo -e "${GREEN}=====================================${NC}"

# 安装依赖
echo -e "${YELLOW}安装依赖...${NC}"
yarn install

# 构建共享包
echo -e "${YELLOW}构建共享包...${NC}"
cd packages/shared
yarn build:clean
yarn build:typescript --skipLibCheck

# 构建前端
echo -e "${YELLOW}构建前端...${NC}"
cd ../front-end
yarn build

# 完成
echo -e "${GREEN}构建完成！${NC}"
echo -e "现在可以使用 ${YELLOW}yarn dev${NC} 启动开发服务器" 