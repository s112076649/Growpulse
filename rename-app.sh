#!/bin/bash

# 检查是否提供了新名称参数
if [ $# -eq 0 ]; then
  echo "请提供新的应用名称，例如: ./rename-app.sh MyAppName"
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
echo -e "${GREEN}将应用从GrowthBook重命名为${NEW_NAME}${NC}"
echo -e "${GREEN}=====================================${NC}"

# 更新package.json中的名称
echo -e "${YELLOW}更新package.json...${NC}"
sed -i '' "s/growthbook-app/${NEW_NAME_LOWERCASE}-app/g" package.json
sed -i '' "s/\"name\": \"growthbook\"/\"name\": \"${NEW_NAME_LOWERCASE}\"/g" packages/sdk-js/package.json
sed -i '' "s/\"name\": \"@growthbook\/growthbook-react\"/\"name\": \"@${NEW_NAME_LOWERCASE}\/${NEW_NAME_LOWERCASE}-react\"/g" packages/sdk-react/package.json

# 更新构建脚本和文档中的名称
echo -e "${YELLOW}更新脚本和文档...${NC}"
sed -i '' "s/GrowthBook/${NEW_NAME}/g" quick-start.sh
sed -i '' "s/GrowthBook/${NEW_NAME}/g" README-COMPLETE.md
sed -i '' "s/GrowthBook/${NEW_NAME}/g" USER-GUIDE.md
sed -i '' "s/GrowthBook/${NEW_NAME}/g" VERCEL-DEPLOY.md
sed -i '' "s/growthbook/${NEW_NAME_LOWERCASE}/g" vercel.json

# 更新设计系统
echo -e "${YELLOW}更新设计系统...${NC}"
sed -i '' "s/GrowthBook/${NEW_NAME}/g" design-system.md
sed -i '' "s/GrowthBook/${NEW_NAME}/g" chakra-theme.js

# 更新前端应用标题
echo -e "${YELLOW}更新前端标题...${NC}"
find packages/front-end -type f -name "*.tsx" -exec sed -i '' "s/GrowthBook/${NEW_NAME}/g" {} \;
find packages/front-end -type f -name "*.ts" -exec sed -i '' "s/GrowthBook/${NEW_NAME}/g" {} \;

echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}重命名完成!${NC}"
echo -e "${GREEN}应用已从GrowthBook重命名为${NEW_NAME}${NC}"
echo -e "${GREEN}=====================================${NC}"
echo -e "请运行 ${YELLOW}yarn install${NC} 更新依赖关系" 