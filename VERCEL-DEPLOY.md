# GrowPulse Vercel部署指南

## 准备工作

1. 创建[Vercel账户](https://vercel.com/signup)
2. 安装[Vercel CLI](https://vercel.com/cli)
   ```bash
   npm i -g vercel
   ```
3. 准备MongoDB数据库
   - 使用[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)创建免费集群
   - 获取连接字符串

## 设置环境变量

在Vercel上，需要设置以下环境变量：

1. **MONGODB_URI**: MongoDB连接字符串
2. **JWT_SECRET**: 用于加密JWT的密钥（可随机生成）
3. **APP_ORIGIN**: 应用的域名（如https://my-growthbook.vercel.app）

通过Vercel CLI设置：

```bash
vercel secrets add mongodb-uri "mongodb+srv://..."
vercel secrets add jwt-secret "your-secret-key"
vercel secrets add app-origin "https://your-app-domain.vercel.app"
```

## 部署步骤

1. **登录Vercel**
   ```bash
   vercel login
   ```

2. **初始化项目**
   ```bash
   vercel init
   ```

3. **部署项目**
   ```bash
   vercel --prod
   ```

4. **访问应用**
   
   部署完成后，Vercel会提供一个URL，您可以通过此URL访问应用。

## 自定义域名

1. 在Vercel控制台中选择您的项目
2. 进入"Settings" > "Domains"
3. 添加您的自定义域名
4. 按照提示配置DNS记录

## 持续部署

设置与GitHub仓库的连接，每次推送到主分支时自动部署：

1. 在Vercel控制台中导入项目
2. 连接GitHub仓库
3. 配置自动部署设置

## 常见问题

### 1. 构建失败
检查构建日志，确保所有依赖项都已正确安装。

### 2. 数据库连接问题
确认MongoDB URI格式正确，并检查网络设置允许Vercel IP访问数据库。

### 3. 前端无法连接后端API
检查APP_ORIGIN环境变量是否正确设置。 