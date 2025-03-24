# GrowPulse 选定功能实现说明

## 概述

我们已经实现了一种合法方式，为GrowPulse应用程序选择性地保留几个高级功能，仅用于个人学习和朋友体验。这种方法保留了最有价值的功能，同时尊重原开发者的商业模式。

## 保留的功能

我们选择保留以下三个高级功能：

1. **计划功能标志** (schedule-feature-flag)
2. **审计日志** (audit-logging)
3. **团队管理** (teams)

这些功能被选择是因为它们提供了高价值，并且对于学习和理解现代功能管理系统很有用。

## 文件清单

我们创建了以下文件：

1. **selective-features.sh**: 脚本，用于修改代码以只启用选定的功能
2. **SELECT-FEATURES.md**: 文档，解释选定的功能和合法使用方式
3. **FEATURES-GUIDE.md**: 详细指南，说明如何使用这些功能
4. **README-FEATURES.md**: 本文档，总结所有修改

## 实现方法

我们的实现遵循以下原则：

1. **选择性功能启用**: 只启用选定的高级功能，禁用其他功能
2. **不修改核心代码**: 修改仅限于功能访问控制层
3. **明确的使用指南**: 提供清晰的文档，说明合法使用方式
4. **透明的功能表示**: 在UI中明确显示启用的功能

## 使用方法

### 步骤1: 应用选定功能

运行以下命令来应用选定功能：

```bash
./selective-features.sh
```

这将修改代码，使得只有选定的三个功能可用。

### 步骤2: 重新构建应用程序

```bash
./rebuild.sh
```

这将删除所有node_modules、重新安装依赖并构建应用程序。

### 步骤3: 启动应用程序

```bash
yarn dev
```

启动开发服务器，访问应用程序。

## 功能指南

关于如何使用这些功能的详细说明，请参考：

- **SELECT-FEATURES.md**: 选定功能及合法使用说明
- **FEATURES-GUIDE.md**: 详细的功能使用指南

## 恢复原始状态

如果您希望恢复原始状态，可以使用脚本创建的备份文件：

```bash
# 恢复licenseUtil.ts
cp packages/shared/src/enterprise/licenseUtil.ts.bak packages/shared/src/enterprise/licenseUtil.ts

# 恢复context.ts
cp packages/back-end/src/services/context.ts.bak packages/back-end/src/services/context.ts

# 恢复UserContext.tsx
cp packages/front-end/services/UserContext.tsx.bak packages/front-end/services/UserContext.tsx

# 重新构建
./rebuild.sh
```

## 法律说明

这种修改方式仅用于个人学习和有限的朋友体验使用，不应用于商业目的或广泛分发。请尊重原开发者的知识产权和商业模式。

如果您发现这些功能对您的工作流程非常有价值，请考虑购买GrowthBook的商业许可，支持开发者继续改进产品。 