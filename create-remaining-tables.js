// 创建GrowPulse所需的剩余表格
const { createClient } = require('@supabase/supabase-js');

// Supabase配置
const supabaseUrl = "https://qsptolcekvocotsetrnn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzcHRvbGNla3ZvY290c2V0cm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NTc0NzksImV4cCI6MjA1ODQzMzQ3OX0.h_KplOiZ6HIKgcQD_TI0cPchRDCtFmRg7js0QjokweE";

// 创建客户端
const supabase = createClient(supabaseUrl, supabaseKey);

// 创建测试用户并获取ID
async function createTestUser() {
  console.log("创建测试用户...");
  
  const testEmail = `admin_${Date.now()}@growpulse.com`;
  
  const { data, error } = await supabase
    .from('users')
    .insert({
      email: testEmail,
      name: 'GrowPulse管理员',
      role: 'admin'
    })
    .select('id');
  
  if (error) {
    console.error("创建测试用户失败:", error);
    return null;
  }
  
  console.log("测试用户创建成功:", data[0]);
  return data[0].id;
}

// 创建测试项目
async function createTestProject(userId) {
  console.log("创建测试项目...");
  
  const { data, error } = await supabase
    .from('projects')
    .insert({
      name: '演示项目',
      description: 'GrowPulse演示项目',
      owner_id: userId
    })
    .select('id');
  
  if (error) {
    console.error("创建测试项目失败:", error);
    return null;
  }
  
  console.log("测试项目创建成功:", data[0]);
  return data[0].id;
}

// 创建测试特性标志
async function createTestFeature(projectId) {
  console.log("创建测试特性标志...");
  
  const { data, error } = await supabase
    .from('features')
    .insert({
      name: '新UI',
      description: '新版本用户界面',
      status: 'active',
      project_id: projectId,
      rules: {
        defaultValue: false,
        variations: [
          { value: false, name: "旧版UI" },
          { value: true, name: "新版UI" }
        ],
        targets: [
          { 
            condition: { country: "US" }, 
            variation: 1, 
            percentage: 50 
          }
        ]
      }
    })
    .select('id');
  
  if (error) {
    console.error("创建测试特性标志失败:", error);
    return null;
  }
  
  console.log("测试特性标志创建成功:", data[0]);
  return data[0].id;
}

// 创建测试实验
async function createTestExperiment(projectId) {
  console.log("创建测试实验...");
  
  const { data, error } = await supabase
    .from('experiments')
    .insert({
      name: 'A/B测试演示',
      hypothesis: '新设计将提高转化率',
      status: 'running',
      project_id: projectId,
      variations: [
        { name: "控制组", description: "当前设计" },
        { name: "测试组", description: "新设计" }
      ],
      metrics: [
        { name: "转化率", type: "binomial" },
        { name: "平均订单价值", type: "revenue" }
      ]
    })
    .select('id');
  
  if (error) {
    console.error("创建测试实验失败:", error);
    return null;
  }
  
  console.log("测试实验创建成功:", data[0]);
  return data[0].id;
}

// 执行测试数据创建
async function createTestData() {
  // 创建测试用户
  const userId = await createTestUser();
  if (!userId) return false;
  
  // 创建测试项目
  const projectId = await createTestProject(userId);
  if (!projectId) return false;
  
  // 创建测试特性标志
  const featureId = await createTestFeature(projectId);
  if (!featureId) return false;
  
  // 创建测试实验
  const experimentId = await createTestExperiment(projectId);
  if (!experimentId) return false;
  
  return true;
}

// 主函数
async function main() {
  console.log("开始设置GrowPulse数据...");
  
  // 创建测试数据
  const success = await createTestData();
  
  if (success) {
    console.log("\n✅ GrowPulse数据设置成功!");
    console.log("现在您可以在Vercel上部署应用，并使用以下环境变量:");
    console.log(`SUPABASE_URL=${supabaseUrl}`);
    console.log(`SUPABASE_ANON_KEY=${supabaseKey}`);
  } else {
    console.log("\n❌ GrowPulse数据设置失败。");
  }
}

// 运行主函数
main().catch(err => {
  console.error("发生未处理错误:", err);
}); 