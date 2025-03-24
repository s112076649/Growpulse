/**
 * GrowPulse设计系统
 * 集中管理和导出所有设计系统元素
 */

import { colors } from './colors';
import { typography } from './typography';
import { components } from './components';

// 导出完整设计系统
const designSystem = {
  colors,
  typography,
  components,
  // 元数据
  meta: {
    name: 'GrowPulse Design System',
    version: '1.0.0',
    description: 'A comprehensive design system for GrowPulse application',
  },
};

export default designSystem;

// 为了方便单独使用，导出各个部分
export { colors } from './colors';
export { typography } from './typography';
export { components } from './components'; 