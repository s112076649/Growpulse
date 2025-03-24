// Supabase客户端配置
import { createClient } from '@supabase/supabase-js';

// 从环境变量获取Supabase URL和密钥
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// 创建Supabase客户端
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase; 