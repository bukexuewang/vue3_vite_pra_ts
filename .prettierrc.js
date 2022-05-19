module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: false, // jsx强制单引号
  jsxBracketSameLine: true,
  printWidth: 120, // 单行最长100
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true, // 段落后缀冒号
  singleQuote: true, // 单引号
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
  vueIndentScriptAndStyle: false,
  // 其他设置
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html'
      }
    },
    {
      files: '*.json',
      options: {
        printWidth: 200
      }
    }
  ]
}
