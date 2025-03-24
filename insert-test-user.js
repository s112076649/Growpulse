// 简单的用户插入测试
const { createClient } = require('@supabase/supabase-js');

// 从命令行获取URL和密钥
const supabaseUrl = process.argv[2];
const supabaseKey = process.argv[3];

if (!supabaseUrl || !supabaseKey) {
  console.log("使用方法: node insert-test-user.js SUPABASE_URL SUPABASE_ANON_KEY");
  process.exit(1);
}

// 创建Supabase客户端
const supabase = createClient(supabaseUrl, supabaseKey);

async function insertTestUser() {
  try {
    console.log("连接到Supabase...");
    
    // 生成唯一的测试邮箱
    const testEmail = `test${Date.now()}@example.com`;
    
    console.log(`尝试插入测试用户 (${testEmail})...`);
    const { data, error } = await supabase
      .from('users')
      .insert([
        { 
          name: "测试用户", 
          email: testEmail,
          password_hash: "test-hash"
        }
      ])
      .select();
      
    if (error) {
      console.error("❌ 插入失败:", error.message);
      return false;
    }
    
    console.log("✅ 成功插入用户!");
    console.log("📊 用户数据:", data);
    return true;
  } catch (error) {
    console.error("❌ 未处理的错误:", error.message);
    return false;
  }
}

insertTestUser().then(success => {
  if (success) {
    console.log("✅ 测试成功! Supabase可以正常工作。");
  } else {
    console.log("❌ 测试失败。请确保在Supabase中创建了users表。");
  }
}); 