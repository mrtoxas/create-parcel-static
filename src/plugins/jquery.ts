import { PluginBase } from 'types';
import merge from 'deepmerge';

const baseConfig: PluginBase = {
  name: 'jquery',
  title: '',
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
    eslint: {
      env: {
        jquery: true,
      },
      extends: ['jquery'],
    },
  },
};

const jqueryJsConfig = {
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
};

const jqueryTsConfig = {
  title: 'JQuery (TypeScript)',
  name: 'jqueryts',
  fileExt: 'ts',
  devDeps: {
    default: {
      typescript: '^5.3.3',
      '@types/jquery': '^3.5.30',
    },
    eslint: {
      '@typescript-eslint/eslint-plugin': '^7.0.2',
      '@typescript-eslint/parser': '^7.0.2',
    },
  },
  configs: {    
    eslint: {
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
    },
  },
  scripts: {
    default: {
      types: `tsc --noEmit`,
    },
    prettier: {
      'prettier:scripts': 'prettier src/scripts/**/*.ts --check',
      'prettier:scripts:fix': 'prettier src/scripts/**/*.ts --write',
    },
    eslint: {
      'lint:scripts': 'eslint src/scripts/**/*.ts',
      'lint:scripts:fix': 'eslint src/scripts/**/*.ts --fix',
    },
  },  
};

export const jqueryPlugin = (): PluginBase => merge(baseConfig, jqueryJsConfig);
export const jqueryTsPlugin = (): PluginBase => merge(baseConfig, jqueryTsConfig);
