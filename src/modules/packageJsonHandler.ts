import chalk from 'chalk';
import { packageJson as defaultPackageJson } from 'configs';
import fs from 'fs-extra';
import { plugins } from 'modules/pluginFactory';
import path from 'path';
import { store } from 'store';
import { PackageJson, PlgName, PlgToolName, PluginBase } from 'types';

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

  // Handling specific versions of plug-in technologies
  const preparedDefaultDeps = (pName: PlgName, base: keyof PluginBase['devDeps']) => {
    const pluginDeps = plugins.getDevDeps(pName, base);
    const extDeps = new Set(Object.keys(packageJson.devDependencies));

    return Object.keys(pluginDeps).reduce(
      (acc, item) => {
        if (!extDeps.has(item)) acc[item] = pluginDeps[item];
        return acc;
      },
      {} as Record<string, string>,
    );
  };

  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    ...(userChoice.prettier && preparedDefaultDeps('prettier', 'default')),
    ...(userChoice.eslint && preparedDefaultDeps('eslint', 'default')),
    ...(userChoice.eslint && userChoice.prettier && preparedDefaultDeps('eslint', 'prettier')),
    ...(userChoice.stylelint && preparedDefaultDeps('stylelint', 'default')),
    ...(userChoice.stylelint && userChoice.prettier && preparedDefaultDeps('stylelint', 'prettier')),
  };

  try {
    await fs.writeJson(path.join(store.projectInitData.projectPath, 'package.json'), packageJson, { spaces: 2 });
  } catch (err) {
    console.error(chalk.red('Error: '), 'Error when saving package.json');
    throw err;
  }
}
