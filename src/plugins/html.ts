import { Plugin } from 'types';

export const htmlPlugin = (): Plugin => ({
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
