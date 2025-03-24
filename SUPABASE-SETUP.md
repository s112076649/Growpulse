# GrowPulse - Supabase设置指南

本指南将帮助您为GrowPulse应用设置Supabase数据库。

## 创建Supabase项目

1. 访问 [Supabase网站](https://supabase.com/) 并注册或登录
2. 点击"New Project"创建新项目
3. 输入项目详情：
   - 名称：`growpulse`（或您喜欢的名称）
   - 数据库密码：创建一个安全密码
   - 区域：选择离您近的区域（比如`us-west-1`）
   - 定价方案：选择免费计划
4. 点击"Create new project"并等待创建完成（约2-3分钟）

## 设置数据库表和策略

1. 在Supabase项目控制台中，导航到"SQL Editor"
2. 点击"New Query"创建新查询
3. 将`supabase-setup.sql`文件中的内容复制粘贴到查询编辑器
4. 点击"Run"执行SQL脚本

这将创建所有必要的表格和安全策略。

## 获取API凭证

1. 在项目控制台中，导航到"Settings" > "API"
2. 您将看到两个重要的值：
   - Project URL
   - anon public key
3. 将这些值记录下来，稍后将用于Vercel环境变量

## 配置Vercel环境变量

1. 登录您的Vercel账户
2. 进入GrowPulse项目设置
3. 导航到"Environment Variables"部分
4. 添加以下变量：
   - `SUPABASE_URL`：您的Supabase项目URL
   - `SUPABASE_ANON_KEY`：您的匿名公钥

## 安装依赖

在您的GrowPulse项目中，安装Supabase客户端库：

```bash
npm install @supabase/supabase-js
```

## 使用Supabase Auth（可选但推荐）

如果您想使用Supabase的身份验证功能：

1. 在Supabase控制台中，导航到"Authentication" > "Providers"
2. 启用"Email"提供商
3. 根据需要配置其他提供商（GitHub、Google等）

## 测试连接

在部署前，您可以使用以下脚本测试Supabase连接：

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  const { data, error } = await supabase.from('users').select('*').limit(1);
  
  if (error) {
    console.error('连接错误:', error);
  } else {
    console.log('连接成功!', data);
  }
}

testConnection();
```

## 数据迁移

如果您需要从MongoDB迁移数据到Supabase，建议使用以下步骤：

1. 从MongoDB导出数据为JSON格式
2. 转换数据格式以匹配Supabase表结构
3. 使用Supabase的`insert`函数导入数据

## 常见问题

### 表格已存在错误
如果在运行SQL脚本时收到"表格已存在"错误，不必担心。这是因为脚本使用了`if not exists`条件，可以安全地多次运行。

### CORS错误
如果收到CORS错误，请在Supabase控制台中导航到"Settings" > "API" > "CORS"，添加您的应用URL。 