import { Plugin } from 'types';

export const scssPlugin = (): Plugin => ({
  type: 'style',
  title: 'SASS (SCSS Syntax)',
  name: 'scss',
  fileExt: 'scss',
  devDeps: {
    default: {
      '@parcel/transformer-sass': '^2.12.0',
    },
    stylelint: {
      'stylelint-config-standard-scss': '^13.0.0',
      'stylelint-scss': '^6.2.0',
    },
  },
  configs: {
    stylelintConfig: {
      plugins: ['stylelint-scss'],
      rules: {
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
        'scss/selector-no-redundant-nesting-selector': true,
      },
      extends: ['stylelint-scss', 'stylelint-config-standard-scss'],
    },
  },
  scripts: {
    stylelint: {
      'lint:styles': 'stylelint src/styles/**/*.scss',
      'lint:styles:fix': 'stylelint src/styles/**/*.scss --fix',
    },
  },
});
