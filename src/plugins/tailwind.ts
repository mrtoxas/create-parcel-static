import { plugins } from 'modules/pluginFactory';
import { PluginBase } from 'types';

export const tailwindConfig = (extensions: string, scriptName: string) => {
  const tsConfig = `import type { Config } from 'tailwindcss'
  
export default {
  content: [
    "./src/**/*.{${extensions}}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config`;

  const jsConfig = `/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{${extensions}}",
  ],
  theme: {
    extend: {},
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
