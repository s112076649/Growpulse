// 自动创建Supabase表的脚本
const { createClient } = require('@supabase/supabase-js');

// 从命令行获取URL和密钥
const supabaseUrl = process.argv[2];
const supabaseKey = process.argv[3];

if (!supabaseUrl || !supabaseKey) {
  console.log("使用方法: node create-tables.js SUPABASE_URL SUPABASE_ANON_KEY");
  process.exit(1);
}

// 创建Supabase客户端
const supabase = createClient(supabaseUrl, supabaseKey);

async function createTables() {
  try {
    console.log("开始创建表格...");
    
    // 创建用户表
    console.log("1. 创建用户表...");
    const { error: usersError } = await supabase.rpc('execute', { 
      query: `
      CREATE TABLE IF NOT EXISTS public.users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        password_hash TEXT,
        role TEXT DEFAULT 'user',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );`
    });
    
    if (usersError) {
      console.error("创建用户表失败:", usersError.message);
      // 尝试备选方法
      console.log("尝试使用SQL查询创建用户表...");
      
      const { error: sqlError } = await supabase.from('_utils').rpc('exec_sql', {
        sql: `
        CREATE TABLE IF NOT EXISTS public.users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          name TEXT,
          password_hash TEXT,
          role TEXT DEFAULT 'user',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );`
      });
      
      if (sqlError) {
        console.error("SQL查询创建用户表失败:", sqlError.message);
        console.log("请使用Supabase SQL编辑器手动创建表格。");
        return false;
      }
    }
    
    console.log("✅ 用户表创建成功或已存在");
    
    // 测试插入用户
    console.log("\n2. 尝试插入测试用户...");
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
      console.error("❌ 插入用户失败:", insertError.message);
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

createTables().then(result => {
  if (result) {
    console.log("\n🎉 表格创建成功!");
  } else {
    console.log("\n❌ 表格创建失败。请检查Supabase设置和权限。");
  }
}); 