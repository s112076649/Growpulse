  <h1 className="mb-0">
    Welcome to GrowPulse
    {organization?.name && (
      <span className="text-muted ml-3">({organization.name})</span>
    )}
  </h1>

  {/* 选定功能提示 */}
  <div className="alert alert-info mt-3 mb-4">
    <h4 className="alert-heading">启用的高级功能</h4>
    <p>
      本版本已启用以下学习和研究用途的高级功能：
    </p>
    <ul>
      <li>
        <strong>计划功能标志</strong> - 设置功能标志的自动启用/禁用时间
      </li>
      <li>
        <strong>审计日志</strong> - 跟踪系统中的重要操作和变更
      </li>
      <li>
        <strong>团队管理</strong> - 创建和管理团队，分配权限和责任
      </li>
    </ul>
    <p className="mb-0">
      详情请查看 <a href="/SELECT-FEATURES.md" target="_blank" rel="noopener noreferrer">选定功能说明文档</a>
    </p>
  </div>

  <TabNav 