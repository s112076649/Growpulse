-- 简化的Supabase设置脚本（无RLS）
-- 将此脚本粘贴到Supabase SQL编辑器中执行

-- 启用UUID扩展
create extension if not exists "uuid-ossp";

-- 创建用户表
create table public.users (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  name text,
  password_hash text,
  role text default 'user',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 创建项目表
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  owner_id uuid references public.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 创建特性标志表
create table public.features (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  name text not null,
  description text,
  status text default 'draft',
  rules jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 创建实验表
create table public.experiments (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  name text not null, 
  hypothesis text,
  status text default 'draft',
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  variations jsonb,
  metrics jsonb,
  results jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
); 