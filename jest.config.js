/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname),
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  maxWorkers: 1,
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest', // vue 文件用 vue-jest 转换
    '^.+\\.ts$': 'ts-jest', // ts 文件用 ts-jest 转换
    '^.+\\.(tsx|js|jsx)$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  // 为了修复 Consider using the "jsdom" test environment. 问题
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./tests/setup.ts'],
  // 测试文件
  // testMatch: ['<rootDir>/tests/**/*.test.(ts|tsx|js)'],
  testPathIgnorePatterns: ['/node_modules/'],
  /** 全局alias */
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
