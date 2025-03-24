// 简化版MongoDB连接测试
const { MongoClient } = require("mongodb");

// 连接参数
const username = "kevinhuang98321";
const password = "338962";
const cluster = "cluster0.fq5qr.mongodb.net";
const uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;

console.log("尝试连接到MongoDB...");
console.log("提示：请确保您已在MongoDB Atlas中将您的IP地址添加到白名单");
console.log("      可以在Atlas控制台 -> 网络访问 -> IP白名单中添加当前IP或设置0.0.0.0/0允许所有IP");

// 创建简单客户端
const client = new MongoClient(uri);

async function run() {
  try {
    // 尝试连接
    await client.connect();
    console.log("成功连接到MongoDB!");
    
    // 简单的ping测试
    await client.db("admin").command({ ping: 1 });
    console.log("ping成功!");
    
  } catch (error) {
    console.error("连接错误:", error);
  } finally {
    await client.close();
    console.log("连接已关闭");
  }
}

run(); 