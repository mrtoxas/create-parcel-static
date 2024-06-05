import { PluginBase } from 'types';

export const javascriptPlugin = (): PluginBase => ({
  type: 'script',
  title: 'JavaScript',
  name: 'javascript',
  fileExt: 'js',
  scripts: {
    prettier: {
      'prettier:scripts': 'prettier src/scripts/**/*.js --check',
      'prettier:scripts:fix': 'prettier src/scripts/**/*.js --write',
    },
    eslint: {
      'lint:scripts': 'eslint src/scripts/**/*.js',
      'lint:scripts:fix': 'eslint src/scripts/**/*.js --fix',
    },
  },
});
