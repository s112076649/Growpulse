// 最终测试脚本 - 完整错误显示
const { createClient } = require('@supabase/supabase-js');

// 连接信息
const supabaseUrl = "https://qsptolcekvocotsetrnn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzcHRvbGNla3ZvY290c2V0cm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NTc0NzksImV4cCI6MjA1ODQzMzQ3OX0.h_KplOiZ6HIKgcQD_TI0cPchRDCtFmRg7js0QjokweE";

// 创建带有额外选项的客户端
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: false
  }
});

// 检查表是否存在
async function checkTable() {
  console.log("检查表是否存在...");
  
  // 尝试通过系统视图查询
  const { data, error } = await supabase
    .from('pg_tables')
    .select('*')
    .eq('schemaname', 'public')
    .eq('tablename', 'users');
    
  if (error) {
    console.error("查询错误:", error);
    console.error("完整错误对象:", JSON.stringify(error, null, 2));
    return false;
  }
  
  console.log("查询结果:", data);
  return data && data.length > 0;
}

// 插入用户测试
async function insertUser() {
  const email = `test${Date.now()}@example.com`;
  console.log(`尝试插入用户: ${email}`);
  
  try {
    // 直接插入，不使用select()
    const { data, error } = await supabase
      .from('users')
      .insert({
        email: email,
        name: '测试用户'
      });
    
    if (error) {
      console.error("插入错误:", error);
      console.error("完整错误信息:", JSON.stringify(error, null, 2));
      return false;
    }
    
    console.log("插入响应:", data || "无数据返回");
    return true;
  } catch (err) {
    console.error("未处理错误:", err);
    return false;
  }
}

// 主函数
async function main() {
  console.log("测试Supabase连接...");
  console.log("URL:", supabaseUrl);
  
  const tableExists = await checkTable();
  console.log(`用户表存在: ${tableExists}`);
  
  if (!tableExists) {
    console.log("用户表不存在。请在SQL编辑器中创建表。");
    return false;
  }
  
  const insertSuccess = await insertUser();
  return insertSuccess;
}

main().then(success => {
  console.log("\n=============================================");
  console.log(success ? "✅ 测试成功!" : "❌ 测试失败!");
  console.log("=============================================");
}); 