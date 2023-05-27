import { defineConfig, loadEnv } from 'vite';
import { vitePlugins } from './build/index';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd()) as unknown as ImportMetaEnv;

  return {
    server: {
      host: '0.0.0.0',
      port: 8090,
      open: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: vitePlugins(viteEnv, mode),
  };
});
