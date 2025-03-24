# GrowthBook构建指南

本项目因存在以下问题而导致直接构建困难：

1. **类型定义问题**：存在多个不兼容的Express类型定义版本，导致类型错误
2. **模块引用问题**：一些模块如`@growthbook/proxy-eval`没有正确的类型声明
3. **配置不统一**：不同包的tsconfig配置不一致
4. **包引用问题**：前端代码中仍有对`@growpulse/growpulse-react`的引用

## 解决方案

我们提供了以下脚本来帮助构建和开发：

### 1. 部分构建 (推荐)

使用以下脚本进行开发构建，它会跳过严格类型检查并成功构建shared包：

```bash
./dev-build.sh
```

### 2. 启动后端服务

可以使用以下命令启动后端服务：

```bash
./start-dev.sh
```

## 修复前端构建

前端构建目前仍有一些模块引用问题，需要替换所有`@growpulse/growpulse-react`引用为`@growthbook/growthbook-react`。

## 类型问题说明

主要类型问题集中在：

1. Express Request/Response类型不兼容
2. 缺少第三方库的类型定义（@hapi/shot，passport-local等）
3. 存在多处函数参数类型不匹配

我们已经在`packages/back-end/tsconfig.json`中添加了`skipLibCheck: true`配置来减轻这些问题。

## 已知问题

1. **文档tsconfig错误**：`docs/tsconfig.json`引用了`@docusaurus/tsconfig`，但该依赖未安装。由于文档编译不影响主应用功能，可以忽略此错误，也可以通过注释掉该引用来解决。
2. **前端构建失败**：前端构建仍存在模块引用问题，需要更多修复。

## 启动应用程序

构建完成后，可以使用以下命令启动应用程序：

```bash
yarn dev
``` 