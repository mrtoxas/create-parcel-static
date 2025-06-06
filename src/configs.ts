import { ParcelCfg } from 'types';

export const packageJson = {
  name: 'test',
  version: '1.0.0',
  description: '',
  staticFiles: {
    staticPath: 'public',
  },
  scripts: {
    'clear:dist': 'rimraf dist',
  },
  author: '',
  license: 'ISC',
  devDependencies: {
    parcel: '^2.15.2',
    rimraf: '^6.0.1',
    '@parcel/config-default': '^2.15.2',
    'parcel-reporter-static-files-copy': '^1.5.3',
  },
};

export const parcelConfig: Partial<Record<string | 'default', ParcelCfg>> = {
  default: {
    extends: ['@parcel/config-default'],
    reporters: ['...', 'parcel-reporter-static-files-copy'],
  },
};
