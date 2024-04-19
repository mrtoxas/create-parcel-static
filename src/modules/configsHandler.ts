import { store } from 'store';
import fs from 'fs-extra';
import path from 'path';
import {
  eslintConfig as eslintCfg,
  parcelConfig as parcelCfg,
  postcssConfig as postcssCfg,
  prettierConfig,
  stylelintConfig as styleLintCfg,
  tailwindConfig,
  tsСonfig,
} from 'configs';
import { EslintConfig, ParcelConfig, PostcssConfig, PrettierConfig, StyleLintConfig, TsConfig } from 'types';

const postcssConfig: PostcssConfig = {};
const parcelConfig: ParcelConfig = { ...parcelCfg.default };
const eslintConfig: EslintConfig = { ...eslintCfg.default };

const configsToSave: {
  fileName: string;
  config: PostcssConfig | StyleLintConfig | TsConfig | ParcelConfig | EslintConfig | PrettierConfig;
}[] = [];

export async function configsHandler() {
  const { projectInitData, userProjectChoiсe } = store;

  /* Tailwind */
  if (userProjectChoiсe.style.name === 'tailwind') {
    postcssConfig.plugins = { ...postcssConfig.plugins, ...postcssCfg.tailwind };
    configsToSave.push({ fileName: '.postcssrc', config: postcssConfig });

    try {
      await fs.writeFile(
        path.join(projectInitData.projectPath, `tailwind.config.${userProjectChoiсe.script.extension}`),
        tailwindConfig(
          `${userProjectChoiсe.markup.extension}, ${userProjectChoiсe.script.extension}`,
          userProjectChoiсe.script.name === 'typescript',
        ),
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  /* TypeScript */
  if (userProjectChoiсe.script.name === 'typescript') {
    configsToSave.push({ fileName: 'tsconfig.json', config: tsСonfig });
  }

  /* EJS */
  if (userProjectChoiсe.markup.name === 'ejs') {
    parcelConfig.transformers = { ...parcelConfig.transformers, ...parcelCfg.ejs.transformers };
    configsToSave.push({ fileName: '.parcelrc', config: parcelConfig });
  }

  /* Prettier */
  if (userProjectChoiсe.prettier) {
    configsToSave.push({ fileName: '.prettierrc', config: prettierConfig });
  }

  /* Stylelint */
  if (userProjectChoiсe.stylelint) {
    let stylelintConfig: StyleLintConfig = {};

    switch (userProjectChoiсe.style.name) {
      case 'sass':
      case 'scss':
        stylelintConfig = styleLintCfg.scss;
        break;
      case 'less':
        stylelintConfig = styleLintCfg.less;
        break;
      case 'stylus':
        stylelintConfig = styleLintCfg.stylus;
        break;
      case 'tailwind':
      case 'css':
        stylelintConfig = styleLintCfg.css;
        break;
      default:
        throw new Error(`Unknown style name`);
    }

    if (userProjectChoiсe.prettier) {
      stylelintConfig.plugins = stylelintConfig.plugins
        ? [...stylelintConfig.plugins, ...styleLintCfg.prettier.plugins]
        : styleLintCfg.prettier.plugins;

      stylelintConfig.rules = { ...stylelintConfig.rules, ...styleLintCfg.prettier.rules };
    }

    configsToSave.push({ fileName: '.stylelintrc', config: stylelintConfig });
  }

  /* ESLint */
  if (userProjectChoiсe.eslint) {
    if (userProjectChoiсe.script.extension === 'ts') {
      eslintConfig.parser = eslintCfg.typescript.parser;
      if (eslintConfig.plugins) {
        eslintConfig.plugins = [...eslintConfig.plugins, ...eslintCfg.typescript.plugins];
      } else {
        eslintConfig.plugins = [...eslintCfg.typescript.plugins];
      }

      eslintConfig.extends = [...eslintConfig.extends, ...eslintCfg.typescript.extends];
    }

    if (userProjectChoiсe.prettier) {
      eslintConfig.extends = [...eslintConfig.extends, ...eslintCfg.prettier.extends];
    }

    if (userProjectChoiсe.script.name === 'jquery') {
      eslintConfig.env = { ...eslintConfig.env, ...eslintCfg.jquery.env };
      eslintConfig.extends = [...eslintConfig.extends, ...eslintCfg.jquery.extends];
    }

    configsToSave.push({ fileName: '.eslintrc', config: eslintConfig });
  }

  configsToSave.forEach((item) => {
    try {
      fs.writeJson(path.join(projectInitData.projectPath, item.fileName), item.config, {
        spaces: 2,
      });
    } catch (err) {
      throw new Error(err);
    }
  });
}
