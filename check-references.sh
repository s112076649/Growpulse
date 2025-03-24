#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}开始检查代码库中是否还有GrowthBook的引用...${NC}"

# 检查代码文件中的引用
find . -type f -not -path "*/node_modules/*" -not -path "*/dist/*" -not -path "*/.git/*" -not -path "*/\.*" \
  -exec grep -l "growthbook" --include="*.{js,jsx,ts,tsx,md,mdx,json,html,css,scss}" {} \; > /tmp/growthbook_references.txt

COUNT=$(cat /tmp/growthbook_references.txt | wc -l | tr -d '[:space:]')

if [ "$COUNT" -gt 0 ]; then
    echo -e "${RED}发现 $COUNT 个文件中仍然包含 'growthbook' 的引用:${NC}"
    cat /tmp/growthbook_references.txt
    echo -e "\n${YELLOW}请检查这些文件并更新引用。${NC}"
    
    # 询问是否需要显示详细的匹配内容
    read -p "是否需要显示详细的匹配内容? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}详细的匹配内容:${NC}"
        for file in $(cat /tmp/growthbook_references.txt); do
            echo -e "\n${GREEN}文件: $file${NC}"
            grep -n "growthbook" "$file" | head -n 10 # 只显示前10行匹配
            MATCH_COUNT=$(grep -c "growthbook" "$file")
            if [ "$MATCH_COUNT" -gt 10 ]; then
                echo -e "... 还有更多 $(($MATCH_COUNT - 10)) 处匹配 ..."
            fi
        done
    fi
else
    echo -e "${GREEN}太好了! 没有找到任何 'growthbook' 的引用。${NC}"
fi

# 检查包名中的引用
echo -e "\n${YELLOW}检查package.json文件中的依赖引用...${NC}"
find . -name "package.json" -not -path "*/node_modules/*" -exec grep -l "@growthbook" {} \; > /tmp/growthbook_packages.txt

COUNT=$(cat /tmp/growthbook_packages.txt | wc -l | tr -d '[:space:]')

if [ "$COUNT" -gt 0 ]; then
    echo -e "${RED}发现 $COUNT 个package.json文件中仍然包含 '@growthbook' 依赖:${NC}"
    cat /tmp/growthbook_packages.txt
    echo -e "\n${YELLOW}请检查这些文件并更新引用。${NC}"
    
    # 显示详细的依赖信息
    echo -e "${YELLOW}详细的依赖信息:${NC}"
    for file in $(cat /tmp/growthbook_packages.txt); do
        echo -e "\n${GREEN}文件: $file${NC}"
        grep -n "@growthbook" "$file"
    done
else
    echo -e "${GREEN}太好了! 没有找到任何 '@growthbook' 的依赖引用。${NC}"
fi

echo -e "\n${YELLOW}检查完成。${NC}" 