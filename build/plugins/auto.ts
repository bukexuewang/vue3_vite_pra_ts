import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

export const AutoPlugins = [
  AutoImport({
    // resolvers: [ElementPlusResolver(), ExtraVueResolver()],
    imports: [
      'vue',
      'vue-router',
      'vue-i18n',
      {
        axios: [['default', 'axios']]
      }
    ],
    // dts: './src/typings/auto-imports.d.ts',
    dirs: [
      './src/hooks',
      // './composables' // only root modules
      './src/composables/**' // all nested modules
    ],
    eslintrc: {
      enabled: true, // Default `false`
      filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    }
  }),
  Components({
    resolvers: [
      // ElementPlusResolver({
      //   importStyle: 'sass'
      // })
    ],
    // exclude: [/[\\/]type/],
    extensions: ['vue']
    // dts: './src/typings/components.d.ts',
  })
];
