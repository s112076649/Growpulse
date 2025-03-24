// 简单MongoDB连接测试，使用命令行参数传入密码
const { MongoClient } = require("mongodb");

// 从命令行获取密码参数
const password = process.argv[2] || "test123456"; // 默认使用test123456作为密码
const username = "kevinhuang98321";
const cluster = "cluster0.fq5qr.mongodb.net";

// 构建URI
const uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;

console.log(`尝试使用密码 "${password}" 连接到MongoDB...`);

// 创建客户端
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ 成功连接到MongoDB!");
    
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Ping成功! 连接正常工作!");
    
    // 尝试列出数据库
    const dbList = await client.db().admin().listDatabases();
    console.log("可用的数据库:");
    dbList.databases.forEach(db => console.log(` - ${db.name}`));
    
    return true; // 连接成功
  } catch (error) {
    console.error("❌ 连接失败:", error.message);
    return false; // 连接失败
  } finally {
    await client.close();
    console.log("连接已关闭");
  }
}

run(); 