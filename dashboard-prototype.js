/**
 * GrowPulse仪表盘原型
 * 基于GrowthBook设计的布局和交互模式，但使用GrowPulse的品牌颜色和组件
 */

import React, { useState } from 'react';
import '../design-system/variables.css';
import './dashboard.css';

// 仪表盘组件
export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="gp-dashboard">
      {/* 左侧导航 - 参考GrowthBook布局 */}
      <aside className="gp-sidebar">
        <div className="gp-sidebar-header">
          <img src="/logo.svg" alt="GrowPulse" className="gp-logo" />
        </div>
        
        <nav className="gp-nav">
          <ul className="gp-nav-list">
            <li className={`gp-nav-item ${activeTab === 'overview' ? 'active' : ''}`}>
              <a href="#overview" onClick={() => setActiveTab('overview')}>
                <span className="gp-icon">📊</span>
                <span className="gp-nav-text">概览</span>
              </a>
            </li>
            <li className={`gp-nav-item ${activeTab === 'experiments' ? 'active' : ''}`}>
              <a href="#experiments" onClick={() => setActiveTab('experiments')}>
                <span className="gp-icon">🧪</span>
                <span className="gp-nav-text">实验</span>
              </a>
            </li>
            <li className={`gp-nav-item ${activeTab === 'features' ? 'active' : ''}`}>
              <a href="#features" onClick={() => setActiveTab('features')}>
                <span className="gp-icon">🚩</span>
                <span className="gp-nav-text">特性标志</span>
              </a>
            </li>
            <li className={`gp-nav-item ${activeTab === 'metrics' ? 'active' : ''}`}>
              <a href="#metrics" onClick={() => setActiveTab('metrics')}>
                <span className="gp-icon">📈</span>
                <span className="gp-nav-text">指标</span>
              </a>
            </li>
            <li className={`gp-nav-item ${activeTab === 'team' ? 'active' : ''}`}>
              <a href="#team" onClick={() => setActiveTab('team')}>
                <span className="gp-icon">👥</span>
                <span className="gp-nav-text">团队</span>
              </a>
            </li>
            <li className={`gp-nav-item ${activeTab === 'settings' ? 'active' : ''}`}>
              <a href="#settings" onClick={() => setActiveTab('settings')}>
                <span className="gp-icon">⚙️</span>
                <span className="gp-nav-text">设置</span>
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="gp-sidebar-footer">
          <div className="gp-user-info">
            <img src="/avatar.jpg" alt="用户头像" className="gp-avatar" />
            <span className="gp-username">张三</span>
          </div>
        </div>
      </aside>
      
      {/* 主内容区 - 参考GrowthBook结构但使用GrowPulse设计系统 */}
      <main className="gp-main">
        {/* 顶部操作栏 */}
        <header className="gp-header">
          <div className="gp-header-left">
            <h1 className="gp-page-title">
              {activeTab === 'overview' && '仪表盘概览'}
              {activeTab === 'experiments' && '实验管理'}
              {activeTab === 'features' && '特性标志'}
              {activeTab === 'metrics' && '指标管理'}
              {activeTab === 'team' && '团队管理'}
              {activeTab === 'settings' && '系统设置'}
            </h1>
          </div>
          
          <div className="gp-header-right">
            <div className="gp-search-box">
              <input type="text" placeholder="搜索..." className="gp-search-input" />
              <button className="gp-search-button">🔍</button>
            </div>
            
            <div className="gp-action-buttons">
              <button className="gp-button gp-button-secondary">导入</button>
              <button className="gp-button gp-button-primary">
                {activeTab === 'experiments' && '+ 新建实验'}
                {activeTab === 'features' && '+ 新建特性'}
                {activeTab === 'metrics' && '+ 新建指标'}
                {activeTab === 'team' && '+ 邀请成员'}
                {activeTab !== 'experiments' && activeTab !== 'features' && activeTab !== 'metrics' && activeTab !== 'team' && '+ 新建'}
              </button>
            </div>
          </div>
        </header>
        
        {/* 内容区域 */}
        <div className="gp-content">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'experiments' && <ExperimentsTab />}
          {activeTab === 'features' && <FeaturesTab />}
          {/* 其他标签页内容... */}
        </div>
      </main>
    </div>
  );
};

