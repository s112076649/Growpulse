// 极简测试脚本 - 只测试用户表
const { createClient } = require('@supabase/supabase-js');

// 从环境变量或命令行获取连接信息
const supabaseUrl = process.argv[2] || "https://qsptolcekvocotsetrnn.supabase.co";
const supabaseKey = process.argv[3] || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzcHRvbGNla3ZvY290c2V0cm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NTc0NzksImV4cCI6MjA1ODQzMzQ3OX0.h_KplOiZ6HIKgcQD_TI0cPchRDCtFmRg7js0QjokweE";

// 创建客户端
const supabase = createClient(supabaseUrl, supabaseKey);

// 生成随机邮箱
const randomEmail = `test${Math.floor(Math.random() * 1000000)}@example.com`;

// 测试插入
async function testInsert() {
  console.log(`尝试插入用户: ${randomEmail}`);
  
  const { data, error } = await supabase
    .from('users')
    .insert({ 
      email: randomEmail, 
      name: '测试用户'
    })
    .select();
  
  if (error) {
    console.error('插入失败:', error.message);
    return false;
  }
  
  console.log('插入成功!', data);
  return true;
}

// 运行测试
testInsert()
  .then(success => console.log(success ? '✅ 测试通过!' : '❌ 测试失败!'))
  .catch(err => console.error('未处理错误:', err)); 