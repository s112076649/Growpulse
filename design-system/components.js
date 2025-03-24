/**
 * GrowPulse组件样式系统
 * 定义常用组件的样式规范
 */

// 间距系统
export const spacing = {
  '0': '0',
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '8': '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
  '20': '80px',
  '24': '96px',
};

// 边框圆角
export const borderRadius = {
  none: '0',
  sm: '2px',
  md: '4px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
};

// 阴影
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

// 过渡效果
export const transitions = {
  default: 'all 0.2s ease-in-out',
  fast: 'all 0.1s ease-in-out',
  slow: 'all 0.3s ease-in-out',
};

// 按钮样式
export const buttons = {
  // 主要按钮
  primary: {
    backgroundColor: 'var(--primary-600)',
    color: 'var(--white)',
    borderRadius: borderRadius.md,
    padding: `${spacing['3']} ${spacing['5']}`,
    fontSize: '16px',
    fontWeight: 500,
    border: 'none',
    boxShadow: shadows.sm,
    transition: transitions.default,
    '&:hover': {
      backgroundColor: 'var(--primary-700)',
      boxShadow: shadows.md,
    },
    '&:focus': {
      outline: 'none',
      boxShadow: '0 0 0 3px var(--primary-200)',
    },
    '&:disabled': {
      backgroundColor: 'var(--gray-300)',
      color: 'var(--gray-500)',
      cursor: 'not-allowed',
    },
  },
  
  // 次要按钮
  secondary: {
    backgroundColor: 'var(--white)',
    color: 'var(--primary-600)',
    borderRadius: borderRadius.md,
    padding: `${spacing['3']} ${spacing['5']}`,
    fontSize: '16px',
    fontWeight: 500,
    border: '1px solid var(--primary-600)',
    boxShadow: 'none',
    transition: transitions.default,
    '&:hover': {
      backgroundColor: 'var(--primary-50)',
    },
    '&:focus': {
      outline: 'none',
      boxShadow: '0 0 0 3px var(--primary-200)',
    },
    '&:disabled': {
      borderColor: 'var(--gray-300)',
      color: 'var(--gray-500)',
      cursor: 'not-allowed',
    },
  },
  
  // 危险按钮
  danger: {
    backgroundColor: 'var(--danger-500)',
    color: 'var(--white)',
    borderRadius: borderRadius.md,
    padding: `${spacing['3']} ${spacing['5']}`,
    fontSize: '16px',
    fontWeight: 500,
    border: 'none',
    boxShadow: shadows.sm,
    transition: transitions.default,
    '&:hover': {
      backgroundColor: 'var(--danger-600)',
    },
    '&:focus': {
      outline: 'none',
      boxShadow: '0 0 0 3px var(--danger-200)',
    },
    '&:disabled': {
      backgroundColor: 'var(--gray-300)',
      color: 'var(--gray-500)',
      cursor: 'not-allowed',
    },
  },
};

// 卡片样式
export const cards = {
  default: {
    backgroundColor: 'var(--white)',
    borderRadius: borderRadius.lg,
    boxShadow: shadows.md,
    padding: spacing['6'],
    overflow: 'hidden',
  },
  compact: {
    backgroundColor: 'var(--white)',
    borderRadius: borderRadius.md,
    boxShadow: shadows.sm,
    padding: spacing['4'],
    overflow: 'hidden',
  },
  flat: {
    backgroundColor: 'var(--white)',
    borderRadius: borderRadius.md,
    border: '1px solid var(--gray-100)',
    padding: spacing['6'],
    overflow: 'hidden',
  },
};

// 输入框样式
export const inputs = {
  default: {
    backgroundColor: 'var(--white)',
    borderRadius: borderRadius.md,
    border: '1px solid var(--gray-300)',
    padding: `${spacing['2']} ${spacing['3']}`,
    fontSize: '16px',
    lineHeight: '1.5',
    width: '100%',
    transition: transitions.default,
    '&:hover': {
      borderColor: 'var(--gray-400)',
    },
    '&:focus': {
      outline: 'none',
      borderColor: 'var(--primary-500)',
      boxShadow: '0 0 0 3px var(--primary-100)',
    },
    '&:disabled': {
      backgroundColor: 'var(--gray-100)',
      color: 'var(--gray-500)',
      cursor: 'not-allowed',
    },
    '&::placeholder': {
      color: 'var(--gray-400)',
    },
  },
};

// 导出完整组件样式系统
export const components = {
  spacing,
  borderRadius,
  shadows,
  transitions,
  buttons,
  cards,
  inputs,
}; 