// 概览标签页 - 卡片式布局参考自GrowthBook
const OverviewTab = () => {
  return (
    <div className="gp-overview">
      <div className="gp-dashboard-grid">
        {/* 状态概览卡片 */}
        <div className="gp-card">
          <div className="gp-card-header">
            <h2 className="gp-card-title">状态概览</h2>
          </div>
          <div className="gp-card-content">
            <div className="gp-stats-grid">
              <div className="gp-stat-item">
                <div className="gp-stat-value">12</div>
                <div className="gp-stat-label">运行中的实验</div>
              </div>
              <div className="gp-stat-item">
                <div className="gp-stat-value">45</div>
                <div className="gp-stat-label">活跃特性标志</div>
              </div>
              <div className="gp-stat-item">
                <div className="gp-stat-value">8</div>
                <div className="gp-stat-label">团队成员</div>
              </div>
              <div className="gp-stat-item">
                <div className="gp-stat-value">24</div>
                <div className="gp-stat-label">定义指标</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 实验结果卡片 */}
        <div className="gp-card">
          <div className="gp-card-header">
            <h2 className="gp-card-title">实验结果</h2>
            <div className="gp-card-actions">
              <button className="gp-button gp-button-small">查看全部</button>
            </div>
          </div>
          <div className="gp-card-content">
            <div className="gp-experiment-list">
              <div className="gp-experiment-item gp-success">
                <div className="gp-experiment-title">注册页优化</div>
                <div className="gp-experiment-metric">+15.8% 转化率</div>
                <div className="gp-experiment-status">显著提升</div>
              </div>
              <div className="gp-experiment-item gp-neutral">
                <div className="gp-experiment-title">新功能引导</div>
                <div className="gp-experiment-metric">+2.1% 使用率</div>
                <div className="gp-experiment-status">无显著差异</div>
              </div>
              <div className="gp-experiment-item gp-danger">
                <div className="gp-experiment-title">定价页调整</div>
                <div className="gp-experiment-metric">-8.3% 转化率</div>
                <div className="gp-experiment-status">负面影响</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 团队活动卡片 */}
        <div className="gp-card">
          <div className="gp-card-header">
            <h2 className="gp-card-title">最近活动</h2>
          </div>
          <div className="gp-card-content">
            <div className="gp-activity-list">
              <div className="gp-activity-item">
                <div className="gp-activity-avatar">
                  <img src="/avatar-1.jpg" alt="用户头像" />
                </div>
                <div className="gp-activity-details">
                  <div className="gp-activity-user">李四</div>
                  <div className="gp-activity-action">创建了新实验 "移动端导航优化"</div>
                  <div className="gp-activity-time">2小时前</div>
                </div>
              </div>
              <div className="gp-activity-item">
                <div className="gp-activity-avatar">
                  <img src="/avatar-2.jpg" alt="用户头像" />
                </div>
                <div className="gp-activity-details">
                  <div className="gp-activity-user">王五</div>
                  <div className="gp-activity-action">更新了特性标志 "新支付流程"</div>
                  <div className="gp-activity-time">昨天</div>
                </div>
              </div>
              <div className="gp-activity-item">
                <div className="gp-activity-avatar">
                  <img src="/avatar-3.jpg" alt="用户头像" />
                </div>
                <div className="gp-activity-details">
                  <div className="gp-activity-user">赵六</div>
                  <div className="gp-activity-action">添加了新指标 "用户停留时间"</div>
                  <div className="gp-activity-time">2天前</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 实验标签页 - 表格布局参考自GrowthBook但使用GrowPulse样式
