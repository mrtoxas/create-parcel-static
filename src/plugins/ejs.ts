import { PluginBase } from 'types';

export const ejsPlugin = (): PluginBase => ({
  type: 'markup',
  title: 'Ejs',
  name: 'ejs',
  fileExt: 'ejs',
  devDeps: {
    default: {
      ejs: '^3.1.10',
      'parcel-transformer-ejs': '^1.0.1',
    },
  },
  configs: {
    parcel: {
      transformers: {
        '*.ejs': ['parcel-transformer-ejs'],
      },
    },
  },
});
