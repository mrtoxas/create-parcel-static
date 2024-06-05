import { PluginBase } from 'types';

const config = {
  env: {
    browser: true,
    es6: true,
  },
  root: true,
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'prefer-const': 'error',
    'no-var': 'error',
    'no-unused-vars': 'error',
  },
};

export const eslintPlugin = (): PluginBase => ({
  type: 'tool',
  title: 'EsLint',
  name: 'eslint',
  devDeps: {
    default: {
      eslint: '^8.57.0',
      'eslint-plugin-import': '^2.29.1',
    },
    prettier: {
      'eslint-config-prettier': '^9.1.0',
    },
  },
  configs: {
    eslint: config,
  },
});
