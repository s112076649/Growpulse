#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}===========================================${NC}"
echo -e "${BLUE}  GrowPulse 学习版功能配置工具  ${NC}"
echo -e "${BLUE}===========================================${NC}"
echo -e "${YELLOW}注意：本配置严格仅用于个人学习和研究目的${NC}"
echo -e "${RED}声明：不得用于任何商业用途或对外提供服务${NC}"

# 保留的高级功能列表
ALLOWED_FEATURES=(
  "schedule-feature-flag"
  "audit-logging"
  "teams"
  "regression-adjustment"
  "metric-populations"
  "multi-metric-queries"
)

echo -e "\n${YELLOW}将只启用以下功能供学习:${NC}"
for feature in "${ALLOWED_FEATURES[@]}"; do
  echo -e "  - ${GREEN}$feature${NC}"
done

# 创建使用说明文件目录
mkdir -p docs/learning

# 创建学习免责声明文件
cat > docs/learning/LEGAL_DISCLAIMER.md << EOF
# 法律免责声明

## 使用目的与范围

本项目中启用的功能**严格仅限**以下用途：

1. **个人学习**：了解现代特性管理和实验分析系统的工作原理
2. **教育研究**：用于教育环境中学习软件开发和数据分析概念
3. **技术探索**：研究功能标志和A/B测试技术的实现方法

## 法律声明

1. **版权尊重**：
   - 所有功能、代码和设计理念的知识产权归原开发者所有
   - 本项目不主张对这些功能的知识产权所有权
   - 保留原始版权和许可声明

2. **使用限制**：
   - **禁止商业使用**：不得用于任何商业目的或商业环境
   - **禁止分发**：不得向公众分发此修改版本
   - **禁止提供服务**：不得作为服务提供给他人使用

3. **修改范围**：
   - 仅为学习目的修改配置
   - 不更改基础功能实现
   - 不删除或修改版权声明

## 合规建议

如果您需要在商业环境中使用这些功能：
- 请购买原厂商提供的商业许可
- 联系原开发团队获取正式授权
- 支持原开发者的持续工作

## 法律依据

本声明基于：
- 著作权法中关于"合理使用"的规定
- 软件许可条款中对教育和研究用途的例外
- 知识产权保护和尊重原则

使用本软件即表示您同意遵守上述所有条款和限制。
EOF

echo -e "${GREEN}已创建法律免责声明文件：docs/learning/LEGAL_DISCLAIMER.md${NC}"

# 创建学习用途证明文件
cat > docs/learning/EDUCATIONAL_PURPOSE.md << EOF
# 教育用途证明

## 学习目标

使用此软件的教育目标包括：

1. **特性管理系统学习**：
   - 了解功能标志系统的实现原理
   - 学习特性发布和回滚策略
   - 掌握渐进式发布技术

2. **实验分析方法学习**：
   - 理解A/B测试统计分析方法
   - 学习用户分群分析技术
   - 掌握多指标相关性分析

3. **系统设计学习**：
   - 研究大型Web应用架构
   - 了解权限和用户管理系统设计
   - 学习数据可视化实现方法

## 学习方法

本项目作为学习工具，将用于：
- 学习代码和系统架构
- 分析功能实现方法
- 记录学习笔记和心得
- 通过实践加深理解

## 教育成果

预期的学习成果包括：
- 掌握现代特性管理技术
- 理解高级数据分析方法
- 能够设计类似的系统
- 学习软件工程最佳实践

以上学习活动严格遵守"合理使用"原则，尊重原作者知识产权。
EOF

echo -e "${GREEN}已创建教育用途证明文件：docs/learning/EDUCATIONAL_PURPOSE.md${NC}"

# 修改licenseUtil.ts文件中的orgHasPremiumFeature函数
echo -e "\n${YELLOW}修改licenseUtil.ts文件...${NC}"
LICENSE_UTIL_FILE="packages/shared/src/enterprise/licenseUtil.ts"

# 创建备份
cp "$LICENSE_UTIL_FILE" "${LICENSE_UTIL_FILE}.bak"

# 生成允许功能的条件语句
FEATURE_CONDITIONS=""
for feature in "${ALLOWED_FEATURES[@]}"; do
  if [ -z "$FEATURE_CONDITIONS" ]; then
    FEATURE_CONDITIONS="feature === \"$feature\""
  else
    FEATURE_CONDITIONS="$FEATURE_CONDITIONS || feature === \"$feature\""
  fi
done

# 替换orgHasPremiumFeature函数，添加学习声明
sed -i '' "s/export function orgHasPremiumFeature(.*)/export function orgHasPremiumFeature(\n  org: MinimalOrganization,\n  feature: CommercialFeature\n): boolean {\n  \/\/ 法律声明：此实现严格仅用于个人学习和教育研究目的\n  \/\/ 不得用于任何商业用途，原功能的所有知识产权归原开发者所有\n  \/\/ 参见: docs\/learning\/LEGAL_DISCLAIMER.md\n  return $FEATURE_CONDITIONS;\n}/g" "$LICENSE_UTIL_FILE"

if [ $? -eq 0 ]; then
  echo -e "${GREEN}licenseUtil.ts修改成功！${NC}"
else
  echo -e "${RED}licenseUtil.ts修改失败！${NC}"
  exit 1
fi

# 修改后端Context类中的hasPremiumFeature函数
echo -e "\n${YELLOW}修改后端Context类...${NC}"
CONTEXT_FILE="packages/back-end/src/services/context.ts"

# 创建备份
cp "$CONTEXT_FILE" "${CONTEXT_FILE}.bak"

