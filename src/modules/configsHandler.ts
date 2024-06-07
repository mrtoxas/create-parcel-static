import { store } from 'store';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { parcelConfig as parcelCfg } from 'configs';
import { plugins } from './pluginFactory';
import { tailwindConfig } from 'plugins/tailwind';
import merge from 'deepmerge';
import {
  EslintCfg,
  ParcelCfg,
  PluginBase,
  PluginConfig,
  PostcssCfg,
  PrettierCfg,
  SassLintCfg,
  StyleLintCfg,
  TypescriptCfg,
} from 'types';

let stylelintConfig: StyleLintCfg = {};
let eslintConfig: EslintCfg = {};
const postcssConfig: PostcssCfg = {};
let parcelConfig: ParcelCfg = { ...parcelCfg.default };

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
    const config = plugins.getConfig('tailwind', 'postcss') as PostcssCfg;
    configsToSave.push({ fileName: '.postcssrc', config: merge(postcssConfig, config) });

    try {
      await fs.writeFile(
        path.join(projectInitData.projectPath, `tailwind.config.${scriptPlugin.fileExt}`),
        tailwindConfig(`${markupPlugin.fileExt}, ${scriptPlugin.fileExt}`, scriptPlugin.fileExt, markupPlugin.name),
      );
    } catch (err) {
      console.error(chalk.red('Error: '), 'Error when saving tailwind config');
      throw err;
    }
  }

  /* TypeScript */
  if (scriptPlugin.fileExt === 'ts') {
    const config = plugins.getConfig('typescript', 'typescript') as TypescriptCfg;
    configsToSave.push({ fileName: 'tsconfig.json', config: config });
  }

  /* EJS */
  if (markupPlugin.name === 'ejs') {
    const config = plugins.getConfig('ejs', 'parcel') as ParcelCfg;
    parcelConfig = merge(parcelConfig, config);
  }

  /* Prettier */
  if (userChoice.prettier) {
    let config = plugins.getConfig('prettier', 'prettier') as PrettierCfg;

    [markupPlugin, stylePlugin, scriptPlugin].forEach((item: PluginBase) => {
      const pluginPrettierConfig = plugins.getConfig(item.name, 'prettier') as PrettierCfg;
      if (pluginPrettierConfig) {
        config = merge(config, pluginPrettierConfig);
      }
    });

    configsToSave.push({ fileName: '.prettierrc', config: config });
  }

  /* Stylelint */
  if (userChoice.stylelint) {
    stylelintConfig = merge(stylelintConfig, plugins.getConfig('stylelint', 'stylelint') as StyleLintCfg);

    if (stylePlugin.name === 'sass') {
      try {
        await fs.writeFile(
          path.join(projectInitData.projectPath, '.sasslintrc'),
          plugins.getConfig('sass', 'sasslint') as SassLintCfg,
        );
      } catch (err) {
        console.error(chalk.red('Error: '), 'Error when saving sasslint config');
        throw err;
      }
    } else {
      const pluginStylelintConfig = plugins.getConfig(stylePlugin.name, 'stylelint') as StyleLintCfg;
      if (pluginStylelintConfig) {
        stylelintConfig = merge(stylelintConfig, pluginStylelintConfig);
      }

      if (userChoice.prettier) {
        stylelintConfig = merge(stylelintConfig, plugins.getConfig('prettier', 'stylelint') as StyleLintCfg);
      }

      configsToSave.push({ fileName: '.stylelintrc', config: stylelintConfig });
    }
  }

  /* ESLint */
  if (userChoice.eslint) {
    eslintConfig = merge(eslintConfig, plugins.getConfig('eslint', 'eslint') as EslintCfg);

    const pluginEslintConfig = plugins.getConfig(scriptPlugin.name, 'eslint');

    if (pluginEslintConfig) {
      eslintConfig = merge(eslintConfig, pluginEslintConfig as EslintCfg);
    }

    if (userChoice.prettier) {
      // Should be at the end of the extends list
      eslintConfig = merge(eslintConfig, plugins.getConfig('prettier', 'eslint') as EslintCfg);
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
