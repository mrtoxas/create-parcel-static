import { PluginBase } from 'types';

export const pugPlugin = (): PluginBase => ({
  type: 'markup',
  title: 'Pug',
  name: 'pug',
  fileExt: 'pug',
  devDeps: {
    default: {
      '@parcel/transformer-pug': '2.12.0',
    },
    prettier: {
      '@prettier/plugin-pug': '^3.0.0',
    },
  },
  scripts: {
    prettier: {
      'prettier:markup': 'prettier src/**/*.pug --check --plugin=@prettier/plugin-pug',
      'prettier:markup:fix': 'prettier src/**/*.pug --write --plugin=@prettier/plugin-pug',
    },
  },
});
