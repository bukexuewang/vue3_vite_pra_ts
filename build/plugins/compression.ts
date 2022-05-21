import viteCompression from 'vite-plugin-compression';

// gzip压缩 生产环境生成 .gz 文件
export default (viteEnv: ImportMetaEnv) => {
  const { VITE_COMPRESS_TYPE = 'gzip' } = viteEnv;
  return viteCompression({
    verbose: true,
    disable: false,
    threshold: 10240,
    algorithm: VITE_COMPRESS_TYPE,
    ext: '.gz',
  });
};
