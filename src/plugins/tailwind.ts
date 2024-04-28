import { Plugin } from 'types';

export const tailwindConfig = (extensions: string, typescript: boolean) => {
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
  return typescript ? tsConfig : jsConfig;
};

export const tailwindPlugin = (): Plugin => ({
  type: 'style',
  title: 'Tailwind',
  name: 'tailwind',
  fileExt: 'css',
  prettier: true,
  devDeps: {
    default: {
      postcss: '^8.4.38',
      tailwindcss: '^3.4.3',
    },
  },
  configs: {
    postcssConfig: {
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
