import path from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from 'unocss/vite';
import { presetIcons, presetUno } from 'unocss';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5001,
    headers: {
      'cross-origin-embedder-policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'cross-origin'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }),
    vueJsx(),
    Unocss({
      presets: [
        presetUno(),
        presetIcons({
          scale: 1,
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle'
          },
          collections: {
            custom: FileSystemIconLoader('./src/assets/svg', (svg) =>
              svg
                // .replace(/fill=".+?"/g, 'fill="currentColor"')
                // .replace(/^<svg /, '<svg fill="currentColor" ')
                .replace(/<title>[^]+<\/title>/, '')
            )
          },
          customizations: {
            customize(props) {
              props.width = '1em';
              props.height = '1em';
              return props;
            }
          }
        })
      ], // 使用自带的内部预设， 按需引用
      variants: [
        // hover:
        (matcher) => {
          if (!matcher.startsWith('hover:')) return matcher;
          return {
            // slice `hover:` prefix and passed to the next variants and rules
            matcher: matcher.slice(6),
            selector: (s) => `${s}:hover`
          };
        }
      ],
      rules: [
        [/^z-(\d+)$/, ([, d]) => ({ 'z-index': d })],
        [/^row-gap-(\w+)$/, ([, w]) => ({ 'row-gap': w })],
        [/^col-gap-(\w+)$/, ([, w]) => ({ 'column-gap': w })],
        [
          'p-c',
          {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }
        ],
        [
          'f-c',
          {
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center'
          }
        ]
      ],
      shortcuts: {
        'flex-title': 'flex items-center justify-between py-8px rd-12px px-16px bg-white'
      }
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        {
          axios: [['default', 'axios']]
        }
      ],
      dirs: [
        './src/hooks',
        // './composables' // only root modules
        './src/composables/**' // all nested modules
      ],
      dts: './src/auto-imports.d.ts',

      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ],
      dirs: ['./src/components/global', './src/components/common'],
      // exclude: [/[\\/]type/],
      extensions: ['vue'],
      dts: './src/components.d.ts'
    })
  ]
});
