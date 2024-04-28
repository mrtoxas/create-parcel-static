import { Plugin } from 'types';

export const sassLintConfig = `rules:
  property-sort-order: 0
  no-color-literals: 0
  no-vendor-prefixes: 0`;

export const sassPlugin = (): Plugin => ({
  type: 'style',
  title: 'SASS (Indented Syntax)',
  name: 'sass',
  fileExt: 'sass',
  devDeps: {
    stylelint: {
      'sass-lint': '^1.13.1',
    },
  },
  configs: {
    sasslintConfig: sassLintConfig,
  },
  scripts: {
    stylelint: {
      'lint:styles': 'sass-lint src/styles/*.sass -v -q',
    },
  },
});
