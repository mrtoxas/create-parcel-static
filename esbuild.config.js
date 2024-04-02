import { nodeExternalsPlugin } from 'esbuild-node-externals';
import { build } from 'esbuild';

build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  minify: true,
  platform: 'node',
  target: 'es2020',
  plugins: [nodeExternalsPlugin()],
  outfile: 'dist/index.mjs',
  format: 'esm',
}).catch((error) => {
  // eslint-disable-next-line no-undef
  console.error('Error building esm bundle:', error);
  // eslint-disable-next-line no-undef
  process.exit(1);
});
