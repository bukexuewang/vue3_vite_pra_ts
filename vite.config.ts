import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import { getEnvConfig } from './.env-config';
import { VitePlugins, createViteProxy, viteDefine } from './build';

// https://vitejs.dev/config/
export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv;
  const isOpenProxy = viteEnv.VITE_HTTP_PROXY === 'true';

  const rootPath = fileURLToPath(new URL('./', import.meta.url));
  const srcPath = `${rootPath}src`;

  const envConfig = getEnvConfig(viteEnv);

  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        '@': srcPath
      }
    },
    define: viteDefine,
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "/src/styles/scss/variable.scss" as *;`
        }
      }
    },
    server: {
      port: 8083,
      host: 'localhost',
      open: true,
      proxy: createViteProxy(isOpenProxy, envConfig)
    },
    build: {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      brotliSize: false
    },
    plugins: VitePlugins(viteEnv, srcPath)
  };
});
