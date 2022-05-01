# vue3 + vite + typescript + pina 练习项目`

> * 此项目要求的`node`版本至少要在`12`以上，`npm`在6.14以上
> * 此项目规范比较齐全，书写起来会有很多限制，需要简易版本的查看分支`dev:single`
> * 此项目使用`pnpm`第三方包管理工具

```bash
// 可以使用此命令来安装pnpm
npm i -g pnpm
// 可以使用此命令来升级pnpm
pnpm add -g pnpm
```
建议包工具的使用顺序`pnpm > yarn > npm > cnpm`

## 项目介绍
版本都是可以是最新版本
> 技术站是 [vue3](https://vue3js.cn/)
> 框架是 [vite](https://cn.vitejs.dev/)
> 语言 html css scss javascript [typescript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
> 代码规范 [eslint](http://eslint.cn/docs/user-guide/configuring) [prettier](https://www.prettier.cn/docs/index.html)
> 路由跳转 [vue-router@4](https://router.vuejs.org/zh/)
> 状态管理器 [pinia](https://pinia.vuejs.org/)

此项目可以用作日常开发的模板
``注意``此模板没有添加ui框架，需要`ui`框架的请查看分支`dev:element-plus`或`dev:naive-ui`

package.json 可以添加的内容
```json
{
  "script": {
    "prepare": "husky install"
  },
   "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx,vue,js,jsx}": [
      "npm run lint",
      "npm run prettier",
      "git add"
    ]
  }
}
```

此项目参考项目模板 开源项目[Soybean Admin](https://github.com/honghuangdc/soybean-admin '一个基于 Vue3 + Vite + Naive UI + TypeScript 的漂亮清爽的中后台模版')