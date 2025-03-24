// MongoDB连接测试脚本（带SSL选项）
const { MongoClient } = require("mongodb");

// 连接参数
const password = process.argv[2] || "338962"; // 从命令行获取密码
const username = "kevinhuang98321";
const cluster = "cluster0.fq5qr.mongodb.net";
const uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority&ssl=true`;

console.log(`尝试使用密码 "${password}" 连接到MongoDB...`);
console.log("注意: 您可能需要在MongoDB Atlas中添加您的IP地址到白名单");
console.log("      登录Atlas后，点击Network Access -> Add IP Address -> Add Current IP Address");

// 创建具有额外SSL选项的客户端
const client = new MongoClient(uri, {
  ssl: true,
  sslValidate: false, // 尝试禁用SSL验证
  connectTimeoutMS: 30000, // 增加超时时间
  socketTimeoutMS: 30000,
  maxPoolSize: 1 // 减少连接池大小，简化连接
});

async function run() {
  try {
    console.log("正在连接...");
    await client.connect();
    console.log("✅ 成功连接到MongoDB!");
    
    console.log("正在执行ping测试...");
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Ping成功!");
    
    return true;
  } catch (error) {
    console.error("❌ 连接失败:", error.message);
    if (error.message.includes("authentication failed")) {
      console.log("🔑 提示: 密码错误。请尝试其他密码，或在MongoDB Atlas中重置密码。");
    } else if (error.message.includes("ECONNRESET")) {
      console.log("🔒 提示: 连接重置。请检查网络环境，并确保您的IP已添加到MongoDB Atlas白名单。");
    }
    return false;
  } finally {
    console.log("关闭连接...");
    await client.close();
    console.log("连接已关闭");
  }
}

run(); 