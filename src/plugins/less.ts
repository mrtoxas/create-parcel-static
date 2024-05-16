import { PluginBase } from 'types';

export const lessPlugin = (): PluginBase => ({
  type: 'style',
  title: 'Less',
  name: 'less',
  fileExt: 'less',
  devDeps: {
    default: {
      '@parcel/transformer-less': '^2.12.0',
    },
    stylelint: {
      'stylelint-config-standard-less': '^3.0.1',
      'stylelint-less': '3.0.1',
    },
  },
  configs: {
    stylelint: {
      plugins: ['stylelint-less'],
      extends: ['stylelint-config-standard-less'],
      rules: {
        'at-rule-no-unknown': null,
        'color-no-invalid-hex': true,
        'less/color-no-invalid-hex': true,
      },
    },
  },
  scripts: {
    stylelint: {
      'lint:styles': 'stylelint src/styles/**/*.less',
      'lint:styles:fix': 'stylelint src/styles/**/*.less --fix',
    },
    prettier: {
      'prettier:style': 'prettier src/**/*.less --check',
      'prettier:style:fix': 'prettier src/**/*.less --write',
    },
  },
});
