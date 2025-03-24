// MongoDB连接测试脚本
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kevinhuang98321:<db_password>@cluster0.fq5qr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// 创建MongoDB客户端
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000
});

async function run() {
  try {
    console.log("尝试连接到MongoDB...");
    // 连接到MongoDB
    await client.connect();
    console.log("成功连接到MongoDB!");
    
    // 确认连接成功
    await client.db("admin").command({ ping: 1 });
    console.log("Ping成功！已成功连接到MongoDB!");
    
    // 连接到growpulse数据库
    const database = client.db("growpulse");
    console.log(`连接到数据库: ${database.databaseName}`);
    
    // 获取集合引用
    const users = database.collection("users");
    
    // 查询用户数量
    const userCount = await users.countDocuments();
    console.log(`数据库中有 ${userCount} 个用户文档`);
    
    // 插入测试文档
    if (userCount === 0) {
      const result = await users.insertOne({
        name: "测试用户",
        email: "test@example.com",
        createdAt: new Date()
      });
      console.log(`已创建测试用户: ${result.insertedId}`);
    }
    
    // 查询所有用户
    const allUsers = await users.find().toArray();
    console.log("用户列表:", allUsers);
    
  } catch (error) {
    console.error("数据库操作出错:", error);
  } finally {
    // 关闭连接
    await client.close();
    console.log("数据库连接已关闭");
  }
}

// 运行测试
run().catch(console.dir); 