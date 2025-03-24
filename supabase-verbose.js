// 详细的Supabase测试脚本
const { createClient } = require('@supabase/supabase-js');

// 从命令行获取URL和密钥
const supabaseUrl = process.argv[2];
const supabaseKey = process.argv[3];

if (!supabaseUrl || !supabaseKey) {
  console.log("使用方法: node supabase-verbose.js SUPABASE_URL SUPABASE_ANON_KEY");
  process.exit(1);
}

// 创建Supabase客户端
const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabase() {
  try {
    console.log("Supabase URL:", supabaseUrl);
    console.log("Supabase Key:", supabaseKey.substring(0, 10) + "...");
    console.log("\n正在测试连接...");
    
    // 1. 尝试获取所有表格
    console.log("\n1. 获取数据库表信息...");
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
      
    if (tablesError) {
      console.error("获取表信息失败:", tablesError);
      console.error("完整错误对象:", JSON.stringify(tablesError, null, 2));
    } else {
      console.log("找到的表格:", tables);
    }
    
    // 2. 尝试列出bucket（如果存储服务可用）
    console.log("\n2. 尝试访问存储服务...");
    try {
      const { data: buckets, error: bucketsError } = await supabase
        .storage
        .listBuckets();
        
      if (bucketsError) {
        console.error("获取存储桶失败:", bucketsError);
      } else {
        console.log("存储桶:", buckets);
      }
    } catch (e) {
      console.error("存储服务测试失败:", e);
    }
    
    // 3. 尝试创建用户表（如果不存在）
    console.log("\n3. 尝试创建用户表...");
    try {
      const { error: queryError } = await supabase.rpc('exec_sql', {
        sql: `
        CREATE TABLE IF NOT EXISTS public.users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          name TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );
        `
      });
      
      if (queryError) {
        console.error("创建表失败:", queryError);
        console.error("完整错误对象:", JSON.stringify(queryError, null, 2));
      } else {
        console.log("表创建请求成功（可能已存在）");
      }
    } catch (e) {
      console.error("创建表请求失败:", e);
      console.error("这可能表明supabase.rpc方法不支持或需要额外权限");
    }
    
    // 4. 尝试插入用户
    console.log("\n4. 尝试插入用户...");
    const testEmail = `test${Date.now()}@example.com`;
    const { data: insertData, error: insertError } = await supabase
      .from('users')
      .insert([{
        name: '测试用户',
        email: testEmail
      }])
      .select();
      
    if (insertError) {
      console.error("插入用户失败:", insertError);
      console.error("完整错误对象:", JSON.stringify(insertError, null, 2));
    } else {
      console.log("用户插入成功:", insertData);
    }
    
    return true;
  } catch (error) {
    console.error("未处理的错误:", error);
    return false;
  }
}

testSupabase().then(success => {
  console.log("\n============================================================");
  if (success) {
    console.log("测试完成，请查看上方输出了解详情。");
  } else {
    console.log("测试过程中发生错误，请查看上方输出了解详情。");
  }
  console.log("============================================================");
}); 