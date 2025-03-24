// 验证和创建Supabase表格
const { createClient } = require('@supabase/supabase-js');

// Supabase配置
const supabaseUrl = "https://qsptolcekvocotsetrnn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzcHRvbGNla3ZvY290c2V0cm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NTc0NzksImV4cCI6MjA1ODQzMzQ3OX0.h_KplOiZ6HIKgcQD_TI0cPchRDCtFmRg7js0QjokweE";

// 创建客户端
const supabase = createClient(supabaseUrl, supabaseKey);

// 检查表是否存在（通过尝试访问）
async function checkTable(tableName) {
  console.log(`检查${tableName}表是否存在...`);
  
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
    
    if (error) {
      console.error(`表${tableName}访问失败:`, error.message);
      return false;
    }
    
    console.log(`表${tableName}存在，已读取${data.length}条记录`);
    return true;
  } catch (error) {
    console.error(`检查表${tableName}时发生错误:`, error.message);
    return false;
  }
}

// 创建项目表
async function createProjectsTable() {
  console.log("尝试创建项目表...");
  
  const { data: userData } = await supabase
    .from('users')
    .select('id')
    .limit(1);
  
  if (!userData || userData.length === 0) {
    console.error("找不到用户数据，无法创建带有外键约束的表");
    return false;
  }
  
  try {
    // 创建测试项目
    const { error } = await supabase
      .from('projects')
      .insert({
        name: '测试项目',
        description: '用于验证表格创建的测试项目',
        owner_id: userData[0].id
      });
    
    if (error) {
      console.error("项目表创建失败:", error.message);
      return false;
    }
    
    console.log("项目表已验证并插入测试数据");
    return true;
  } catch (error) {
    console.error("创建项目表时发生错误:", error.message);
    return false;
  }
}

// 创建特性标志表
async function createFeaturesTable() {
  console.log("尝试创建特性标志表...");
  
  const { data: projectData } = await supabase
    .from('projects')
    .select('id')
    .limit(1);
  
  if (!projectData || projectData.length === 0) {
    console.error("找不到项目数据，无法创建带有外键约束的表");
    return false;
  }
  
  try {
    // 创建测试特性标志
    const { error } = await supabase
      .from('features')
      .insert({
        name: '测试特性',
        description: '用于验证表格创建的测试特性',
        status: 'draft',
        project_id: projectData[0].id,
        rules: { enabled: false }
      });
    
    if (error) {
      console.error("特性标志表创建失败:", error.message);
      return false;
    }
    
    console.log("特性标志表已验证并插入测试数据");
    return true;
  } catch (error) {
    console.error("创建特性标志表时发生错误:", error.message);
    return false;
  }
}

// 创建实验表
async function createExperimentsTable() {
  console.log("尝试创建实验表...");
  
  const { data: projectData } = await supabase
    .from('projects')
    .select('id')
    .limit(1);
  
  if (!projectData || projectData.length === 0) {
    console.error("找不到项目数据，无法创建带有外键约束的表");
    return false;
  }
  
  try {
    // 创建测试实验
    const { error } = await supabase
      .from('experiments')
      .insert({
        name: '测试实验',
        hypothesis: '用于验证表格创建的测试实验',
        status: 'draft',
        project_id: projectData[0].id
      });
    
    if (error) {
      console.error("实验表创建失败:", error.message);
      return false;
    }
    
    console.log("实验表已验证并插入测试数据");
    return true;
  } catch (error) {
    console.error("创建实验表时发生错误:", error.message);
    return false;
  }
}

// 主函数
async function main() {
  console.log("开始验证和设置GrowPulse数据库表格...");
  
  // 1. 检查用户表
  const usersExists = await checkTable('users');
  if (!usersExists) {
    console.error("用户表不存在，请先使用SQL Editor手动创建");
    return false;
  }
  
  // 2. 检查或创建项目表
  const projectsExists = await checkTable('projects');
  if (!projectsExists) {
    console.log("需要创建项目表...");
    const created = await createProjectsTable();
    if (!created) return false;
  }
  
  // 3. 检查或创建特性标志表
  const featuresExists = await checkTable('features');
  if (!featuresExists) {
    console.log("需要创建特性标志表...");
    const created = await createFeaturesTable();
    if (!created) return false;
  }
  
  // 4. 检查或创建实验表
  const experimentsExists = await checkTable('experiments');
  if (!experimentsExists) {
    console.log("需要创建实验表...");
    const created = await createExperimentsTable();
    if (!created) return false;
  }
  
  console.log("\n✅ 所有表格已验证/创建成功!");
  console.log("您可以继续部署GrowPulse到Vercel。");
  
  return true;
}

// 运行主函数
main()
  .then(success => {
    console.log(success ? "完成!" : "设置失败，请参考上方错误信息");
  })
  .catch(err => {
    console.error("发生未处理错误:", err);
  }); 