#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 输出标题
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}快速启动GrowPulse${NC}"
echo -e "${GREEN}=====================================${NC}"

# 创建模块链接
echo -e "${YELLOW}创建模块链接...${NC}"
mkdir -p ./node_modules/@growthbook
ln -sf $(pwd)/packages/sdk-js ./node_modules/@growthbook/growthbook
ln -sf $(pwd)/packages/sdk-react ./node_modules/@growthbook/growthbook-react

# 安装缺少的依赖
echo -e "${YELLOW}安装缺少的依赖...${NC}"
cd packages/back-end
yarn add passport passport-local --silent
cd ../..

# 启动后端服务
echo -e "${YELLOW}启动后端服务...${NC}"
cd packages/back-end
yarn dev &
BACKEND_PID=$!

# 等待后端启动
echo -e "${YELLOW}等待后端启动 (10秒)...${NC}"
sleep 10

# 启动前端服务
echo -e "${YELLOW}启动前端服务...${NC}"
cd ../front-end
yarn dev &
FRONTEND_PID=$!

# 输出访问信息
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}GrowPulse已启动!${NC}"
echo -e "${GREEN}前端地址: ${YELLOW}http://localhost:3002${NC}"
echo -e "${GREEN}后端地址: ${YELLOW}http://localhost:3100${NC}"
echo -e "${GREEN}=====================================${NC}"
echo -e "按 ${YELLOW}Ctrl+C${NC} 停止服务"

# 等待用户按Ctrl+C
wait $BACKEND_PID $FRONTEND_PID 