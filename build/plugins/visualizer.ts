import visualizer from 'rollup-plugin-visualizer';

export default visualizer({
  open: true,
  brotliSize: true,
  gzipSize: true
});
