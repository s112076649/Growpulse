// Supabase连接测试脚本
const { createClient } = require('@supabase/supabase-js');

// 从命令行获取URL和密钥
const supabaseUrl = process.argv[2];
const supabaseKey = process.argv[3];

if (!supabaseUrl || !supabaseKey) {
  console.log("使用方法: node test-supabase.js SUPABASE_URL SUPABASE_ANON_KEY");
  process.exit(1);
}

// 创建Supabase客户端
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log("尝试连接到Supabase...");
    
    // 测试数据库连接
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(1);
      
    if (error) {
      console.error("❌ 连接错误:", error.message);
      if (error.message.includes("relation") && error.message.includes("does not exist")) {
        console.log("⚠️ 表格可能不存在。确保您已运行supabase-setup.sql脚本创建数据库表。");
      }
      return false;
    }
    
    console.log("✅ 成功连接到Supabase!");
    console.log("📊 从users表中检索到的数据:", data);
    
    // 测试插入数据
    console.log("\n正在尝试插入测试用户...");
    const { data: insertData, error: insertError } = await supabase
      .from('users')
      .insert([
        { 
          name: "测试用户", 
          email: `test-${Date.now()}@example.com`,
          password_hash: "test-hash"
        }
      ])
      .select();
      
    if (insertError) {
      console.error("❌ 插入错误:", insertError.message);
    } else {
      console.log("✅ 成功插入测试用户!");
      console.log("👤 新创建的用户:", insertData);
    }
    
    return true;
  } catch (error) {
    console.error("❌ 未处理的错误:", error.message);
    return false;
  }
}

testConnection().then(result => {
  if (result) {
    console.log("\n🎉 测试成功! Supabase连接正常工作。");
  } else {
    console.log("\n❌ 测试失败。请检查您的Supabase凭证和网络连接。");
  }
}); 