import { plugins } from 'modules/pluginFactory';
import { PluginBase, PlgMarkupName } from 'types';

export const tailwindConfig = (extensions: string, scriptName: string, markup: PlgMarkupName) => {
  const baseConfig = {
    content: [`./src/**/*.{${extensions}}`],
    separator: markup === 'pug' ? "'_'" : "':'",
    theme: {
      extend: {
        colors: {
          'dark-gray': '#3c3c43',
          'light-gray': '#ebebef',
          'navy-blue': '#243c5a',
          'light-blue': '#dddde3',
          charcoal: '#32363f',
          slate: '#414853',
          silver: '#515c67',
          'sky-blue': '#2563eb',
          pink: '#ec4899',
          'soft-silver': '#e4e4e9',
          'creamy-white': '#fffff5',
        },
      },
    },
    plugins: [],
  };

  const stringifyBaseConfig = JSON.stringify(baseConfig, null, 2);

  const tsConfig = `import type { Config } from 'tailwindcss';\n\nexport default ${stringifyBaseConfig} satisfies Config`;
  const jsConfig = `/** @type {import('tailwindcss').Config} */\nexport default ${stringifyBaseConfig}`;

  return scriptName === plugins.typescript.fileExt ? tsConfig : jsConfig;
};

export const tailwindPlugin = (): PluginBase => ({
  type: 'style',
  title: 'Tailwind',
  name: 'tailwind',
  fileExt: 'css',
  devDeps: {
    default: {
      postcss: '^8.4.38',
      tailwindcss: '^3.4.3',
    },
    stylelint: {
      'stylelint-config-tailwindcss': '^0.0.7',
    },
  },
  configs: {
    postcss: {
      plugins: {
        tailwindcss: {},
      },
    },
    stylelint: {
      extends: ['stylelint-config-standard', 'stylelint-config-tailwindcss'],
      rules: {
        'property-no-vendor-prefix': null,
      },
    },
  },
  scripts: {
    stylelint: {
      'lint:styles': 'stylelint src/styles/**/*.css',
      'lint:styles:fix': 'stylelint src/styles/**/*.css --fix',
    },
    prettier: {
      'prettier:style': 'prettier src/**/*.css --check',
      'prettier:style:fix': 'prettier src/**/*.css --write',
    },
  },
});
