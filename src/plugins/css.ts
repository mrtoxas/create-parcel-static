import { PluginBase } from 'types';

export const cssPlugin = (): PluginBase => ({
  type: 'style',
  title: 'CSS',
  name: 'css',
  fileExt: 'css',
  configs: {
    stylelint: {
      extends: ['stylelint-config-standard'],      
    },
  },
  scripts: {
    stylelint: {
      'lint:styles': 'stylelint src/styles/**/*.css',
      'lint:styles:fix': 'stylelint src/styles/**/*.css --fix',
    },
    prettier: {
      'prettier:style': 'prettier src/**/*.css --check',
      'prettier:style:fix': 'prettier src/**/*.css --write',
    },
  },
});
