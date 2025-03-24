// 最简化的MongoDB连接测试
const { MongoClient } = require("mongodb");

// 密码从命令行获取，默认尝试338962
const password = process.argv[2] || "338962";
const uri = `mongodb+srv://kevinhuang98321:${password}@cluster0.fq5qr.mongodb.net/?retryWrites=true&w=majority`;

console.log(`尝试使用密码 "${password}" 连接MongoDB...`);
console.log("重要提示: 请确保已在MongoDB Atlas中将您的IP地址添加到白名单");

// 创建简单客户端，不使用额外选项
const client = new MongoClient(uri);

async function run() {
  try {
    console.log("正在连接...");
    await client.connect();
    console.log("✅ 成功连接到MongoDB!");
    
    return true;
  } catch (error) {
    console.error("❌ 连接失败:", error.message);
    
    // 添加一些常见错误提示
    if (error.message.includes("bad auth")) {
      console.log("🔑 认证失败: 密码可能不正确");
    } else if (error.message.includes("ECONNRESET")) {
      console.log("🔒 IP访问限制: 您需要在MongoDB Atlas中添加您的IP到白名单");
      console.log("步骤: 登录Atlas -> Network Access -> Add IP Address -> Add Current IP Address");
    }
    
    return false;
  } finally {
    try {
      await client.close();
      console.log("连接已关闭");
    } catch (e) {
      // 忽略关闭连接时的错误
    }
  }
}

run(); 