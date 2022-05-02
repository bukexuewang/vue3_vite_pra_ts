import DefineOptions from 'unplugin-vue-define-options/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';

export default (srcPath: string) => [
  DefineOptions(),
  Icons({
    compiler: 'vue3',
    customCollections: {
      custom: FileSystemIconLoader(`${srcPath}/assets/svg`)
    },
    scale: 1,
    defaultClass: 'inline-block'
  }),
  Components({
    dts: 'src/typings/component.d.ts',
    types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
    resolvers: [IconsResolver({ customCollections: ['custom'], componentPrefix: 'icon' })]
  }),
  AutoImport({
    dts: 'src/typings/auto-import.d.ts',
    include: [/\.vue$/, /\.tsx?/],
    imports: ['vue', 'vue-router'],
    eslintrc: {
      enabled: false, // Default `false`
      filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    }
  })
];