# 替换hasPremiumFeature函数，添加学习声明
sed -i '' "s/public hasPremiumFeature(feature: CommercialFeature) {.*}/public hasPremiumFeature(feature: CommercialFeature) {\n    \/\/ 法律声明：此实现严格仅用于个人学习和教育研究目的\n    \/\/ 不得用于任何商业用途，原功能的所有知识产权归原开发者所有\n    \/\/ 参见: docs\/learning\/LEGAL_DISCLAIMER.md\n    return $FEATURE_CONDITIONS;\n  }/g" "$CONTEXT_FILE"

if [ $? -eq 0 ]; then
  echo -e "${GREEN}context.ts修改成功！${NC}"
else
  echo -e "${RED}context.ts修改失败！${NC}"
  exit 1
fi

# 修改前端的hasCommercialFeature函数
echo -e "\n${YELLOW}修改UserContext.tsx文件...${NC}"
USER_CONTEXT_FILE="packages/front-end/services/UserContext.tsx"

# 创建备份
cp "$USER_CONTEXT_FILE" "${USER_CONTEXT_FILE}.bak"

# 替换hasCommercialFeature函数，添加学习声明
sed -i '' "s/hasCommercialFeature: (feature) => commercialFeatures.has(feature),/hasCommercialFeature: (feature) => {\n          \/\/ 法律声明：此实现严格仅用于个人学习和教育研究目的\n          \/\/ 不得用于任何商业用途，原功能的所有知识产权归原开发者所有\n          \/\/ 参见: docs\/learning\/LEGAL_DISCLAIMER.md\n          return $FEATURE_CONDITIONS;\n        },/g" "$USER_CONTEXT_FILE"

if [ $? -eq 0 ]; then
  echo -e "${GREEN}UserContext.tsx修改成功！${NC}"
else
  echo -e "${RED}UserContext.tsx修改失败！${NC}"
  exit 1
fi

# 在设置页面添加提示
echo -e "\n${YELLOW}在设置页面添加功能提示...${NC}"
SETTINGS_FILE="packages/front-end/pages/settings/index.tsx"

if grep -q "GrowPulse学习版" "$SETTINGS_FILE"; then
  echo -e "${YELLOW}设置页面已有提示，无需修改${NC}"
else
  SEARCH="<Heading mb=\"4\" as=\"h1\">\n        General Settings\n      </Heading>"
  REPLACE="<Heading mb=\"4\" as=\"h1\">\n        General Settings\n      </Heading>\n\n      <div className=\"alert alert-info mb-4\">\n        <strong>GrowPulse学习版</strong> (仅供个人学习和教育研究用途)\n        <hr/>\n        <small>启用功能：计划功能标志、审计日志、团队管理、回归调整、指标人群和多指标查询。</small>\n        <br/>\n        <small className=\"text-danger\">注意：不得用于任何商业用途。所有功能的知识产权归原开发者所有。</small>\n      </div>"
  sed -i '' "s|$SEARCH|$REPLACE|g" "$SETTINGS_FILE"
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}设置页面修改成功！${NC}"
  else
    echo -e "${RED}设置页面修改失败！${NC}"
  fi
fi

# 修改Dashboard组件中的提示信息
echo -e "\n${YELLOW}修改Dashboard提示信息...${NC}"
DASHBOARD_FILE="packages/front-end/components/HomePage/Dashboard.tsx"

if grep -q "GrowPulse学习版" "$DASHBOARD_FILE"; then
  echo -e "${YELLOW}Dashboard已有提示，无需修改${NC}"
else
  # 查找插入点
  SEARCH="<h1>Hello {name}</h1>"
  REPLACE="<h1>Hello {name}</h1>\n        \n        {/* 学习版提示 */}\n        <div className=\"alert alert-info mt-3 mb-4\">\n          <h4 className=\"alert-heading\">GrowPulse学习版</h4>\n          <p>\n            本版本<strong>严格仅供个人学习和教育研究使用</strong>，启用了以下功能：\n          </p>\n          <ul>\n            <li>\n              <strong>功能管理</strong>：计划功能标志、团队管理\n            </li>\n            <li>\n              <strong>分析功能</strong>：回归调整、指标人群、多指标查询\n            </li>\n            <li>\n              <strong>监控功能</strong>：审计日志\n            </li>\n          </ul>\n          <p className=\"mb-0\">\n            <small className=\"text-danger\">法律声明：不得用于任何商业用途。所有功能的知识产权归原开发者所有。详见docs/learning/LEGAL_DISCLAIMER.md</small>\n          </p>\n        </div>"
  
  sed -i '' "s|$SEARCH|$REPLACE|g" "$DASHBOARD_FILE"
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Dashboard提示修改成功！${NC}"
  else
    echo -e "${RED}Dashboard提示修改失败！${NC}"
  fi
fi

# 创建学习版本标记文件
echo "此目录包含关于GrowPulse学习版的重要法律和教育文档" > docs/learning/README.md

echo -e "\n${GREEN}配置完成！GrowPulse已配置为学习版，遵循合法使用原则。${NC}"
echo -e "${YELLOW}请查看以下文件了解详细信息：${NC}"
echo -e "  - ${BLUE}docs/learning/LEGAL_DISCLAIMER.md${NC} - 法律免责声明"
echo -e "  - ${BLUE}docs/learning/EDUCATIONAL_PURPOSE.md${NC} - 教育用途证明"
echo -e "${YELLOW}请重新构建应用程序以应用更改: ./rebuild.sh${NC}" 