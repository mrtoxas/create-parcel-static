import { PluginBase } from 'types';

export const sassLintConfig = `rules:
  property-sort-order: 0
  no-color-literals: 0
  no-vendor-prefixes: 0`;

export const sassPlugin = (): PluginBase => ({
  type: 'style',
  title: 'SASS (Indented Syntax)',
  name: 'sass',
  fileExt: 'sass',
  devDeps: {
    default: {
      "@parcel/transformer-sass": "2.12.0",
    },
    stylelint: {
      'sass-lint': '^1.13.1',
    },
  },
  configs: {
    sasslint: sassLintConfig,
  },
  scripts: {
    stylelint: {
      'lint:styles': 'sass-lint src/styles/*.sass -v -q',
    },
  },
});
