# GrowPulse Vercel部署指南

本指南将帮助您将GrowPulse应用部署到Vercel平台。

## 前提条件

- 您已成功设置了Supabase数据库
- Supabase用户表已创建且可以访问
- 您已有一个Vercel账号，并连接到您的GitHub仓库

## 部署步骤

### 1. 克隆GitHub仓库（如尚未克隆）

```bash
git clone https://github.com/s112076649/Growpulse.git
cd Growpulse
```

### 2. 提交最新更改

```bash
git add .
git commit -m "准备Vercel部署"
git push origin main
```

### 3. 在Vercel中导入项目

1. 登录Vercel控制台：https://vercel.com/dashboard
2. 点击"Add New"按钮，然后选择"Project"
3. 从已连接的GitHub账号中选择"s112076649/Growpulse"仓库
4. 点击"Import"按钮

### 4. 配置项目设置

1. **框架预设**：选择"Other"（如果未自动检测）
2. **构建设置**：
   - 构建命令(Build Command)：`yarn build`
   - 输出目录(Output Directory)：保持默认
   - 安装命令(Install Command)：`yarn install`

3. **环境变量**：
   点击"Environment Variables"部分，添加以下变量：
   - `SUPABASE_URL`：填入值 `https://qsptolcekvocotsetrnn.supabase.co`
   - `SUPABASE_ANON_KEY`：填入值 `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzcHRvbGNla3ZvY290c2V0cm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NTc0NzksImV4cCI6MjA1ODQzMzQ3OX0.h_KplOiZ6HIKgcQD_TI0cPchRDCtFmRg7js0QjokweE`

### 5. 部署项目

1. 点击"Deploy"按钮
2. 等待部署完成（通常需要几分钟）
3. 部署完成后，点击"Visit"按钮访问应用

## 部署成功后

成功部署后，您将获得一个类似以下的URL：
```
https://growpulse.vercel.app
```

您可以通过此URL访问GrowPulse应用。

## 常见问题

### 构建失败

如果构建失败，请检查Vercel日志以获取详细错误信息。常见原因包括：

1. 环境变量未正确设置
2. 依赖项安装失败
3. 构建脚本错误

### 数据库连接问题

如果应用成功部署但无法连接到数据库，请确认：

1. Supabase项目是否处于活动状态
2. 环境变量是否正确设置
3. 数据库表是否已创建
4. Supabase安全策略是否允许应用访问

## 自定义域名（可选）

如果您想使用自定义域名，可以在Vercel控制台中：

1. 点击您的项目
2. 点击"Settings" > "Domains"
3. 添加您的自定义域名并按照说明设置DNS记录 