import DefineOptions from 'unplugin-vue-define-options/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
// import Inspect from 'vite-plugin-inspect';

export default (srcPath: string) => [
  DefineOptions(),
  Icons({
    compiler: 'vue3', // 编译方式
    customCollections: {
      custom: FileSystemIconLoader(`${srcPath}/assets/svg`),
    },
    scale: 1, // 缩放 默认为1.2
    defaultClass: 'dp_ib', // 默认类名 默认''
    defaultStyle: '', // 默认样式 默认''
    autoInstall: true,
  }),
  Components({
    dts: 'src/typings/component.d.ts',
    types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
    resolvers: [
      // 一些组件将图标文件都写在https://icones.netlify.app/网站上
      // 自动注册图标组件
      IconsResolver({
        prefix: 'icon', // 默认值为 i
        customCollections: ['custom'],
        enabledCollections: ['ep'], // ep为element-plus的缩写
      }),
      // Auto register Element Plus components
      // 自动导入 Element Plus 组件
      ElementPlusResolver(),
    ],
  }),
  AutoImport({
    dts: 'src/typings/auto-import.d.ts',
    resolvers: [ElementPlusResolver()],
    include: [/\.vue$/, /\.tsx?/],
    imports: ['vue', 'vue-router'],
    eslintrc: {
      enabled: false, // Default `false`
      filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    },
  }),
  // Inspect(),
];
