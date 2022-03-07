module.exports = {
  tabWidth: 2, // tab进位空格
  jsxSingleQuote: true, // jsx强制单引号
  jsxBracketSameLine: true,
  printWidth: 100, // 单行最长100
  singleQuote: true, // 单引号
  semi: false, // 段落后缀冒号
  // 其他设置
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 200,
      },
    },
  ],
  arrowParens: "always",
};
