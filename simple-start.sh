#!/bin/bash

# 定义颜色
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # 重置颜色

echo -e "${BLUE}=====================================${NC}"
echo -e "${BLUE}启动GrowthBook应用程序...${NC}"
echo -e "${BLUE}=====================================${NC}"

# 启动应用程序
echo -e "${GREEN}启动应用程序...${NC}"
yarn dev 