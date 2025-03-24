-- Supabase设置脚本
-- 将此脚本粘贴到Supabase SQL编辑器中执行

-- 启用UUID扩展
create extension if not exists "uuid-ossp";

-- 创建用户表
create table if not exists users (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  name text,
  password_hash text,
  role text default 'user',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 创建项目表
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  owner_id uuid references users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 创建特性标志表
create table if not exists features (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade,
  name text not null,
  description text,
  status text default 'draft',
  rules jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 创建实验表
create table if not exists experiments (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade,
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

-- 创建行级安全策略
-- 启用行级安全
alter table users enable row level security;
alter table projects enable row level security;
alter table features enable row level security;
alter table experiments enable row level security;

-- 用户表策略
create policy "Users can view their own user data" on users
  for select using (auth.uid() = id);
  
create policy "Users can update their own data" on users
  for update using (auth.uid() = id);

-- 项目表策略
create policy "Projects are viewable by owner" on projects
  for select using (auth.uid() = owner_id);
  
create policy "Projects are insertable by authenticated users" on projects
  for insert with check (auth.role() = 'authenticated');
  
create policy "Projects are updatable by owner" on projects
  for update using (auth.uid() = owner_id);
  
create policy "Projects are deletable by owner" on projects
  for delete using (auth.uid() = owner_id);

-- 特性标志表策略
create policy "Features are viewable by project owner" on features
  for select using (
    exists (
      select 1 from projects
      where projects.id = features.project_id
      and projects.owner_id = auth.uid()
    )
  );
  
create policy "Features are insertable by project owner" on features
  for insert with check (
    exists (
      select 1 from projects
      where projects.id = features.project_id
      and projects.owner_id = auth.uid()
    )
  );
  
create policy "Features are updatable by project owner" on features
  for update using (
    exists (
      select 1 from projects
      where projects.id = features.project_id
      and projects.owner_id = auth.uid()
    )
  );
  
create policy "Features are deletable by project owner" on features
  for delete using (
    exists (
      select 1 from projects
      where projects.id = features.project_id
      and projects.owner_id = auth.uid()
    )
  );

-- 实验表策略
create policy "Experiments are viewable by project owner" on experiments
  for select using (
    exists (
      select 1 from projects
      where projects.id = experiments.project_id
      and projects.owner_id = auth.uid()
    )
  );
  
create policy "Experiments are insertable by project owner" on experiments
  for insert with check (
    exists (
      select 1 from projects
      where projects.id = experiments.project_id
      and projects.owner_id = auth.uid()
    )
  );
  
create policy "Experiments are updatable by project owner" on experiments
  for update using (
    exists (
      select 1 from projects
      where projects.id = experiments.project_id
      and projects.owner_id = auth.uid()
    )
  );
  
create policy "Experiments are deletable by project owner" on experiments
  for delete using (
    exists (
      select 1 from projects
      where projects.id = experiments.project_id
      and projects.owner_id = auth.uid()
    )
  ); 