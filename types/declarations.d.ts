declare module 'express-unless';
declare module 'tedious';
declare module 'lz4';
declare module '@hapi/shot';

// 添加缺失的全局错误类型
interface ErrorOptions {
  cause?: unknown;
}

interface AggregateError extends Error {
  errors: any[];
} 