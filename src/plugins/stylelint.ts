import { PluginBase } from 'types';

export const stylelintPlugin = (): PluginBase => ({
  type: 'tool',
  title: 'StyleLint',
  name: 'stylelint',
  devDeps: {
    default: {
      stylelint: '^16.2.1',
      'stylelint-config-standard': '^36.0.0',
    },
    prettier: {
      'stylelint-prettier': '^5.0.0',
    },
  },
});
