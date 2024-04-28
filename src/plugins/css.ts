import { Plugin } from 'types';

export const cssPlugin = (): Plugin => ({
  type: 'style',
  title: 'CSS',
  name: 'css',
  fileExt: 'css',
  configs: {
    stylelintConfig: {
      extends: ['stylelint-config-standard'],
      rules: {
        'declaration-colon-space-after': 'always',
      },
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
