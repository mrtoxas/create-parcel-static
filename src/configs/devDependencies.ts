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
};
