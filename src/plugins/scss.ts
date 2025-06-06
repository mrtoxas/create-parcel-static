import { PluginBase } from 'types';

export const scssPlugin = (): PluginBase => ({
  type: 'style',
  title: 'SASS (SCSS Syntax)',
  name: 'scss',
  fileExt: 'scss',
  devDeps: {
    default: {
      '@parcel/transformer-sass': '^2.15.2',
    },
    stylelint: {
      'stylelint-config-standard-scss': '^15.0.1',
      'stylelint-scss': '^6.12.0',
    },
  },
  configs: {
    stylelint: {
      plugins: ['stylelint-scss'],
      rules: {
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
        'scss/selector-no-redundant-nesting-selector': true,
        'lightness-notation': null,
      },
      extends: ['stylelint-scss', 'stylelint-config-standard-scss'],
    },
  },
  scripts: {
    stylelint: {
      'lint:styles': 'stylelint src/styles/**/*.scss',
      'lint:styles:fix': 'stylelint src/styles/**/*.scss --fix',
    },
    prettier: {
      'prettier:style': 'prettier src/**/*.scss --check',
      'prettier:style:fix': 'prettier src/**/*.scss --write',
    },
  },
});
