import { Plugin } from 'types';

export const stylusPlugin = (): Plugin => ({
  type: 'style',
  title: 'Stylus',
  name: 'stylus',
  fileExt: 'styl',
  devDeps: {
    default: {
      '@parcel/transformer-stylus': '2.12.0',
    },
    stylelint: {
      'stylelint-stylus': '^1.0.0',
    },
  },
  configs: {
    stylelintConfig: {
      plugins: ['stylelint-stylus'],
      extends: ['stylelint-stylus/standard'],
      rules: {
        'stylus/declaration-colon': 'never',
        'stylus/pythonic': 'always',
        'stylus/selector-list-comma': 'never',
        'stylus/semicolon': 'never',
        'stylus/single-line-comment': 'always',
        'stylus/at-extend-style': ['@extend', '@extends'],
      },
    },
  },
  scripts: {
    stylelint: {
      'lint:styles': 'stylelint src/styles/**/*.styl',
      'lint:styles:fix': 'stylelint src/styles/**/*.styl --fix',
    },
  },
});
