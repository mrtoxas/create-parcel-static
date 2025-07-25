import { PluginBase } from 'types';

const config = {
  compilerOptions: {
    target: 'es2020',
    module: 'esnext',
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
  },
  include: ['src/**/*.ts'],
  exclude: ['node_modules', 'dist'],
};

export const typescriptPlugin = (): PluginBase => ({
  type: 'script',
  title: 'TypeScript',
  name: 'typescript',
  fileExt: 'ts',
  devDeps: {
    default: {
      typescript: '5.8.3',
    },
    eslint: {
      '@typescript-eslint/eslint-plugin': '^7.18.0',
      '@typescript-eslint/parser': '^7.18.0',
    },
  },
  configs: {
    typescript: config,
    eslint: {
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
    },
  },
  scripts: {
    default: {
      'check:types': `tsc --noEmit`,
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
});
