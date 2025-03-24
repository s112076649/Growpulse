#!/bin/bash

# 定义颜色
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # 重置颜色

echo -e "${BLUE}=====================================${NC}"
echo -e "${BLUE}开始构建应用程序...${NC}"
echo -e "${BLUE}=====================================${NC}"

# 确保在正确的目录
cd /Users/kh/Desktop/growthbook-main

# 构建应用程序
echo -e "${GREEN}构建共享包...${NC}"
cd packages/shared && yarn build --skipLibCheck && cd ../..

echo -e "${GREEN}构建后端...${NC}"
cd packages/back-end && yarn build --skipLibCheck && cd ../..

echo -e "${GREEN}构建完成！${NC}" 