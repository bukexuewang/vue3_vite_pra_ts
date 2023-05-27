import unocssPlugin from './unocss';
import { AutoPlugins } from './auto';
import htmlPlugin from './html';
import compressPlugin from './compression';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';

export const vitePlugins = (viteEnv: ImportMetaEnv, mode: string) => {
  const plugins = [Vue(), VueJsx(), htmlPlugin(viteEnv), ...AutoPlugins, unocssPlugin];
  if (mode === 'prod') plugins.push(compressPlugin(viteEnv));
  return plugins;
};
