#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 输出标题
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}启动前端开发服务器${NC}"
echo -e "${GREEN}=====================================${NC}"

# 切换到项目根目录
cd /Users/kh/Desktop/growthbook-main

# 启动前端开发服务器
echo -e "${YELLOW}启动前端开发服务器...${NC}"
cd packages/front-end
echo -e "${GREEN}✓ 开始启动${NC}"
yarn dev 