/**
 * GrowPulse颜色系统
 * 用于保持整个应用程序的颜色一致性
 */

// 主要颜色
export const primary = {
  50: '#F4F1FB',
  100: '#E9E3F7',
  200: '#D3C6EF',
  300: '#BEA9E7',
  400: '#A88DDF',
  500: '#8F6CD7', // 主色调
  600: '#6A44CC', // 按钮和重点元素
  700: '#5637AA',
  800: '#422A88',
  900: '#2F1D66',
};

// 成功/积极颜色 
export const success = {
  50: '#E7F7F2',
  100: '#D0F0E6',
  200: '#A1E1CD',
  300: '#72D2B4',
  400: '#46C89A', // 主绿色
  500: '#35AE82',
  600: '#2B9069',
  700: '#227251',
  800: '#185438',
  900: '#0E3621',
};

// 警告/危险颜色
export const danger = {
  50: '#FFEFEC',
  100: '#FFDED9',
  200: '#FFBDB3',
  300: '#FF9C8D',
  400: '#FF7C68',
  500: '#FF5A35', // 主警告色
  600: '#E53A14',
  700: '#C22F10',
  800: '#9F250C',
  900: '#7D1C08',
};

// 信息/中性蓝色
export const info = {
  50: '#EEF6FF',
  100: '#DCEEFF',
  200: '#B9DDFF',
  300: '#96CBFF',
  400: '#72AAFF',
  500: '#368BFF', // 主信息色
  600: '#0069FF',
  700: '#0055D4',
  800: '#0041A3',
  900: '#002D73',
};

// 中性/灰色
export const gray = {
  50: '#F8F9FD', // 背景色
  100: '#E1E4ED', // 边框
  200: '#C4C8D4',
  300: '#A8ADBB',
  400: '#8B91A1',
  500: '#71767F', // 次要文本
  600: '#585C64',
  700: '#3F4249',
  800: '#2C3039', // 主要文本
  900: '#15171C',
};

// 导出完整颜色系统
export const colors = {
  primary,
  success,
  danger,
  info,
  gray,
  white: '#FFFFFF',
  black: '#000000',
  background: {
    light: gray[50],
    dark: gray[800],
  },
  text: {
    primary: gray[800],
    secondary: gray[500],
    disabled: gray[300],
  },
}; 