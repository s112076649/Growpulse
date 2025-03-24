#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 输出标题
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}安装网页设计工具${NC}"
echo -e "${GREEN}=====================================${NC}"

# 创建设计工具目录
mkdir -p ~/Desktop/DesignTools

# 下载并安装Chrome扩展说明文件
cat > ~/Desktop/DesignTools/chrome-extensions.md << EOF
# Chrome扩展安装指南

请在Chrome浏览器中安装以下扩展：

## 1. CSS Peeper
https://chrome.google.com/webstore/detail/css-peeper/mbnbehikldjhnfehhnaidhjhoofhpehk

## 2. Responsive Viewer
https://chrome.google.com/webstore/detail/responsive-viewer/inmopeiepgfljkpkidclfgbgbmfcennb

## 3. WAVE评估工具
https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh

## 4. ColorZilla
https://chrome.google.com/webstore/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp

## 5. WhatFont
https://chrome.google.com/webstore/detail/whatfont/jabopobgcpjmedljpbcaablpmlmfcogm
EOF

# 下载Figma安装指南
cat > ~/Desktop/DesignTools/figma-setup.md << EOF
# Figma安装指南

## 桌面版安装
1. 访问 https://www.figma.com/downloads/
2. 下载适用于Mac的Figma桌面应用
3. 将下载的应用拖到应用程序文件夹中

## 创建账户
1. 访问 https://www.figma.com/signup
2. 注册新账户或使用Google账户登录

## 推荐插件
- FigmaLens: 分析网站设计
- Stark: 无障碍设计检查
- Autoflow: 快速创建流程图
- Design Lint: 检查设计一致性
EOF

# 下载Webflow指南
cat > ~/Desktop/DesignTools/webflow-guide.md << EOF
# Webflow使用指南

## 创建账户
1. 访问 https://webflow.com/
2. 点击"Get Started Free"
3. 完成注册流程

## 如何使用Webflow Inspector
1. 在Webflow项目中，点击右上角的"Navigator"
2. 选择"Inspector"标签
3. 使用Inspector分析网站元素
4. 针对每个元素，可以查看CSS属性和编辑样式

## Webflow University资源
- 免费课程: https://university.webflow.com/
- Webflow Inspector教程: https://university.webflow.com/lesson/inspector
EOF

# 安装Node.js工具
echo -e "${YELLOW}正在安装Node.js设计工具...${NC}"
npm install -g lighthouse pageres-cli stylelint

# 创建性能分析工具说明
cat > ~/Desktop/DesignTools/performance-tools.md << EOF
# 网站性能分析工具

## Google PageSpeed Insights
访问: https://pagespeed.web.dev/

## 已安装的命令行工具

### Lighthouse (性能分析)
使用方法:
\`\`\`
lighthouse https://example.com --view
\`\`\`

### Pageres (多设备截图)
使用方法:
\`\`\`
pageres example.com 1366x768 1920x1080 --crop
\`\`\`

### Stylelint (CSS质量检查)
使用方法:
\`\`\`
stylelint "src/**/*.css"
\`\`\`
EOF

# 创建设计系统模板
cat > ~/Desktop/DesignTools/design-system-template.md << EOF
# GrowPulse设计系统模板

## 颜色系统
- 主色: #6A44CC (紫色)
- 辅助色: #46C89A (绿色)
- 警告色: #FF5A35 (红色)
- 信息色: #368BFF (蓝色)

## 排版
- 标题1: 24px, 700 weight, Inter
- 标题2: 20px, 600 weight, Inter
- 标题3: 18px, 600 weight, Inter
- 正文: 16px, 400 weight, Inter
- 小字体: 14px, 400 weight, Inter

## 组件规范
### 按钮
- 主要按钮: 紫色背景，白色文字
- 次要按钮: 白色背景，紫色边框和文字
- 危险按钮: 红色背景，白色文字

### 卡片
- 背景: 白色
- 阴影: 0 2px 8px rgba(0, 0, 0, 0.08)
- 圆角: 8px
EOF

# 提示及完成消息
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}设计工具安装和指南已创建!${NC}"
echo -e "${GREEN}请查看桌面上的DesignTools文件夹${NC}"
echo -e "${GREEN}=====================================${NC}"
echo -e "Chrome扩展请手动安装，链接已在指南中提供。" 