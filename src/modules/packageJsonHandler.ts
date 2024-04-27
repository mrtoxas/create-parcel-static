import fs from 'fs-extra';
import path from 'path';
import { store } from 'store';
import { packageJson as defaultPackageJson, devDependencies } from 'configs';
import { FileExt, PackageJson, Tech } from 'types';
import chalk from 'chalk';

const packageJson: PackageJson = {
  ...defaultPackageJson,
};

function unsupported(tech: string, plugin: string) {
  store.setWarnMsgs(`The ${tech} does not have an official ${plugin} plugin`);
}

export async function packageJsonHandler() {
  const { projectInitData, userProjectChoiсe } = store;

  const markupExtention = userProjectChoiсe.markup.extension;
  const styleExtention = userProjectChoiсe.style.extension;
  const scriptExtention = userProjectChoiсe.script.extension;

  packageJson['name'] = projectInitData.packageName;

  packageJson.scripts.start = `parcel src/index.${markupExtention}`;
  packageJson.scripts.build = `rimraf dist && parcel build src/index.${markupExtention} --no-source-maps --public-url ./`;

  /* TypeSctipt */

  if (userProjectChoiсe.script.extension === FileExt.TYPESCRIPT) {
    packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.script.typescript };
    packageJson.scripts['type:check'] = "tsc src/**/*.ts --noEmit";
  }

  /* jQuery */

  if (userProjectChoiсe.script.name === Tech.JQUERY) {
    packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.script.jquery };
  }

  /* Markup */

  switch (userProjectChoiсe.markup.name) {
    case Tech.EJS:
      packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.markup.ejs };
      break;
    case Tech.PUG:
      packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.markup.pug };
      break;
    }

  /* Style */

  switch (userProjectChoiсe.style.name) {
    case Tech.STYLUS:
      packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.style.stylus };
      break;
    case Tech.SCSS:  
    case Tech.SASS:
      packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.style.scss };
      break;
    case Tech.LESS:
      packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.style.less };
      break;
    case Tech.TAILWIND:
      packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.style.tailwind };
      break;
  }

  /* Prettier */

  if (userProjectChoiсe.prettier) {
    packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.prettier.base };

    if (userProjectChoiсe.markup.name === Tech.HTML) {
      packageJson.scripts['prettier:markup:check'] = `prettier src/**/*.${userProjectChoiсe.markup.extension} --check`;
      packageJson.scripts['prettier:markup:fix'] = `prettier src/**/*.${userProjectChoiсe.markup.extension} --write`;
    } else if (userProjectChoiсe.markup.name === Tech.PUG) {
      packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.prettier.pug };
      packageJson.scripts['prettier:markup:check'] =
        `prettier src/**/*.pug --check --plugin=@prettier/plugin-pug`;
      packageJson.scripts['prettier:markup:fix'] =
        `prettier src/**/*.pug --write --plugin=@prettier/plugin-pug`;
    } else {
      unsupported(userProjectChoiсe.markup.name, 'Prettier');
    }

    if ([Tech.CSS, Tech.LESS, Tech.SCSS, Tech.TAILWIND].includes(userProjectChoiсe.style.name)) {
      packageJson.scripts['prettier:styles:check'] = `prettier src/styles/**/*.${styleExtention} --check`;
      packageJson.scripts['prettier:styles:fix'] = `prettier src/styles/**/*.${styleExtention} --write`;
    } else {
      unsupported(userProjectChoiсe.style.name, 'Prettier');
    }

    if ([Tech.JAVASCRIPT, Tech.TYPESCRIPT, Tech.JQUERY].includes(userProjectChoiсe.script.name)) {
      packageJson.scripts['prettier:scripts:check'] = `prettier src/scripts/**/*.${scriptExtention} --check`;
      packageJson.scripts['prettier:scripts:fix'] = `prettier src/scripts/**/*.${scriptExtention} --write`;

      if (userProjectChoiсe.script.extension === FileExt.TYPESCRIPT) {
        packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.script.typescript };
      }
    } else {
      unsupported(userProjectChoiсe.script.name, 'Prettier');
    }
  }

  /* Eslint */

  if (userProjectChoiсe.eslint) {
    packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.eslint.base };

    packageJson.scripts['lint:scripts:check'] = `eslint src/scripts/**/*.${scriptExtention}`;
    packageJson.scripts['lint:scripts:fix'] = `eslint src/scripts/**/*.${scriptExtention} --fix`;

    if (userProjectChoiсe.script.extension === FileExt.TYPESCRIPT) {
      packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.eslint.typescript };
    }

    if (userProjectChoiсe.script.name === Tech.JQUERY) {
      packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.eslint.jquery };
    }

    if (userProjectChoiсe.prettier) {
      packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.eslint.prettier };
    }
  }

  /* Stylelint */

  if (userProjectChoiсe.stylelint) {
    packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.stylelint.base };

    // Scripts
    switch(userProjectChoiсe.style.name){
      case Tech.SASS:
        packageJson.scripts['lint:styles:check'] = `sass-lint 'src/styles/*.${styleExtention}' -v -q`;
        break;
      default:
        packageJson.scripts['lint:styles:check'] = `stylelint src/styles/**/*.${styleExtention}`;
        packageJson.scripts['lint:styles:fix'] = `stylelint src/styles/**/*.${styleExtention} --fix`;
    } 

    // Dependencies
    switch (userProjectChoiсe.style.name) {
      case Tech.SASS:
        packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.stylelint.sass };
        break;
      case Tech.SCSS:
        packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.stylelint.scss };
        break;
      case Tech.LESS:
        packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.stylelint.less };
        break;
      case Tech.STYLUS:
        packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.stylelint.stylus };
        break;
    }

    // Prettier
    if (userProjectChoiсe.prettier) {
      packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies.stylelint.prettier };
    }   
  }

  try {
    await fs.writeJson(path.join(store.projectInitData.projectPath, 'package.json'), packageJson, { spaces: 2 });
  } catch (err) {
    console.error(chalk.red('Error: '), 'Error when saving package.json');
    throw err;
  }
}
