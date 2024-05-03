import { PluginBase } from 'types';

export const htmlPlugin = (): PluginBase => ({
  type: 'markup',
  title: 'HTML',
  name: 'html',
  fileExt: 'html',
  scripts: {
    prettier: {
      'prettier:markup': 'prettier src/**/*.html --check',
      'prettier:markup:fix': 'prettier src/**/*.html --write',
    },
  },
});
