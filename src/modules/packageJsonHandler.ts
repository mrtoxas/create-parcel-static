import fs from 'fs-extra';
import path from 'path';
import { store } from 'store';
import { devDependencies } from 'configs';
import sortPackageJson from 'sort-package-json';

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
};

export async function packageJsonHandler() {
  const { projectInitData, userProjectChoiсe } = store;

  const markupExtention = userProjectChoiсe.markup.extension;
  const styleExtention = userProjectChoiсe.style.extension;
  const scriptExtention = userProjectChoiсe.script.extension;

  packageJson['name'] = projectInitData.packageName;

  packageJson.scripts.start = `parcel src/index.${markupExtention}`;
  packageJson.scripts.build = `rimraf dist && parcel build src/index.${markupExtention} --no-source-maps --public-url ./`;

  if (userProjectChoiсe.prettier) {
    packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.prettier.base };

    if (userProjectChoiсe.markup.name === 'html') {
      packageJson.scripts['prettier:markup:check'] = `prettier src/**/*.${userProjectChoiсe.markup.extension} --check`;
      packageJson.scripts['prettier:markup:fix'] = `prettier src/**/*.${userProjectChoiсe.markup.extension} --write`;
    } else if (userProjectChoiсe.markup.name === 'pug') {
      packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.prettier.pug };
      packageJson.scripts['prettier:markup:check'] =
        `prettier src/**/*.${userProjectChoiсe.markup.extension} --check --plugin=@prettier/plugin-pug`;
      packageJson.scripts['prettier:markup:fix'] =
        `prettier src/**/*.${userProjectChoiсe.markup.extension} --write --plugin=@prettier/plugin-pug`;
    } else {
      unsupported(userProjectChoiсe.markup.title, 'Prettier');
    }

    if (['css', 'less', 'scss'].includes(userProjectChoiсe.style.name)) {
      packageJson.scripts['prettier:styles:check'] = `prettier src/styles/**/*.${styleExtention} --check`;
      packageJson.scripts['prettier:styles:fix'] = `prettier src/styles/**/*.${styleExtention} --write`;
    } else {
      unsupported(userProjectChoiсe.style.title, 'Prettier');
    }

    if (['javascript', 'typescript'].includes(userProjectChoiсe.script.name)) {
      packageJson.scripts['prettier:scripts:check'] = `prettier src/scripts/**/*.${scriptExtention} --check`;
      packageJson.scripts['prettier:scripts:fix'] = `prettier src/scripts/**/*.${scriptExtention} --write`;

      if (userProjectChoiсe.script.name === 'js') {
        packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.script.typescript };
      }
    } else {
      unsupported(userProjectChoiсe.script.title, 'Prettier');
    }
  }

  if (userProjectChoiсe.eslint) {
    packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.eslint.base };

    packageJson.scripts['lint:scripts:check'] = `eslint src/scripts/**/*.${scriptExtention} --check`;
    packageJson.scripts['lint:scripts:fix'] = `eslint src/scripts/**/*.${scriptExtention} --fix`;

    if (userProjectChoiсe.script.name === 'ts') {
      packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.eslint.typescript };
    }
  }

  if (userProjectChoiсe.stylelint) {
    packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.stylelint.base };

    packageJson.scripts['lint:styles:check'] = `stylelint src/styles/**/*.${styleExtention}`;
    packageJson.scripts['lint:styles:fix'] = `stylelint src/styles/**/*.${styleExtention} --fix`;

    switch (userProjectChoiсe.style.name) {
      case 'sass':
      case 'scss':
        packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.stylelint.scss };
        break;
      case 'less':
        packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.stylelint.less };
        break;
      case 'stylus':
        packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.stylelint.stylus };
        break;
    }
  }

  const preparePackageJson = sortPackageJson(packageJson);

  try {
    await fs.writeJson(path.join(store.projectInitData.projectPath, 'package.json'), preparePackageJson, { spaces: 2 });
  } catch (err) {
    throw new Error(err);
  }
}

function unsupported(tech: string, plugin: string) {
  store.warnMsgs.push(`The ${tech} does not have an official ${plugin} plugin`);
}
