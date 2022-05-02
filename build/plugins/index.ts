import { PluginOption } from 'vite';
import vue from './vue';
import compression from './compression';
import unplugins from './unplugins';
import visualizer from './visualizer';
import html from './html';

/**
 * vite插件
 * @param viteEnv importMeta对象
 * @param srcPath src的路径
 * @returns 插件
 */
export const VitePlugins = (viteEnv: ImportMetaEnv, srcPath: string): (PluginOption | PluginOption[])[] => {
  const plugins = [...vue, html(viteEnv), ...unplugins(srcPath)];

  if (viteEnv.VITE_VISUALIZER) {
    plugins.push(visualizer);
  }

  if (viteEnv.VITE_COMPRESS) {
    plugins.push(compression(viteEnv));
  }

  return plugins;
};
