import { store } from 'store';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { parcelConfig as parcelCfg } from 'configs';
import { plugins } from './pluginFactory';
import { tailwindConfig } from 'plugins/tailwind';
import {
  EslintCfg,
  ParcelCfg,
  PluginConfig,
  PostcssCfg,
  PrettierCfg,
  SassLintCfg,
  StyleLintCfg,
  TypescriptCfg,
} from 'types';

const postcssConfig: PostcssCfg = {};
const parcelConfig: ParcelCfg = { ...parcelCfg.default };
const eslintConfig: EslintCfg = { ...(plugins.getConfig('eslint', 'eslint') as EslintCfg) };

const configsToSave: {
  fileName: string;
  config: PluginConfig;
}[] = [];

export async function configsHandler() {
  const { projectInitData, userChoice } = store;

  const stylePlugin = plugins.getPluginData(userChoice.style);
  const markupPlugin = plugins.getPluginData(userChoice.markup);
  const scriptPlugin = plugins.getPluginData(userChoice.script);

  if (!(markupPlugin && stylePlugin && scriptPlugin)) {
    console.error(chalk.red('Error:'), `markup-handler: Failed loading plugin`);
    throw new Error();
  }

  /* Tailwind */
  if (stylePlugin.name === 'tailwind') {
    const configs = plugins.getConfig('tailwind', 'postcss') as PostcssCfg;
    postcssConfig.plugins = { ...postcssConfig.plugins, ...configs.plugins };
    configsToSave.push({ fileName: '.postcssrc', config: postcssConfig });

    try {
      await fs.writeFile(
        path.join(projectInitData.projectPath, `tailwind.config.${scriptPlugin.fileExt}`),
        tailwindConfig(`${markupPlugin.fileExt}, ${scriptPlugin.fileExt}`, scriptPlugin.name),
      );
    } catch (err) {
      console.error(chalk.red('Error: '), 'Error when saving tailwind config');
      throw err;
    }
  }

  /* TypeScript */
  if (scriptPlugin.name === 'typescript') {
    const config = plugins.getConfig('typescript', 'typescript') as TypescriptCfg;
    configsToSave.push({ fileName: 'tsconfig.json', config: config });
  }

  /* EJS */
  if (markupPlugin.name === 'ejs') {
    const config = plugins.getConfig('ejs', 'parcel') as ParcelCfg;
    parcelConfig.transformers = { ...parcelConfig.transformers, ...config.transformers };
  }

  /* Prettier */
  if (userChoice.prettier) {
    const config = plugins.getConfig('prettier', 'prettier') as PrettierCfg;
    configsToSave.push({ fileName: '.prettierrc', config: config });
  }

  /* Stylelint */
  if (userChoice.stylelint) {
    let stylelintConfig: StyleLintCfg = {};

    switch (stylePlugin.name) {
      case 'sass':
        try {
          await fs.writeFile(
            path.join(projectInitData.projectPath, '.sasslintrc'),
            plugins.getConfig('sass', 'sasslint') as SassLintCfg,
          );
        } catch (err) {
          console.error(chalk.red('Error: '), 'Error when saving sasslint config');
          throw err;
        }
        break;
      case 'scss':
        stylelintConfig = plugins.getConfig('scss', 'stylelint') as StyleLintCfg;
        break;
      case 'less':
        stylelintConfig = plugins.getConfig('less', 'stylelint') as StyleLintCfg;
        break;
      case 'stylus':
        stylelintConfig = plugins.getConfig('stylus', 'stylelint') as StyleLintCfg;
        break;
      case 'tailwind':
      case 'css':
        stylelintConfig = plugins.getConfig('css', 'stylelint') as StyleLintCfg;
        break;
      default:
        console.error(chalk.red('Error: '), `Unknown slyle name: ${stylePlugin.name}`);
        throw new Error();
    }

    if (userChoice.prettier) {
      const config = plugins.getConfig('prettier', 'stylelint') as StyleLintCfg;
      stylelintConfig.plugins = stylelintConfig.plugins
        ? [...stylelintConfig.plugins, ...config.plugins]
        : config.plugins;

      stylelintConfig.rules = {
        ...stylelintConfig.rules,
        ...config.rules,
      };
    }

    configsToSave.push({ fileName: '.stylelintrc', config: stylelintConfig });
  }

  /* ESLint */
  if (userChoice.eslint) {
    if (scriptPlugin.fileExt === 'ts') {
      const config = plugins.getConfig('typescript', 'eslint') as EslintCfg;
      eslintConfig.parser = (plugins.getConfig('typescript', 'eslint') as EslintCfg).parser;
      if (eslintConfig.plugins) {
        eslintConfig.plugins = [...eslintConfig.plugins, ...config.plugins];
      } else {
        eslintConfig.plugins = [...config.plugins];
      }

      eslintConfig.extends = [...eslintConfig.extends, ...config.extends];
    }

    if (scriptPlugin.name === 'jquery') {
      const config = plugins.getConfig('jquery', 'eslint') as EslintCfg;
      eslintConfig.env = { ...eslintConfig.env, ...config.env };
      eslintConfig.extends = [...eslintConfig.extends, ...config.extends];
    }

    if (userChoice.prettier) {
      // Should be at the end of the extensions list
      const config = plugins.getConfig('prettier', 'eslint') as EslintCfg;
      eslintConfig.extends = [...eslintConfig.extends, ...config.extends];
    }

    configsToSave.push({ fileName: '.eslintrc', config: eslintConfig });
  }

  /* Parcel Core */
  configsToSave.push({ fileName: '.parcelrc', config: parcelConfig });

  configsToSave.forEach((item) => {
    try {
      fs.writeJson(path.join(projectInitData.projectPath, item.fileName), item.config, {
        spaces: 2,
      });
    } catch (err) {
      console.error(chalk.red('Error: '), `Error when saving ${item.fileName}`);
      throw err;
    }
  });
}
