// 最小化测试 - 只做一件事: 插入用户
const { createClient } = require('@supabase/supabase-js');

// 创建客户端
const supabase = createClient(
  "https://qsptolcekvocotsetrnn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzcHRvbGNla3ZvY290c2V0cm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NTc0NzksImV4cCI6MjA1ODQzMzQ3OX0.h_KplOiZ6HIKgcQD_TI0cPchRDCtFmRg7js0QjokweE"
);

// 插入用户
async function insertUser() {
  try {
    console.log("尝试向users表中插入一条记录...");
    
    const { error } = await supabase
      .from('users')
      .insert({
        email: `test${Date.now()}@example.com`,
        name: '测试用户'
      });
    
    if (error) {
      console.error("错误:", error);
      return false;
    }
    
    console.log("插入成功!");
    return true;
  } catch (err) {
    console.error("未处理错误:", err);
    return false;
  }
}

insertUser()
  .then(success => {
    console.log(success ? "✅ 成功!" : "❌ 失败!");
    process.exit(success ? 0 : 1);
  }); 