import unocssPlugin from './unocss';
import { AutoPlugins } from './auto';
import htmlPlugin from './html';
import compressPlugin from './compression';

export const vitePlugins = (viteEnv: ImportMetaEnv, mode: string) => {
  return [htmlPlugin(viteEnv), compressPlugin(viteEnv), ...AutoPlugins, unocssPlugin];
};
