import { PluginBase } from 'types';

//stylelint ^15.10.3 - maximum for Stylus (DeprecationWarning: context.fix is being deprecated)
export const stylelintPlugin = (): PluginBase => ({
  type: 'tool',
  title: 'StyleLint',
  name: 'stylelint',
  devDeps: {
    default: {
      stylelint: '^16.2.1',
      'stylelint-config-standard': '^38.0.0',
    },
    prettier: {
      'stylelint-prettier': '^5.0.3',
    },
  },
  configs: {
    stylelint: {
      rules: {
        'property-no-vendor-prefix': null,
      },
    },
  },
});
