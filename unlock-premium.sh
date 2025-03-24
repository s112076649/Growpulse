#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}开始解锁GrowPulse所有付费功能...${NC}"

# 修改orgHasPremiumFeature函数
echo -e "${YELLOW}修改licenseUtil.ts文件...${NC}"
sed -i '' 's/return planHasPremiumFeature(getEffectiveAccountPlan(org), feature);/return true; \/\/ 修改后直接返回true，让所有功能免费/g' packages/shared/src/enterprise/licenseUtil.ts
if [ $? -eq 0 ]; then
    echo -e "${GREEN}licenseUtil.ts修改成功！${NC}"
else
    echo -e "${RED}licenseUtil.ts修改失败！${NC}"
    exit 1
fi

# 修改Context类中的hasPremiumFeature函数
echo -e "${YELLOW}修改context.ts文件...${NC}"
sed -i '' 's/return orgHasPremiumFeature(this.org, feature);/return true; \/\/ 修改后直接返回true，让所有功能免费/g' packages/back-end/src/services/context.ts
if [ $? -eq 0 ]; then
    echo -e "${GREEN}context.ts修改成功！${NC}"
else
    echo -e "${RED}context.ts修改失败！${NC}"
    exit 1
fi

# 修改前端的hasCommercialFeature函数
echo -e "${YELLOW}修改UserContext.tsx文件...${NC}"
sed -i '' 's/hasCommercialFeature: (feature) => commercialFeatures.has(feature),/hasCommercialFeature: (feature) => true, \/\/ 修改后直接返回true，让所有功能免费/g' packages/front-end/services/UserContext.tsx
if [ $? -eq 0 ]; then
    echo -e "${GREEN}UserContext.tsx修改成功！${NC}"
else
    echo -e "${RED}UserContext.tsx修改失败！${NC}"
    exit 1
fi

# 在设置页面添加解锁提示
echo -e "${YELLOW}在设置页面添加解锁提示...${NC}"
SETTINGS_FILE="packages/front-end/pages/settings/index.tsx"
if grep -q "GrowPulse Pro已解锁" "$SETTINGS_FILE"; then
    echo -e "${YELLOW}设置页面已有解锁提示，无需修改${NC}"
else
    SEARCH="<Heading mb=\"4\" as=\"h1\">\n        General Settings\n      </Heading>"
    REPLACE="<Heading mb=\"4\" as=\"h1\">\n        General Settings\n      </Heading>\n\n      <div className=\"alert alert-success mb-4\">\n        <strong>GrowPulse Pro已解锁！</strong> 所有高级功能已全部解锁，无需付费订阅。\n      </div>"
    sed -i '' "s|$SEARCH|$REPLACE|g" "$SETTINGS_FILE"
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}设置页面修改成功！${NC}"
    else
        echo -e "${RED}设置页面修改失败！${NC}"
    fi
fi

# 修改billing页面
echo -e "${YELLOW}修改billing页面...${NC}"
BILLING_FILE="packages/front-end/pages/settings/billing.tsx"
if grep -q "GrowPulse Pro已解锁" "$BILLING_FILE"; then
    echo -e "${YELLOW}billing页面已有解锁提示，无需修改${NC}"
else
    SEARCH="<h1>Billing Settings</h1>"
    REPLACE="<Heading mb=\"4\" as=\"h1\">\n        Billing\n      </Heading>\n\n      <div className=\"alert alert-success mb-5\">\n        <strong>GrowPulse Pro已解锁！</strong> 所有高级功能已全部解锁，无需付费订阅。\n      </div>\n\n      <Text as=\"p\" mb=\"5\">\n        您正在使用的GrowPulse版本已经包含所有专业功能，无需支付任何费用。\n      </Text>"
    sed -i '' "s|$SEARCH|$REPLACE|g" "$BILLING_FILE"
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}billing页面修改成功！${NC}"
    else
        echo -e "${RED}billing页面修改失败！${NC}"
    fi
fi

echo -e "${GREEN}所有修改完成！GrowPulse所有付费功能已解锁！${NC}"
echo -e "${YELLOW}请重新构建应用程序以应用更改: ./rebuild.sh${NC}"
 