const ExperimentsTab = () => {
  return (
    <div className="gp-experiments">
      <div className="gp-filters">
        <div className="gp-filter-group">
          <label className="gp-filter-label">状态:</label>
          <select className="gp-select">
            <option>全部</option>
            <option>进行中</option>
            <option>已结束</option>
            <option>草稿</option>
          </select>
        </div>
        <div className="gp-filter-group">
          <label className="gp-filter-label">标签:</label>
          <select className="gp-select">
            <option>全部</option>
            <option>前端</option>
            <option>转化率</option>
            <option>性能</option>
          </select>
        </div>
      </div>
      
      <div className="gp-table-container">
        <table className="gp-table">
          <thead>
            <tr>
              <th>实验名称</th>
              <th>状态</th>
              <th>标签</th>
              <th>开始日期</th>
              <th>结果</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="gp-experiment-name">主页重新设计</div>
                <div className="gp-experiment-description">测试新的首页设计对转化的影响</div>
              </td>
              <td><span className="gp-badge gp-badge-success">进行中</span></td>
              <td><span className="gp-tag">前端</span> <span className="gp-tag">转化率</span></td>
              <td>2023-03-15</td>
              <td>
                <div className="gp-result-indicator gp-positive">+12.4%</div>
              </td>
              <td>
                <div className="gp-actions">
                  <button className="gp-button gp-button-icon">📊</button>
                  <button className="gp-button gp-button-icon">✏️</button>
                  <button className="gp-button gp-button-icon">⋮</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="gp-experiment-name">新用户引导流程</div>
                <div className="gp-experiment-description">测试简化的新用户引导对激活率的影响</div>
              </td>
              <td><span className="gp-badge gp-badge-success">进行中</span></td>
              <td><span className="gp-tag">激活</span> <span className="gp-tag">新用户</span></td>
              <td>2023-03-10</td>
              <td>
                <div className="gp-result-indicator gp-neutral">+1.8%</div>
              </td>
              <td>
                <div className="gp-actions">
                  <button className="gp-button gp-button-icon">📊</button>
                  <button className="gp-button gp-button-icon">✏️</button>
                  <button className="gp-button gp-button-icon">⋮</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="gp-experiment-name">搜索结果排序优化</div>
                <div className="gp-experiment-description">测试新的搜索算法对用户点击率的影响</div>
              </td>
              <td><span className="gp-badge gp-badge-neutral">已完成</span></td>
              <td><span className="gp-tag">搜索</span> <span className="gp-tag">点击率</span></td>
              <td>2023-02-20</td>
              <td>
                <div className="gp-result-indicator gp-positive">+8.7%</div>
              </td>
              <td>
                <div className="gp-actions">
                  <button className="gp-button gp-button-icon">📊</button>
                  <button className="gp-button gp-button-icon">✏️</button>
                  <button className="gp-button gp-button-icon">⋮</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="gp-pagination">
        <button className="gp-button gp-button-icon">◀</button>
        <div className="gp-page-numbers">
          <button className="gp-button gp-button-page active">1</button>
          <button className="gp-button gp-button-page">2</button>
          <button className="gp-button gp-button-page">3</button>
        </div>
        <button className="gp-button gp-button-icon">▶</button>
      </div>
    </div>
  );
};

// 特性标志标签页
const FeaturesTab = () => {
  return (
    <div className="gp-features">
      <div className="gp-card">
        <div className="gp-card-header">
          <h2 className="gp-card-title">激活的特性标志</h2>
          <div className="gp-card-actions">
            <button className="gp-button gp-button-small">导出</button>
          </div>
        </div>
        
        <div className="gp-feature-list">
          <div className="gp-feature-item">
            <div className="gp-feature-header">
              <div className="gp-feature-name">新支付流程</div>
              <div className="gp-feature-controls">
                <div className="gp-toggle">
                  <input type="checkbox" id="feature1" className="gp-toggle-input" checked />
                  <label htmlFor="feature1" className="gp-toggle-label"></label>
                </div>
              </div>
            </div>
            <div className="gp-feature-details">
              <div className="gp-feature-description">新的简化支付流程，减少了结账步骤</div>
              <div className="gp-feature-meta">
                <span className="gp-tag">已发布</span>
                <span className="gp-meta-info">100% 用户</span>
                <span className="gp-meta-info">更新于 2天前</span>
              </div>
            </div>
          </div>
          
          <div className="gp-feature-item">
            <div className="gp-feature-header">
              <div className="gp-feature-name">黑暗模式</div>
              <div className="gp-feature-controls">
                <div className="gp-toggle">
                  <input type="checkbox" id="feature2" className="gp-toggle-input" checked />
                  <label htmlFor="feature2" className="gp-toggle-label"></label>
                </div>
              </div>
            </div>
            <div className="gp-feature-details">
              <div className="gp-feature-description">为应用提供深色主题选项</div>
              <div className="gp-feature-meta">
                <span className="gp-tag">测试中</span>
                <span className="gp-meta-info">50% 用户</span>
                <span className="gp-meta-info">更新于 1周前</span>
              </div>
            </div>
          </div>
          
          <div className="gp-feature-item">
            <div className="gp-feature-header">
              <div className="gp-feature-name">AI推荐</div>
              <div className="gp-feature-controls">
                <div className="gp-toggle">
                  <input type="checkbox" id="feature3" className="gp-toggle-input" />
                  <label htmlFor="feature3" className="gp-toggle-label"></label>
                </div>
              </div>
            </div>
            <div className="gp-feature-details">
              <div className="gp-feature-description">基于用户行为的智能推荐系统</div>
              <div className="gp-feature-meta">
                <span className="gp-tag">开发中</span>
                <span className="gp-meta-info">内部用户</span>
                <span className="gp-meta-info">更新于 3天前</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 