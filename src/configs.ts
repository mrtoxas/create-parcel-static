export const packageJson = {
  name: 'test',
  version: '1.0.0',
  description: '',
  scripts: {
    'clear:dist': 'rimraf dist',
  },
  author: '',
  license: 'ISC',
  devDependencies: {
    parcel: '^2.12.0',
    rimraf: '^5.0.5',
    'parcel-reporter-static-files-copy': '^1.5.3',
  },
};

export const devDependencies = {
  style: {
    scss: {
      '@parcel/transformer-sass': '^2.11.0',
    },
    less: {
      '@parcel/transformer-less': '^2.12.0',
    },
    stylus: {
      '@parcel/transformer-stylus': '2.12.0',
    },
    tailwind: {
      postcss: '^8.4.38',
      tailwindcss: '^3.4.3',
    },
  },
  script: {
    typescript: {
      typescript: '^5.3.3',
    },
  },
  stylelint: {
    base: {
      stylelint: '^16.2.1',
      'stylelint-config-standard': '^36.0.0',
    },
    scss: {
      'stylelint-config-standard-scss': '^13.0.0',
      'stylelint-scss': '^6.2.0',
    },
    less: {
      'stylelint-config-standard-less': '^3.0.1',
      'stylelint-less': '3.0.1',
    },
    stylus: {
      'stylelint-stylus': '^1.0.0',
    },
  },
  prettier: {
    base: {
      prettier: '^3.2.5',
    },
    pug: {
      '@prettier/plugin-pug': '^3.0.0',
    },
    esLint: {
      'eslint-config-prettier': '^9.1.0',
    },
  },
  eslint: {
    base: {
      eslint: '^8.56.0',
      'eslint-plugin-import': '^2.29.1',
    },
    typescript: {
      '@typescript-eslint/eslint-plugin': '^7.0.2',
      '@typescript-eslint/parser': '^7.0.2',
    },
  },
  parcel: {
    ejs: {
      'parcel-transformer-ejs': '^1.0.1',
    },
  },
};

export const parcelConfig = {
  base: {
    extends: ['@parcel/config-default'],
    reporters: ['...', 'parcel-reporter-static-files-copy'],
  },
  ejs: {
    transformers: {
      '*.ejs': ['parcel-transformer-ejs'],
    },
  },
};

export const esLintConfig = {
  base: {
    env: {
      browser: true,
      es2021: true,
    },
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    extends: ['eslint:recommended', 'prettier'],
    rules: {},
  },
  typescript: {
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
  },
};

export const stylelintConfig: Config = {
  css: {
    extends: ['stylelint-config-standard'],
    rules: {
      'declaration-colon-space-after': 'always',
    },
  },
  scss: {
    plugins: ['stylelint-scss'],
    rules: {
      'at-rule-no-unknown': null,
      'scss/at-rule-no-unknown': true,
      'scss/selector-no-redundant-nesting-selector': true,
    },
    extends: ['stylelint-scss', 'stylelint-config-standard-scss'],
  },
  stylus: {
    plugins: ['stylelint-stylus'],
    extends: ['stylelint-stylus/standard'],
    rules: {
      'stylus/declaration-colon': 'never',
      'stylus/pythonic': 'always',
      'stylus/selector-list-comma': 'never',
      'stylus/semicolon': 'never',
      'stylus/single-line-comment': 'always',
      'stylus/at-extend-style': ['@extend', '@extends'],
    },
  },
  less: {
    plugins: ['stylelint-less'],
    extends: ['stylelint-config-standard-less'],
    rules: {
      'at-rule-no-unknown': null,
      'color-no-invalid-hex': true,
      'less/color-no-invalid-hex': true,
    },
  },
};

export const prettierConfig = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
};

export const tsСonfig = {
  compilerOptions: {
    target: 'es5',
    module: 'commonjs',
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
  },
};

export const postcssConfig = {
  tailwind: {
    plugins: {
      tailwindcss: {},
    },
  },
};

export const tailwindConfig = (extensions: ChoiceDetails['extension'], typescript: boolean) => {
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
