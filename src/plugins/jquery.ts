import { Plugin } from 'types';

const baseConfig: Plugin = {
  type: 'script',
  devDeps: {
    default: {
      jquery: '^3.7.1',
    },
    eslint: {
      'eslint-config-jquery': '^3.0.2',
    },
  },
  configs: {
    eslintConfig: {
      env: {
        jquery: true,
      },
      extends: ['jquery'],
    },
  },
};

export const jqueryPlugin = (): Plugin => ({
  ...baseConfig,
  title: 'JQuery',
  name: 'jquery',
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

export const jqueryTsPlugin = (): Plugin => ({
  ...baseConfig,
  title: 'JQuery (TypeScript)',
  name: 'jqueryts',
  fileExt: 'ts',
  scripts: {
    prettier: {
      'prettier:scripts': 'prettier src/scripts/**/*.ts --check',
      'prettier:scripts:fix': 'prettier src/scripts/**/*.ts --write',
    },
    eslint: {
      'lint:scripts': 'eslint src/scripts/**/*.ts',
      'lint:scripts:fix': 'eslint src/scripts/**/*.ts --fix',
    },
  },
});
