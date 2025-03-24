// Supabase数据适配器
// 将MongoDB风格的操作转换为Supabase操作
import supabase from './supabase-config';

// 用户相关操作
export const userService = {
  // 创建用户
  async createUser(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  // 根据ID查找用户
  async findUserById(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // 根据邮箱查找用户
  async findUserByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },
  
  // 更新用户
  async updateUser(userId, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select();
    
    if (error) throw error;
    return data[0];
  }
};

// 项目相关操作
export const projectService = {
  // 创建项目
  async createProject(projectData) {
    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  // 获取用户的所有项目
  async getProjectsByUserId(userId) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('owner_id', userId);
    
    if (error) throw error;
    return data;
  },
  
  // 根据ID获取项目
  async getProjectById(projectId) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // 更新项目
  async updateProject(projectId, updates) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  // 删除项目
  async deleteProject(projectId) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);
    
    if (error) throw error;
    return true;
  }
};

// 特性标志相关操作
export const featureService = {
  // 创建特性标志
  async createFeature(featureData) {
    const { data, error } = await supabase
      .from('features')
      .insert([featureData])
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  // 获取项目的所有特性标志
  async getFeaturesByProjectId(projectId) {
    const { data, error } = await supabase
      .from('features')
      .select('*')
      .eq('project_id', projectId);
    
    if (error) throw error;
    return data;
  },
  
  // 根据ID获取特性标志
  async getFeatureById(featureId) {
    const { data, error } = await supabase
      .from('features')
      .select('*')
      .eq('id', featureId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // 更新特性标志
  async updateFeature(featureId, updates) {
    const { data, error } = await supabase
      .from('features')
      .update(updates)
      .eq('id', featureId)
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  // 删除特性标志
  async deleteFeature(featureId) {
    const { error } = await supabase
      .from('features')
      .delete()
      .eq('id', featureId);
    
    if (error) throw error;
    return true;
  }
};

// 实验相关操作
export const experimentService = {
  // 创建实验
  async createExperiment(experimentData) {
    const { data, error } = await supabase
      .from('experiments')
      .insert([experimentData])
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  // 获取项目的所有实验
  async getExperimentsByProjectId(projectId) {
    const { data, error } = await supabase
      .from('experiments')
      .select('*')
      .eq('project_id', projectId);
    
    if (error) throw error;
    return data;
  },
  
  // 根据ID获取实验
  async getExperimentById(experimentId) {
    const { data, error } = await supabase
      .from('experiments')
      .select('*')
      .eq('id', experimentId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // 更新实验
  async updateExperiment(experimentId, updates) {
    const { data, error } = await supabase
      .from('experiments')
      .update(updates)
      .eq('id', experimentId)
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  // 删除实验
  async deleteExperiment(experimentId) {
    const { error } = await supabase
      .from('experiments')
      .delete()
      .eq('id', experimentId);
    
    if (error) throw error;
    return true;
  }
}; 