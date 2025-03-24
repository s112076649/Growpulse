// 尝试直接连接MongoDB
const { MongoClient } = require("mongodb");

// 使用直接连接方式（不使用DNS SRV记录）
const password = "338962";
const uri = `mongodb+srv://kevinhuang98321:${password}@cluster0.fq5qr.mongodb.net/growpulse?retryWrites=true&w=majority`;

console.log("尝试直接连接到MongoDB...");

// 创建客户端
const client = new MongoClient(uri, {
  connectTimeoutMS: 5000,  // 减少超时时间，快速知道结果
  directConnection: true   // 尝试直接连接
});

async function run() {
  try {
    console.log("正在连接...");
    await client.connect();
    console.log("✅ 成功连接到MongoDB!");
    return true;
  } catch (error) {
    console.error("❌ 连接失败:", error.message);
    return false;
  } finally {
    try {
      await client.close();
      console.log("连接已关闭");
    } catch (e) {}
  }
}

run(); 