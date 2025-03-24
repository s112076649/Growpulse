// 简单的测试数据生成脚本
const { createClient } = require('@supabase/supabase-js');

// Supabase配置
const supabaseUrl = "https://qsptolcekvocotsetrnn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzcHRvbGNla3ZvY290c2V0cm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NTc0NzksImV4cCI6MjA1ODQzMzQ3OX0.h_KplOiZ6HIKgcQD_TI0cPchRDCtFmRg7js0QjokweE";

// 创建客户端
const supabase = createClient(supabaseUrl, supabaseKey);

// 添加一个测试用户
async function addTestUser() {
  const email = `admin_${Date.now()}@example.com`;
  
  console.log(`创建测试用户: ${email}...`);
  const { data, error } = await supabase
    .from('users')
    .insert({
      email: email,
      name: '测试管理员'
    })
    .select();
  
  if (error) {
    console.error("创建用户失败:", error);
    return null;
  }
  
  console.log("用户创建成功:", data[0]);
  return data[0].id;
}

// 添加一个项目
async function addTestProject(userId) {
  console.log("创建项目表...");
  
  try {
    // 先创建表
    const createTableSql = `
    CREATE TABLE IF NOT EXISTS projects (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );`;
    
    // 在SQL编辑器中手动执行以上SQL
    
    // 然后插入数据
    const { data, error } = await supabase
      .from('projects')
      .insert({
        name: 'GrowPulse演示项目',
        description: 'A/B测试和特性标志管理',
        owner_id: userId
      })
      .select();
    
    if (error) {
      console.error("创建项目失败:", error);
      return null;
    }
    
    console.log("项目创建成功:", data[0]);
    return data[0].id;
    
  } catch (error) {
    console.error("创建或插入项目时出错:", error);
    return null;
  }
}

// 主函数
async function main() {
  console.log("开始添加GrowPulse测试数据...");
  
  // 1. 添加测试用户
  const userId = await addTestUser();
  if (!userId) {
    console.error("无法创建测试用户");
    return;
  }
  
  // 2. 尝试添加项目
  try {
    const projectId = await addTestProject(userId);
    if (projectId) {
      console.log("\n✅ 测试数据添加成功!");
    } else {
      console.log("\n❌ 项目创建失败。请在Supabase中手动创建表格。");
    }
  } catch (error) {
    console.error("发生错误:", error);
  }
}

// 运行
main().catch(console.error); 