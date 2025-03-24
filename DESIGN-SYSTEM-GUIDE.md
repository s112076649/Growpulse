# GrowPulse设计系统使用指南

## 简介

GrowPulse设计系统是一套完整的设计规范和开发资源，旨在确保产品在视觉和交互上的一致性。通过使用这个设计系统，我们可以提高开发效率、改善用户体验，并确保品牌统一性。

## 文件结构

```
design-system/
├── index.js           # 入口文件，导出所有设计系统元素
├── colors.js          # 颜色系统
├── typography.js      # 排版系统
├── components.js      # 组件样式系统
└── variables.css      # CSS变量
```

## 快速开始

### 在React组件中使用

1. 导入设计系统变量CSS文件（只需在应用入口处导入一次）：

```jsx
// 在_app.tsx或类似入口文件中
import '../design-system/variables.css';
```

2. 在组件中使用设计系统：

```jsx
import { colors, typography, components } from '../design-system';

function Button({ children, variant = 'primary', ...props }) {
  const buttonStyle = {
    ...components.buttons[variant],
    // 可以在这里添加或覆盖样式
  };
  
  return (
    <button style={buttonStyle} {...props}>
      {children}
    </button>
  );
}
```

### 使用CSS变量

在任何CSS或SCSS文件中，您可以直接使用定义好的CSS变量：

```css
.my-component {
  background-color: var(--primary-500);
  color: var(--white);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  font-family: var(--font-family-sans);
  box-shadow: var(--shadow-md);
}

.my-component:hover {
  background-color: var(--primary-600);
}
```

## 颜色系统

我们的颜色系统包含五个主要类别：

1. **主色（Primary）**：品牌主色，紫色系列，用于主要按钮、强调元素等
2. **成功色（Success）**：绿色系列，用于表示成功状态、完成操作等
3. **危险色（Danger）**：红色系列，用于表示错误、警告、删除操作等
4. **信息色（Info）**：蓝色系列，用于表示信息性内容、链接等
5. **中性色（Gray）**：灰色系列，用于文本、背景、边框等

每个类别都有从50到900的9个深浅级别。

示例：
- 按钮背景：`var(--primary-600)`
- 成功提示：`var(--success-500)`
- 错误信息：`var(--danger-500)`
- 主要文本：`var(--text-primary)`
- 次要文本：`var(--text-secondary)`

## 排版系统

我们的排版系统使用Inter作为主要字体，定义了一系列字体大小、粗细和行高。

### 标题样式
- 标题1（H1）：`24px`，粗体（700）
- 标题2（H2）：`20px`，半粗体（600）
- 标题3（H3）：`18px`，半粗体（600）
- 标题4（H4）：`16px`，半粗体（600）

### 文本样式
- 正文：`16px`，普通（400）
- 小文本：`14px`，普通（400）
- 微小文本：`12px`，普通（400）

## 组件样式

设计系统包含常用组件的样式定义，如按钮、卡片、输入框等。这些定义可以直接用于样式实现。

### 按钮
- 主要按钮（Primary）：紫色背景，白色文字
- 次要按钮（Secondary）：白色背景，紫色边框和文字
- 危险按钮（Danger）：红色背景，白色文字

### 卡片
- 默认卡片：白色背景，中等阴影，大圆角
- 紧凑卡片：白色背景，小阴影，中等圆角
- 扁平卡片：白色背景，边框，无阴影

### 输入框
- 默认输入框：白色背景，灰色边框，聚焦时紫色边框和阴影

## 与设计工具的配合

1. **使用Figma查看和编辑设计**:
   - 打开Figma，创建新项目
   - 导入我们的颜色系统作为色彩样本
   - 创建组件库，应用我们的设计标准

2. **使用CSS Peeper分析竞品网站**:
   - 访问竞品网站
   - 打开CSS Peeper插件
   - 提取颜色、字体和间距信息
   - 与我们的设计系统对比，寻找改进点

3. **使用Responsive Viewer测试响应式设计**:
   - 打开Responsive Viewer
   - 添加GrowPulse应用URL
   - 同时查看多种设备尺寸下的表现
   - 调整我们的设计系统以优化响应式体验

## 最佳实践

1. **保持一致性**: 始终使用设计系统中定义的变量，避免硬编码颜色和尺寸
2. **语义化使用**: 根据元素的语义选择合适的颜色，例如错误消息使用danger色系
3. **响应式设计**: 使用我们定义的间距系统构建灵活的布局
4. **无障碍性**: 确保颜色对比度符合WCAG标准，使用适当的文本大小

## 贡献与更新

如需对设计系统进行更新或修改，请遵循以下步骤：

1. 在实际项目中测试变更
2. 更新相应的设计系统文件
3. 更新该文档以反映变化
4. 通知团队关于设计系统的更新 