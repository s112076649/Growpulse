#!/bin/bash

# 检查是否提供了新名称参数
if [ $# -eq 0 ]; then
  echo "请提供新的应用名称，例如: ./update-quick-start.sh MyAppName"
  exit 1
fi

# 获取新名称
NEW_NAME=$1
NEW_NAME_LOWERCASE=$(echo $NEW_NAME | tr '[:upper:]' '[:lower:]')

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}更新快速启动脚本${NC}"
echo -e "${GREEN}=====================================${NC}"

# 创建新的快速启动脚本
cat > quick-start-new.sh << EOF
#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 输出标题
echo -e "\${GREEN}=====================================\${NC}"
echo -e "\${GREEN}快速启动${NEW_NAME}\${NC}"
echo -e "\${GREEN}=====================================\${NC}"

# 创建模块链接
echo -e "\${YELLOW}创建模块链接...\${NC}"
mkdir -p ./node_modules/@${NEW_NAME_LOWERCASE}
ln -sf \$(pwd)/packages/sdk-js ./node_modules/@${NEW_NAME_LOWERCASE}/${NEW_NAME_LOWERCASE}
ln -sf \$(pwd)/packages/sdk-react ./node_modules/@${NEW_NAME_LOWERCASE}/${NEW_NAME_LOWERCASE}-react

# 安装缺少的依赖
echo -e "\${YELLOW}安装缺少的依赖...\${NC}"
cd packages/back-end
yarn add passport passport-local --silent
cd ../..

# 启动后端服务
echo -e "\${YELLOW}启动后端服务...\${NC}"
cd packages/back-end
yarn dev &
BACKEND_PID=\$!

# 等待后端启动
echo -e "\${YELLOW}等待后端启动 (10秒)...\${NC}"
sleep 10

# 启动前端服务
echo -e "\${YELLOW}启动前端服务...\${NC}"
cd ../front-end
yarn dev &
FRONTEND_PID=\$!

# 输出访问信息
echo -e "\${GREEN}=====================================\${NC}"
echo -e "\${GREEN}${NEW_NAME}已启动!\${NC}"
echo -e "\${GREEN}前端地址: \${YELLOW}http://localhost:3002\${NC}"
echo -e "\${GREEN}后端地址: \${YELLOW}http://localhost:3100\${NC}"
echo -e "\${GREEN}=====================================\${NC}"
echo -e "按 \${YELLOW}Ctrl+C\${NC} 停止服务"

# 等待用户按Ctrl+C
wait \$BACKEND_PID \$FRONTEND_PID
EOF

# 添加执行权限
chmod +x quick-start-new.sh

# 备份旧脚本并替换
mv quick-start.sh quick-start-backup.sh
mv quick-start-new.sh quick-start.sh

echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}快速启动脚本已更新!${NC}"
echo -e "${GREEN}=====================================${NC}" 