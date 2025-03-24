#!/bin/bash

# 检查是否提供了新名称参数
if [ $# -eq 0 ]; then
  echo "请提供新的应用名称，例如: ./rename-imports.sh MyAppName"
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
echo -e "${GREEN}更新导入语句${NC}"
echo -e "${GREEN}=====================================${NC}"

# 更新前端导入
echo -e "${YELLOW}更新前端导入语句...${NC}"
find packages/front-end -type f -name "*.tsx" -exec sed -i '' "s/@growthbook\/growthbook-react/@${NEW_NAME_LOWERCASE}\/${NEW_NAME_LOWERCASE}-react/g" {} \;
find packages/front-end -type f -name "*.ts" -exec sed -i '' "s/@growthbook\/growthbook-react/@${NEW_NAME_LOWERCASE}\/${NEW_NAME_LOWERCASE}-react/g" {} \;
find packages/front-end -type f -name "*.tsx" -exec sed -i '' "s/@growthbook\/growthbook/@${NEW_NAME_LOWERCASE}\/${NEW_NAME_LOWERCASE}/g" {} \;
find packages/front-end -type f -name "*.ts" -exec sed -i '' "s/@growthbook\/growthbook/@${NEW_NAME_LOWERCASE}\/${NEW_NAME_LOWERCASE}/g" {} \;

# 更新后端导入
echo -e "${YELLOW}更新后端导入语句...${NC}"
find packages/back-end -type f -name "*.ts" -exec sed -i '' "s/@growthbook\/growthbook/@${NEW_NAME_LOWERCASE}\/${NEW_NAME_LOWERCASE}/g" {} \;

# 更新SDK导入
echo -e "${YELLOW}更新SDK导入语句...${NC}"
find packages/sdk-js -type f -name "*.ts" -exec sed -i '' "s/from \"growthbook\"/from \"${NEW_NAME_LOWERCASE}\"/g" {} \;
find packages/sdk-react -type f -name "*.ts" -exec sed -i '' "s/@growthbook\/growthbook/@${NEW_NAME_LOWERCASE}\/${NEW_NAME_LOWERCASE}/g" {} \;

# 创建符号链接
echo -e "${YELLOW}更新模块链接...${NC}"
mkdir -p ./node_modules/@${NEW_NAME_LOWERCASE}
ln -sf $(pwd)/packages/sdk-js ./node_modules/@${NEW_NAME_LOWERCASE}/${NEW_NAME_LOWERCASE}
ln -sf $(pwd)/packages/sdk-react ./node_modules/@${NEW_NAME_LOWERCASE}/${NEW_NAME_LOWERCASE}-react

echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}导入语句更新完成!${NC}"
echo -e "${GREEN}=====================================${NC}" 