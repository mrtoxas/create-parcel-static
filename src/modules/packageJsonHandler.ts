import fs from 'fs-extra';
import path from 'path';
import { store } from 'store';
import { packageJson as defaultPackageJson } from 'configs';
import { plugins } from 'modules/pluginFactory';
import { PackageJson, Plugin } from 'types';
import chalk from 'chalk';

const packageJson: PackageJson = {
  ...defaultPackageJson,
};

function unsupportedMsg(tech: string, plugin: string) {
  store.setWarnMsgs(`The ${tech.toUpperCase()} does not have an official ${plugin} plugin`);
}

function addToolScript(item, plugin) {
  if (item.scripts?.[plugin.name]) {
    packageJson.scripts = { ...packageJson.scripts, ...item.scripts?.[plugin.name] };
  } else {
    unsupportedMsg(item.name, plugin.title);
  }
}

export async function packageJsonHandler() {
  const { projectInitData, userProjectChoice } = store;

  const markupPlugin = plugins[userProjectChoice.markup.name];
  const stylePlugin = plugins[userProjectChoice.style.name];
  const scriptPlugin = plugins[userProjectChoice.script.name];

  if (!(markupPlugin && stylePlugin && scriptPlugin)) {
    console.error(chalk.red('Error:'), `Failed loading plugin`);
    throw new Error();
  }

  packageJson.name = projectInitData.packageName;
  packageJson.scripts.start = `parcel src/index.${markupPlugin.fileExt}`;
  packageJson.scripts.build = `rimraf dist && parcel build src/index.${markupPlugin.fileExt} --no-source-maps --public-url ./`;

  [markupPlugin, stylePlugin, scriptPlugin].forEach((item: Plugin) => {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      ...(item.devDeps?.default && item.devDeps.default),
      ...(userProjectChoice.stylelint && item.devDeps?.stylelint && item.devDeps.stylelint),
    };

    packageJson.scripts = {
      ...packageJson.scripts,
      ...(item.scripts?.default && item.scripts.default),
    };

    if (userProjectChoice.prettier) addToolScript(item, plugins.prettier);
    if (userProjectChoice.eslint && item.type === 'script') addToolScript(item, plugins.eslint);
    if (userProjectChoice.stylelint && item.type === 'style') addToolScript(item, plugins.stylelint);
  });

  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    ...(userProjectChoice.prettier && plugins.prettier.devDeps.default),
    ...(userProjectChoice.eslint && plugins.eslint.devDeps.default),
    ...(userProjectChoice.eslint && userProjectChoice.prettier && plugins.eslint.devDeps.prettier),
    ...(userProjectChoice.stylelint && plugins.stylelint.devDeps.default),
    ...(userProjectChoice.stylelint && userProjectChoice.prettier && plugins.stylelint.devDeps.prettier),
  };

  try {
    await fs.writeJson(path.join(store.projectInitData.projectPath, 'package.json'), packageJson, { spaces: 2 });
  } catch (err) {
    console.error(chalk.red('Error: '), 'Error when saving package.json');
    throw err;
  }
}


