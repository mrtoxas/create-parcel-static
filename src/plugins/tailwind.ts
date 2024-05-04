import { plugins } from 'modules/pluginFactory';
import { PluginBase } from 'types';

export const tailwindConfig = (extensions: string, scriptName: string) => {
  const tsConfig = `import type { Config } from 'tailwindcss'
  
export default {
  content: [
    "./src/**/*.{${extensions}}"
  ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#3c3c43',
        'light-gray': '#ebebef',
        'navy-blue': '#243c5a',
        'light-blue': '#dddde3',
        'charcoal': '#32363f',
        'slate': '#414853',
        'silver': '#515c67',
        'sky-blue': '#2563eb',
        'pink': '#ec4899',    
        'soft-silver': '#e4e4e9',
        'creamy-white': '#fffff5',
      },
    },
  },
  plugins: [],
} satisfies Config`;

  const jsConfig = `/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{${extensions}}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#3c3c43',
        'light-gray': '#ebebef',
        'navy-blue': '#243c5a',
        'light-blue': '#dddde3',
        'charcoal': '#32363f',
        'slate': '#414853',
        'silver': '#515c67',
        'sky-blue': '#2563eb',
        'pink': '#ec4899',    
        'soft-silver': '#e4e4e9',
        'creamy-white': '#fffff5',
      },
    },
  },
  plugins: [],
}
  `;
  return scriptName === plugins.typescript.name ? tsConfig : jsConfig;
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
  },
  scripts: {
    stylelint: {
      'lint:styles': 'stylelint src/styles/**/*.css',
      'lint:styles:fix': 'stylelint src/styles/**/*.css --fix',
    },
  },
});
