import { PluginBase } from 'types';

const config = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
};

export const prettierPlugin = (): PluginBase => ({
  type: 'tool',
  title: 'Prettier',
  name: 'prettier',
  devDeps: {
    default: {
      prettier: '^3.5.3',
    },
  },
  configs: {
    prettier: config,
    stylelint: {
      plugins: ['stylelint-prettier'],
    },
    eslint: {
      extends: ['eslint-config-prettier'],
    },
  },
});
