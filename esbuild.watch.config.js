import { nodeExternalsPlugin } from 'esbuild-node-externals';
import esbuild from 'esbuild';

async function watch() {
  let ctx = await esbuild.context({
    entryPoints: ["./src/index.ts"],
    minify: false,
    outfile: "./dist/index.mjs",
    bundle: true,
    platform: "node",
    target: 'es2020',
    format: "esm",
    loader: { ".ts": "ts" },
    plugins: [nodeExternalsPlugin()],
  });
  await ctx.watch();
  // eslint-disable-next-line no-undef
  console.log('Watching...');
}
watch();