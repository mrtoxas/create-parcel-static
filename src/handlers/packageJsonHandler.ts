import fs from 'fs-extra';
import path from 'path';
import { getExtensions } from 'utils/utils';

const packageJson: PackageJson = {
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
  },
  dependencies: {},
};

export async function packageJsonHandler(userChoise: UserChoises, projectPath: string, packageName: string) {
  const markupExtention = getExtensions(userChoise.markup);
  const styleExtention = getExtensions(userChoise.style);
  const scriptExtention = getExtensions(userChoise.script);


  packageJson['name'] = packageName;

  packageJson.scripts.start = `parcel src/index.${getExtensions(userChoise.markup)}`;
  packageJson.scripts.build = `rimraf dist && parcel build src/index.${getExtensions(userChoise.markup)} --no-source-maps --public-url ./`;

  if (userChoise.prettier) {
    const scripts = {
      'prettier:styles:check': `prettier src/styles/**/*.scss --check`,
      'prettier:markup:check': 'prettier src/**/*.pug --check --plugin=@prettier/plugin-pug',
      'prettier:scripts:check': 'prettier src/**/*.ts --check',
      
      'prettier:pug:fix': 'yarn prettier:pug --write --plugin=@prettier/plugin-pug',      
      'prettier:scripts:fix': 'yarn prettier:scripts --write',      
      'prettier:styles:fix': 'yarn prettier:styles --write',
      
    };
  }

  try {
    await fs.writeJson(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });
  } catch (err) {
    throw new Error(err);
  }
}
