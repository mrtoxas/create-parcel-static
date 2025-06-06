import { PluginBase } from 'types';

export const stylusPlugin = (): PluginBase => ({
  type: 'style',
  title: 'Stylus',
  name: 'stylus',
  fileExt: 'styl',
  devDeps: {
    default: {
      '@parcel/transformer-stylus': '^2.15.2',
      'stylelint-config-standard': '^36.0.1',
    },
    stylelint: {
      stylelint: '^15.10.3',
      'stylelint-stylus': '^1.0.0',
    },
    prettier: {
      'prettier-plugin-stylus': '^0.1.0',
    },
  },
  configs: {
    stylelint: {
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
    prettier: {
      plugins: ['prettier-plugin-stylus'],
    },
  },
  scripts: {
    stylelint: {
      'lint:styles': 'stylelint src/styles/**/*.styl',
      'lint:styles:fix': 'stylelint src/styles/**/*.styl --fix',
    },
    prettier: {
      'prettier:style': 'prettier src/**/*.styl --check',
      'prettier:style:fix': 'prettier src/**/*.styl --write',
    },
  },
});
