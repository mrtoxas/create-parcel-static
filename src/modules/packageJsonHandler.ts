import fs from 'fs-extra';
import path from 'path';
import { store } from 'store';
import { packageJson as defaultPackageJson } from 'configs';
import { plugins } from 'modules/pluginFactory';
import { PackageJson, PlgName, PlgToolName, PluginBase } from 'types';
import chalk from 'chalk';

const packageJson: PackageJson = {
  ...defaultPackageJson,
};

function unsupportedMsg(tech: string, plugin: string) {
  store.setWarnMsgs(`The ${tech.toUpperCase()} does not have an official ${plugin} plugin`);
}

function addToolScript(pluginName: PlgName, toolName: PlgToolName) {
  const scripts = plugins.getScritps(pluginName, toolName);
  if (scripts) {
    packageJson.scripts = { ...packageJson.scripts, ...scripts };
  } else {
    unsupportedMsg(pluginName, plugins.getPluginData(toolName).title);
  }
}

export async function packageJsonHandler() {
  const { projectInitData, userChoice } = store;

  const markupPlugin = plugins.getPluginData(userChoice.markup);
  const stylePlugin = plugins.getPluginData(userChoice.style);
  const scriptPlugin = plugins.getPluginData(userChoice.script);

  if (!(markupPlugin && stylePlugin && scriptPlugin)) {
    console.error(chalk.red('Error:'), `Failed loading plugin`);
    throw new Error();
  }

  packageJson.name = projectInitData.packageName;
  packageJson.scripts.start = `parcel src/index.${markupPlugin.fileExt}`;
  packageJson.scripts.build = `rimraf dist && parcel build src/index.${markupPlugin.fileExt} --no-source-maps --public-url ./`;

  [markupPlugin, stylePlugin, scriptPlugin].forEach((item: PluginBase) => {
    const plugin = plugins.getPluginData(item.name);
    const devDepsDefault = plugins.getDevDeps(plugin.name, 'default');
    const devDepsStylelint = plugins.getDevDeps(plugin.name, 'stylelint');
    const devDepsEslint = plugins.getDevDeps(plugin.name, 'eslint');
    const devDepsPrettier = plugins.getDevDeps(plugin.name, 'prettier');
    const scriptsDefault = plugins.getScritps(plugin.name, 'default');

    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      ...(devDepsDefault && devDepsDefault),
      ...(userChoice.eslint && devDepsEslint && devDepsEslint),
      ...(userChoice.prettier && devDepsPrettier && devDepsPrettier),
      ...(userChoice.stylelint && devDepsStylelint && devDepsStylelint),
    };

    packageJson.scripts = {
      ...packageJson.scripts,
      ...(scriptsDefault && scriptsDefault),
    };

    if (userChoice.prettier) addToolScript(plugin.name, 'prettier');
    if (userChoice.eslint && plugin.type === 'script') addToolScript(plugin.name, 'eslint');
    if (userChoice.stylelint && plugin.type === 'style') addToolScript(plugin.name, 'stylelint');
  });

  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    ...(userChoice.prettier && plugins.getDevDeps('prettier', 'default')),
    ...(userChoice.eslint && plugins.getDevDeps('eslint', 'default')),
    ...(userChoice.eslint && userChoice.prettier && plugins.getDevDeps('eslint', 'prettier')),
    ...(userChoice.stylelint && plugins.getDevDeps('stylelint', 'default')),
    ...(userChoice.stylelint && userChoice.prettier && plugins.getDevDeps('stylelint', 'prettier')),
  };

  try {
    await fs.writeJson(path.join(store.projectInitData.projectPath, 'package.json'), packageJson, { spaces: 2 });
  } catch (err) {
    console.error(chalk.red('Error: '), 'Error when saving package.json');
    throw err;
  }
}