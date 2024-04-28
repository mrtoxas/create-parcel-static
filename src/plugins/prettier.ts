import { Plugin } from 'types';

const config = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
};

export const prettierPlugin = (): Plugin => ({
  type: 'tool',
  title: 'Prettier',
  name: 'prettier',
  devDeps: {
    default: {
      prettier: '^3.2.5',
    },
  },
  configs: {
    internal: config,
    stylelintConfig: {
      plugins: ['stylelint-prettier'],
    },
    eslintConfig: {
      extends: ['eslint-config-prettier'],
    },
  },
});
